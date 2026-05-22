import * as fs from "fs";
import * as path from "path";
import {
    CostModelPlutusV3Array,
    costModelV3Keys,
    defaultV3Costs,
    isCostModelsV3,
    N_COST_MODEL_PLUTUS_V3,
    N_COST_MODEL_PLUTUS_V3_CHANG_1,
    N_COST_MODEL_PLUTUS_V3_CHANG_2,
    toCostModelArrV3,
    toCostModelV3,
} from "..";

// Preprod blockfrost snapshot of cost_models.PlutusV3 at the current epoch,
// captured 2026-05-20 after Plomin² governance enactment. Doubles as a frozen
// regression guard: any future cost-model parameter_change_action that
// extends V3 would have to be reflected here AND in defaultV3Costs.ts /
// CostModelPlutusV3.ts simultaneously.
const chainSnapshot = JSON.parse(
    fs.readFileSync(
        path.join(__dirname, "v3-chain-snapshot.json"),
        "utf8"
    )
) as { keys: string[], values: number[] };

const inferredDefault = Object.keys( defaultV3Costs )
.map( name => defaultV3Costs[name as keyof typeof defaultV3Costs] ) as CostModelPlutusV3Array;

test("350 keys", () => {
    expect( N_COST_MODEL_PLUTUS_V3 ).toBe( 350 );
    expect( N_COST_MODEL_PLUTUS_V3_CHANG_2 ).toBe( 297 );
    expect( N_COST_MODEL_PLUTUS_V3_CHANG_1 ).toBe( 251 );
    expect( Object.keys( defaultV3Costs ).length ).toBe( N_COST_MODEL_PLUTUS_V3 );
})

test("V3 key set + order matches chain (Plomin² snapshot)", () => {
    // This is the test that would have caught the original 297 → 350 drift
    // the moment governance enacted Plomin². Set + order equality is what the
    // chain hashes against — anything else produces PPViewHashesDontMatch.
    expect( costModelV3Keys ).toEqual( chainSnapshot.keys );
});

test("V3 default values match chain snapshot", () => {
    expect( inferredDefault ).toEqual( chainSnapshot.values );
});

test("order preserved through object ↔ array round-trip", () => {
    expect(
        toCostModelArrV3(
            toCostModelV3(
                inferredDefault as any
            )
        ).map( n => Number( n ) )
    ).toEqual( inferredDefault )
});

test("isCostModelsV3 accepts the chain-shape defaults", () => {
    expect( isCostModelsV3( defaultV3Costs ) ).toBe( true );
})

test("isCostModelsV3 still accepts the 297-entry Chang-2 baseline (backward-compat)", () => {
    const chang2Subset: any = {};
    for( const k of costModelV3Keys.slice( 0, N_COST_MODEL_PLUTUS_V3_CHANG_2 ) ) {
        chang2Subset[k] = (defaultV3Costs as any)[k];
    }
    expect( isCostModelsV3( chang2Subset ) ).toBe( true );
})
