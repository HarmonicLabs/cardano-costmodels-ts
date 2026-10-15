/**
 * Measures costModelsFromCborObj / costModelsToCborObj against the
 * cardano-cbor-dataset corpus (node-diversity-conformance `cbor-decoding`,
 * corpus `conway-123-100`). The corpus is read as data only.
 *
 *   bun conformance/corpus.ts <dataset>/conway-123-100 [--list]
 *
 * cost_models: every valid sample must decode and re-encode to its
 * `expected` file (cardano-node's re-encoding: keys ascending, definite
 * lists), and every language must be kept.
 * protocol_param_update: the same for key 18 when present (valid samples),
 * and the number of invalid samples whose key 18 alone is rejected.
 */
import { readdirSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { Cbor, CborMap, CborObj, CborUInt } from "@harmoniclabs/cbor";
import { toHex } from "@harmoniclabs/uint8array-utils";
import { costModelsFromCborObj, costModelsToCborObj } from "../src";

const args = process.argv.slice(2);
const dir = args.find(a => !a.startsWith("--"));
if (!dir || !existsSync(dir)) throw new Error("usage: bun conformance/corpus.ts <dataset>/conway-123-100");
const LIST = args.includes("--list");

const files = (p: string) => existsSync(p) ? readdirSync(p).filter(f => f.endsWith(".cbor")).sort() : [];
const read = (p: string) => new Uint8Array(readFileSync(p));

function key18(o: CborObj): CborObj | undefined {
    if (!(o instanceof CborMap)) throw new Error("not a map");
    return o.map.find(e => e.k instanceof CborUInt && e.k.num === 18n)?.v;
}

function nLanguages(o: CborObj): number { return o instanceof CborMap ? o.map.length : 0; }

const roundTrip = (o: CborObj) => toHex(Cbor.encode(costModelsToCborObj(costModelsFromCborObj(o))));
function kept(o: CborObj): number {
    const cms = costModelsFromCborObj(o);
    return ["PlutusScriptV1", "PlutusScriptV2", "PlutusScriptV3"].filter(k => (cms as any)[k] !== undefined).length
        + Object.keys(cms.unknownLanguages ?? {}).length;
}

{   // cost_models
    const rule = "cost_models";
    let total = 0, decoded = 0, exact = 0, langs = 0, langsKept = 0;
    const fails: string[] = [];
    for (const f of files(join(dir, rule, "valid"))) {
        total++;
        const src = Cbor.parse(read(join(dir, rule, "valid", f)));
        const expected = toHex(read(join(dir, rule, "expected", f)));
        langs += nLanguages(src);
        try {
            langsKept += kept(src);
            const out = roundTrip(src);
            decoded++;
            if (out === expected) exact++;
            else fails.push(`${f}: ${out.slice(0, 60)} != ${expected.slice(0, 60)}`);
        } catch (e: any) { fails.push(`${f}: ${e.message}`); }
    }
    console.log(`cost_models: decoded ${decoded}/${total}, re-encoding == expected ${exact}/${total}, languages kept ${langsKept}/${langs}`);
    if (LIST) fails.forEach(x => console.log("   " + x));
}

{   // protocol_param_update key 18
    const rule = "protocol_param_update";
    let total = 0, with18 = 0, exact = 0;
    const fails: string[] = [];
    for (const f of files(join(dir, rule, "valid"))) {
        total++;
        const src = key18(Cbor.parse(read(join(dir, rule, "valid", f))));
        if (src === undefined) continue;
        with18++;
        const exp = key18(Cbor.parse(read(join(dir, rule, "expected", f))));
        try {
            const out = roundTrip(src);
            if (exp && out === toHex(Cbor.encode(exp))) exact++;
            else fails.push(`${f}: key 18 differs`);
        } catch (e: any) { fails.push(`${f}: ${e.message}`); }
    }
    const inv: string[] = [];
    const invDir = join(dir, rule, "invalid");
    for (const z of existsSync(invDir) ? readdirSync(invDir).sort() : []) {
        let n = 0, rejected = 0;
        for (const f of files(join(invDir, z))) {
            let src: CborObj | undefined;
            try { src = key18(Cbor.parse(read(join(invDir, z, f)))); } catch { continue; }
            if (src === undefined) continue;
            n++;
            try { costModelsFromCborObj(src); } catch { rejected++; }
        }
        inv.push(`${z} ${rejected}/${n}`);
    }
    console.log(`protocol_param_update: valid with key 18 ${with18}/${total}, key 18 re-encoding == expected ${exact}/${with18}; invalid samples with key 18 whose cost models are rejected: ${inv.join(", ")}`);
    if (LIST) fails.forEach(x => console.log("   " + x));
}
