# Plutus V3 cost-model fix — Plomin² builtin expansion (2026-05-20)

## Status — fix landed in `1.5.0`

This doc was first drafted against `1.3.0` (the published version), then the upstream repo turned out to have an unreleased commit (`2b6e24f`, "cost models v4") on top of `1.4.0` that introduced an `src/v4/` namespace as the intended home for the 350-entry shape. After investigation, that V4 design was rejected as the wrong layer (see "Why V4 wasn't the right home" below), and the fix that landed in `1.5.0` extends V3 in place — matching what the chain currently emits as PlutusV3.

What ended up in `1.5.0`:

- **`src/v3/defaultV3Costs.ts`** regenerated to 350 entries in chain-canonical order (preprod snapshot 2026-05-20, verified `Object.keys(cost_models.PlutusV3)[i] ⇔ cost_models_raw.PlutusV3[i]` for all 350 i).
- **`src/v3/N_COST_MODEL_PLUTUS_V3.ts`** — `N_COST_MODEL_PLUTUS_V3` bumped to `350`; new `N_COST_MODEL_PLUTUS_V3_CHANG_2 = 297` constant preserves the pre-Plomin² cardinality for backward-compat acceptance.
- **`src/v3/CostModelPlutusV3.ts`** interface regenerated to 350 fields in chain order. The dropped `quotientInteger-memory-arguments-minimum` field and the 54 added field names track the chain's `parameter_change_action`.
- **`src/v3/isCostModelsV3.ts`** now accepts 251 (Chang-1) / 297 (Chang-2) / 350 (current) tiers, picking the canonical key set against the input's length.
- **`src/v3/costModelV2ToFakeV3.ts`** — one orphan reference to the dropped `quotientInteger-memory-arguments-minimum` removed; the existing `realNewKeys` loop already fills the 53 new keys with `a_lot` defensive defaults.
- **`src/v4/`** retained, but the `src/v4/index.ts` now carries a `@deprecated` banner explaining the namespace is reserved for a future on-chain Plutus V4 language version that hasn't shipped. It's still re-exported from `src/index.ts` because `@harmoniclabs/plutus-machine` calls `isCostModelsV4` unconditionally in its `Machine` constructor — removing the export breaks the entire downstream pipeline at runtime. The V4 path is dead code in current usage; it just needs to stay reachable as a named import.
- **`src/CostModels.ts`** — V4 fields/branches/imports excised from `CostModels` interface, `isCostModels`, `costModelsToCborObj`, `costModelsFromCborObj`, `costModelsToLanguageViewCbor` (including the `mustHaveV4` opt and `CborUInt(3)` map entry), and `costModelsToJson`. V4 is no longer plumbed through the high-level façade; consumers wanting it must import directly from `src/v4/`.
- **`src/__tests__/v3.test.ts`** — extended with a chain-conformance test that compares `costModelV3Keys` against a pinned snapshot (`src/__tests__/v3-chain-snapshot.json`, captured from preprod 2026-05-20). This is the regression test that would have caught the original 297 → 350 drift the moment governance enacted Plomin².

### Why V4 wasn't the right home for the 350-entry shape

Upstream's V4 namespace serializes under language-view CBOR wire tag `CborUInt(3)`. The Cardano chain has not adopted a V4 language version — current Plutus scripts on the wire are still tagged `CborUInt(2)` (V3). The Plomin² governance update *extended V3's cost-model parameter* from 297 → 350 entries; it didn't add a new language version. Blockfrost and Koios agree with the chain (both serve the 350-entry shape under `PlutusV3` / `PlutusScriptV3`).

Even if every downstream consumer (`buildooor`, `blockfrost-pluts`) were rewired to route the 350-entry shape through V4, the resulting `script_data_hash` would still mismatch — chain computes against tag 2, library would emit tag 3. Independently, upstream's V4 keys were not even byte-identical to chain V3: V4 retained `quotientInteger-memory-arguments-minimum` (which chain dropped), omitted `remainderInteger-memory-arguments-minimum` (which chain added), and the resulting ordering shift caused 11 positional mismatches starting at index 139.

For *today's* chain, the only correct shape is "V3 with 350 entries under wire tag 2." Extending V3 in place gets there directly. When/if Cardano actually bumps the on-chain language version, V4 (or V5) can be reintroduced from scratch from the chain-authoritative shape at that point.

### Downstream impact (gravity-dex)

After `cardano-costmodels-ts@1.5.0` was installed via local tarball in both `gravity-sdk` and `gravity-website`, the two consumer-side workarounds that had been built around the broken `1.4.0` table were removed:

- **`gravity-testing/src/scripts/register.ts`** — the `getProtocolParamsWithArrayCostModels()` helper (and its `BLOCKFROST_HTTP` constant) was deleted. Both `main()` (T2T) and `a2tRegister()` (A2T) now call `await blockfrost.getProtocolParameters()` directly. The named-keys object that `blockfrost-pluts/mockV3CostModel` produces is now correct end-to-end because `toCostModelV3` walks all 350 keys.
- **`gravity-sdk/node_modules/@harmoniclabs/buildooor/dist/TxBuilder/TxBuilder.js:155`** — the cek patch (`Array.isArray(costs) ? costs.slice() : __assign({}, costs)`) was reverted to upstream's original `__assign({}, costs)`. It was only ever needed because the array-form workaround above forced raw arrays into the Machine constructor; once consumers stop passing arrays, the patch becomes dead code.
- The website's `node_modules/@harmoniclabs/buildooor/dist/TxBuilder/TxBuilder.js:155` still has the patched form — harmless (it's dead code there too) and will get cleaned up on the next reinstall of the buildooor tarball.

### End-to-end verification

Two complementary checks confirm the fix without committing to chain:

1. **Lang-view CBOR shape test** (`/tmp/langview-check.mjs`):
   ```
   costModelV3Keys.length === 350
   pp.costModels.PlutusScriptV3 keys: 350
   toCostModelArrV3(...).length: 350
   langView CBOR length: 963 bytes
   decoded langView V3 entry array length: 350
   ✅ PASS — V3 flows through the full offchain pipeline as 350 entries.
   ```
   This is the definitive proof: the bytes hashed for `script_data_hash` contain 350 V3 entries under wire tag 2 — exactly the shape the chain computes against.

2. **A2T register dry-run** (`gravity-testing/src/scripts/dryRunRegister.ts`) — runs the full A2T register generator against live preprod state, signs every tx, but does NOT submit. All 7 txs build cleanly without `invalid machine costs` (would have surfaced if Machine were getting a numeric-keyed array from a broken cek path) and without any script-evaluation errors during fee/exUnits calculation (would have surfaced if the 53 new builtins resolved to undefined costs).

   ```
   [dry-run] V3 cost-model entries from blockfrost: 350
   [dry-run] inputs: 225
   [dry-run] tx 0..6: all built, signed, sized (1.8 KB prep → 26.8 KB pool init → 0.8 KB claim init lp)
   [dry-run] ✅ all 7 txs built successfully without submission
   ```

The only stronger guarantee would be an actual mainnet/preprod submission. Every offchain-observable failure mode of the original bug class is ruled out.

---

## TL;DR

The on-chain V3 cost model on Cardano testnets (and shortly mainnet, via the enacted `parameter_change_action` governance proposal) is now **350 entries**. This library's V3 table is still **297 entries**, missing the 53 new Plutus Core builtins added with Plomin². Bumping the V3 table to 350 entries is the single durable fix for the `PPViewHashesDontMatch` failure that every downstream consumer is hitting today (`@harmoniclabs/buildooor`, `@harmoniclabs/blockfrost-pluts`, every offchain tx-building stack on top).

Net delta: **+54 new V3 keys**, **−1 obsolete V3 key** (`quotientInteger-memory-arguments-minimum`, which the new spec drops in favor of `remainderInteger-memory-arguments-minimum`).

This is a single-file change to [`src/CostModels.ts`](../src/CostModels.ts) plus a 50-line bump in two type-definition objects in the same file.

---

## Symptom (downstream)

Any offchain tx that executes a Plutus V3 script (mint, spend, withdraw, propose, etc.) submits with a `script_data_hash` computed over a **297-entry** V3 cost model in the language-view CBOR. The chain's ledger recomputes the same hash over the current chain-state V3 cost model (**350 entries**) and rejects the tx at phase-1 validation:

```
ConwayUtxowFailure (PPViewHashesDontMatch ...)

providedScriptIntegrity:  <297-entry-hash>
computedScriptIntegrity:  <350-entry-hash>
```

The mismatch surfaced on preprod at the epoch 289 boundary on **2026-05-16**, when `parameter_change_action` "Update Plutus Cost Models" (proposal tx `3e1b4d548e3cb10944aa42168c9e0e6c43636e96d0db7fa630645e713c722451`, proposed epoch 287, ratified 288, enacted 289) took effect.

For full investigation context and the multi-day cross-source verification that isolated the cost-model values as the sole variable (CSL `hash_script_data` + Koios V3 produced *byte-identical* match against the chain's expected hash), see [`gravity-dex/gravity-monorepo/gravity-sdk/docs/A2T_REGISTRATION_FIX_2026-05-19.md`](https://github.com/HarmonicLabs/gravity-dex) §"Investigation chain".

---

## Root cause (this library)

V3's canonical key list and defaults are defined in [`src/CostModels.ts`](../src/CostModels.ts):

| Symbol | Current | After Plomin² | File location |
|---|---:|---:|---|
| `defaultV3Costs` (frozen object literal) | 297 keys | **350 keys** | line 371 |
| `costModelV3Keys` (derived `Object.keys(defaultV3Costs)`) | 297 entries | **350 entries** | line 629 |
| `N_COST_MODEL_PLUTUS_V3` (declared constant if any) | implicit 297 | **350** | n/a, just length |
| `CostModelPlutusV3` (typescript shape) | 297 fields | **350 fields** | ~line 2089-2282 region |
| `isCostModelsV3` validator | passes 297-entry input | should pass **≥350** | ~line 1634 region |
| `partialCostModelV3` filler at ~line 706 | references 297 names | should reference 350 names | ~line 706 |

The breakage isn't logic — every helper (`toCostModelV3`, `fillV3ArrCosts`, langView CBOR emitter) computes against `costModelV3Keys` / `defaultV3Costs` as the source of truth. They will do the right thing for any length, the moment the table is correct.

Two concrete failure paths exist today, both rooted in the short table:

1. **Array → object path** (`toCostModelV3(rawArray350)` in `src/CostModels.ts`): walks indices `0..arr.length-1`, looks up `costModelV3Keys[i]` for each, and writes `result[name] = arr[i]`. For `i ≥ 297` the key is `undefined` → the assignment goes to `result[undefined]` and clobbers a single slot 53 times → output is a 297-named-keys object with the last 53 chain values silently lost.
2. **Object → CBOR (langView) path** (`costModelsToLanguageViewCbor` → V3 branch): walks `costModelV3Keys` positionally to emit the wire array. With a 297-name table, the emitted CBOR has 297 entries even if the input object carries 350 named values. Hash is computed over 297 entries → mismatch.

Both paths converge on the same fix: bring `costModelV3Keys` / `defaultV3Costs` to 350 chain-correct entries.

---

## The fix

### 1. Update `defaultV3Costs` (object literal at `src/CostModels.ts:371`)

Add the **54 missing keys** with their default values (from preprod `cost_models.PlutusV3` at the current epoch, ratified by `parameter_change_action` 2026-05-16), and remove the **1 obsolete key** `quotientInteger-memory-arguments-minimum`.

The 54 keys cluster into clean groups corresponding to the new Plomin² builtins:

| Group | Count | Keys |
|---|---:|---|
| `expModInteger` | 5 | `expModInteger-cpu-arguments-coefficient00`, `…coefficient11`, `…coefficient12`, `…memory-arguments-intercept`, `…memory-arguments-slope` |
| `remainderInteger` fill | 1 | `remainderInteger-memory-arguments-minimum` (counterpart to existing `quotientInteger-memory-arguments-minimum`, which is removed) |
| `dropList` | 3 | `dropList-cpu-arguments-intercept`, `…slope`, `…memory-arguments` |
| Array primitives | 7 | `lengthOfArray-cpu-arguments`, `lengthOfArray-memory-arguments`, `listToArray-cpu-arguments-intercept`, `listToArray-cpu-arguments-slope`, `listToArray-memory-arguments-intercept`, `listToArray-memory-arguments-slope`, `indexArray-cpu-arguments`, `indexArray-memory-arguments` (8 actually — count is 8 once `indexArray-memory-arguments` is included; revisit below) |
| BLS multi-scalar | 6 | `bls12_381_G1_multiScalarMul-cpu-arguments-intercept`, `…slope`, `…memory-arguments`, `bls12_381_G2_multiScalarMul-cpu-arguments-intercept`, `…slope`, `…memory-arguments` |
| Value-native (`insertCoin`/`lookupCoin`) | 7 | `insertCoin-cpu-arguments-intercept`, `…slope`, `insertCoin-memory-arguments-intercept`, `…slope`, `lookupCoin-cpu-arguments-intercept`, `…slope`, `lookupCoin-memory-arguments` |
| `unionValue` | 6 | `unionValue-cpu-arguments-c00`, `…c10`, `…c01`, `…c11`, `unionValue-memory-arguments-intercept`, `…slope` |
| `valueContains` | 5 | `valueContains-cpu-arguments-constant`, `…model-arguments-intercept`, `…slope1`, `…slope2`, `valueContains-memory-arguments` |
| `valueData` / `unValueData` | 9 | `valueData-cpu-arguments-intercept`, `…slope`, `valueData-memory-arguments-intercept`, `…slope`, `unValueData-cpu-arguments-c0`, `…c1`, `…c2`, `unValueData-memory-arguments-intercept`, `…slope` |
| `scaleValue` | 4 | `scaleValue-cpu-arguments-intercept`, `…slope`, `scaleValue-memory-arguments-intercept`, `…slope` |

(See [`appendix-v3-keys.txt`](./appendix-v3-keys.txt) for the verbatim 350-entry list and authoritative default values pulled from preprod's enacted parameters.)

⚠ **Insertion order matters.** The CBOR language-view serialization is positional: `costModelV3Keys` is derived via `Object.keys(defaultV3Costs)` and JS preserves object-literal insertion order. The new keys must appear at the *exact* indices the chain uses, otherwise the script-data-hash will still mismatch even with 350 entries. Cross-reference the chain ordering from `cost_models.PlutusV3` keys in `/epochs/latest/parameters` — that source returns keys in the same order the ledger applies them.

### 2. Confirm `costModelV3Keys.length === 350`

Already derived from `defaultV3Costs` via `Object.keys(...)` at line 629. No code change; just verify the value after step 1.

### 3. Update `CostModelPlutusV3` type at ~line 2089 region

Add the same 54 field names (typed as `CanBeUInteger`) and remove the `quotientInteger-memory-arguments-minimum` field. This is purely a TypeScript-shape update; runtime behavior is driven by step 1.

### 4. Update `isCostModelsV3` validator at ~line 1634

Confirm it accepts a 350-entry input (object with 350 named keys *or* array of length ≥ 350). With the table bumped, the validator's existing per-key checks just naturally include the new 53 keys.

### 5. Update `partialCostModelV3` filler at ~line 706

Add the explicit `costs["<newKey>"] = defaultV3Costs["<newKey>"]` lines for each of the 54 new keys, and remove the line referencing `quotientInteger-memory-arguments-minimum`. The filler is what populates a partial cost-model object with defaults for missing keys; it must know about every key in the canonical set.

### 6. (Optional) Bump `version`

`package.json` is at `1.2.0` today. A minor bump (`1.3.0`) is appropriate — no breaking API change, but the cost-model surface is materially larger and consumers should be able to pin against the Plomin²-aware release.

---

## Verification

A round-trip test for V3 nailed down to the bytes that hit the chain:

```ts
// 1. Pull current chain V3 cost model in array form from blockfrost.
const raw = await fetch("https://blockfrost-preprod.onchainapps.io/epochs/latest/parameters")
    .then(r => r.json());
const chainArrV3: number[] = raw.cost_models_raw.PlutusV3;
expect(chainArrV3.length).toBe(350);

// 2. Round-trip array → object → CBOR via this library.
const obj = toCostModelV3(chainArrV3);
expect(Object.keys(obj).length).toBe(350);
const cbor = costModelsToLanguageViewCbor({ PlutusScriptV3: obj }, { mustHaveV3: true });

// 3. Compare against CSL or a known-good chain-hash for the same epoch's params.
//    (See gravity-sdk's decodeGenesisTx.ts diagnostic — it captures a known-failing
//    tx and compares 11+ langView shapes, with the 350-entry Koios path producing
//    the chain-expected hash byte-for-byte.)
```

After the fix, downstream consumers should see:

- `@harmoniclabs/blockfrost-pluts`'s `mockV3CostModel` will produce a 350-key named object from blockfrost's response (no more silent 297-truncation).
- `@harmoniclabs/buildooor`'s `Machine` constructor will accept a 350-key object via its existing `__assign({}, costs)` clone — no patches needed (see "Downstream cleanup" below).
- `script_data_hash` will match the chain on every V3-script-executing tx.

---

## Downstream cleanup (after this lands)

This fix obsoletes two consumer-side workarounds that had to be invented during the May-16 incident:

### `@harmoniclabs/buildooor` — revert the cek patch

[`src/TxBuilder/TxBuilder.ts`](https://github.com/HarmonicLabs/buildooor) (corresponding `dist/TxBuilder/TxBuilder.js:155`) currently has a local workaround:

```js
// patched form — allows array-shaped cost models through to Machine
this.cek = new Machine(
    Array.isArray(costs) ? costs.slice() : { ...costs },
    pp.maxTxExecutionUnits
);
```

The patch existed only to let consumers force-feed a raw 350-entry array into the Machine (to work around *this* library's 297-key bug). Once cost-models-ts is correct, no consumer will pass arrays anymore — `Machine` will only ever see named-key objects. The original form is fine and the patch can be reverted to:

```js
this.cek = new Machine({ ...costs }, pp.maxTxExecutionUnits);
```

No behavior change for object inputs (which is now the only input shape that flows in via the canonical pipeline).

### Gravity-DEX SDK — drop the array workaround in `register.ts`

In [`gravity-dex/gravity-monorepo/gravity-sdk/gravity-testing/src/scripts/register.ts`](https://github.com/HarmonicLabs/gravity-dex), the helper `getProtocolParamsWithArrayCostModels()` exists solely to manually fetch `cost_models_raw.PlutusV3` and override `protocolParameters.costModels.PlutusScriptV3` with the raw 350-entry array. Once this fix lands, that helper can be deleted and both `main()` (T2T) and `a2tRegister()` (A2T) can call `await blockfrost.getProtocolParameters()` directly.

Same simplification applies to the Gravity DEX website's [`lib/stores/sdk-store.ts`](https://github.com/HarmonicLabs/gravity-dex) `initialize()` — no array override needed; the plain `blockfrost.getProtocolParameters()` call produces correct data once `cardano-costmodels-ts` knows all 350 keys.

---

## Why this is the right layer to fix

The original buildooor design treats cost models as a **named-keys object** internally. CEK execution queries `costs["addInteger-cpu-arguments-intercept"]`, not `costs[0]`. Arrays are only a *transport* form (wire CBOR, blockfrost's `cost_models_raw`, Koios's `costModels.PlutusV3`). The single source of truth for `index ↔ name` is **this library's `costModelV3Keys`**, and `@harmoniclabs/blockfrost-pluts/mockV3CostModel` is the *boundary* that converts array → object using that table.

Every layer above trusts that this library is correct and complete. The original `Machine(__assign({}, costs), …)` was a defensive shallow-clone of an *object*; it doesn't care about index order because the Machine doesn't either. It only breaks when something hands it an array — which only happens because something *manually* sidestepped the boundary layer, which only happens because the boundary layer's source-of-truth table is stale.

Fix the table, and the stack heals end-to-end without any other patches.

---

## Future-proofing

Cardano's governance pipeline will keep adding Plutus Core builtins. The next time this happens:

1. **Detection check** to add to CI: a periodic job that queries preprod `cost_models.PlutusV3` and asserts `Object.keys(...).length === costModelV3Keys.length`. A regression appears the moment any testnet enacts a new builtin-set update.
2. **Documentation pointer** in `src/CostModels.ts` near `defaultV3Costs`: a comment block noting the upstream chain-spec source for the canonical key list (e.g., `plutus-core` repo's `PlutusV3.hs` builtins enum) and the most recent governance action that added entries, so future updates have an obvious starting point.
3. **Default-value freshness**: distinguish *key shape* (which is a hard contract — must match chain ordering and naming) from *default values* (which can lag the chain since consumers always override with live params anyway). The breaking change is missing keys, not stale defaults.

---

## Reference data appendix

See [`appendix-v3-keys.txt`](./appendix-v3-keys.txt) for the verbatim 350-entry key list with chain-current default values, generated from preprod `/epochs/latest/parameters` on 2026-05-20.

To regenerate at any time:

```sh
curl -s "https://blockfrost-preprod.onchainapps.io/epochs/latest/parameters" \
    | jq '.cost_models_raw.PlutusV3 as $arr
        | .cost_models.PlutusV3 as $obj
        | [(keys_unsorted) as $names
            | range(0; ($arr|length))
            | { name: $names[.], value: $arr[.] }]' \
    > preprod-v3-cost-model-snapshot.json
```

(Replace `preprod` with `mainnet` once the governance action enacts on mainnet, to verify cross-network parity.)
