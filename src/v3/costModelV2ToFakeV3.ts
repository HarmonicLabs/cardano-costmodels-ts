import { defineReadOnlyProperty } from "@harmoniclabs/obj-utils";
import { a_lot } from "../common/a_lot";
import { AnyV2CostModel, toCostModelV2 } from "../v2";
import { CostModelPlutusV3 } from "./CostModelPlutusV3";
import { defaultV3Costs } from "./defaultV3Costs";
import { newV3Keys } from "./newV3Keys";

export function costModelV2ToFakeV3( costmdlsV2: AnyV2CostModel ): CostModelPlutusV3
{    
    const costs = { ...toCostModelV2( costmdlsV2 ) } as unknown as CostModelPlutusV3;

    const costKeys = Object.keys( costs );

    for( const k of costKeys )
    {
        if(
            k.startsWith("divideInteger") ||
            k.startsWith("modInteger") ||
            k.startsWith("quotientInteger") ||
            k.startsWith("remainderInteger")
        )
        {
            delete (costs as any)[k];
        }
    }

    costs["divideInteger-cpu-arguments-constant"] = defaultV3Costs["divideInteger-cpu-arguments-constant"];
    costs["divideInteger-cpu-arguments-model-arguments-c00"] = defaultV3Costs["divideInteger-cpu-arguments-model-arguments-c00"];
    costs["divideInteger-cpu-arguments-model-arguments-c01"] = defaultV3Costs["divideInteger-cpu-arguments-model-arguments-c01"];
    costs["divideInteger-cpu-arguments-model-arguments-c02"] = defaultV3Costs["divideInteger-cpu-arguments-model-arguments-c02"];
    costs["divideInteger-cpu-arguments-model-arguments-c10"] = defaultV3Costs["divideInteger-cpu-arguments-model-arguments-c10"];
    costs["divideInteger-cpu-arguments-model-arguments-c11"] = defaultV3Costs["divideInteger-cpu-arguments-model-arguments-c11"];
    costs["divideInteger-cpu-arguments-model-arguments-c20"] = defaultV3Costs["divideInteger-cpu-arguments-model-arguments-c20"];
    costs["divideInteger-cpu-arguments-model-arguments-minimum"] = defaultV3Costs["divideInteger-cpu-arguments-model-arguments-minimum"];
    costs["modInteger-cpu-arguments-constant"] = defaultV3Costs["modInteger-cpu-arguments-constant"];
    costs["modInteger-cpu-arguments-model-arguments-c00"] = defaultV3Costs["modInteger-cpu-arguments-model-arguments-c00"];
    costs["modInteger-cpu-arguments-model-arguments-c01"] = defaultV3Costs["modInteger-cpu-arguments-model-arguments-c01"];
    costs["modInteger-cpu-arguments-model-arguments-c02"] = defaultV3Costs["modInteger-cpu-arguments-model-arguments-c02"];
    costs["modInteger-cpu-arguments-model-arguments-c10"] = defaultV3Costs["modInteger-cpu-arguments-model-arguments-c10"];
    costs["modInteger-cpu-arguments-model-arguments-c11"] = defaultV3Costs["modInteger-cpu-arguments-model-arguments-c11"];
    costs["modInteger-cpu-arguments-model-arguments-c20"] = defaultV3Costs["modInteger-cpu-arguments-model-arguments-c20"];
    costs["modInteger-cpu-arguments-model-arguments-minimum"] = defaultV3Costs["modInteger-cpu-arguments-model-arguments-minimum"];
    costs["modInteger-memory-arguments-intercept"] = defaultV3Costs["modInteger-memory-arguments-intercept"];
    costs["modInteger-memory-arguments-slope"] = defaultV3Costs["modInteger-memory-arguments-slope"];
    costs["quotientInteger-cpu-arguments-constant"] = defaultV3Costs["quotientInteger-cpu-arguments-constant"];
    costs["quotientInteger-cpu-arguments-model-arguments-c00"] = defaultV3Costs["quotientInteger-cpu-arguments-model-arguments-c00"];
    costs["quotientInteger-cpu-arguments-model-arguments-c01"] = defaultV3Costs["quotientInteger-cpu-arguments-model-arguments-c01"];
    costs["quotientInteger-cpu-arguments-model-arguments-c02"] = defaultV3Costs["quotientInteger-cpu-arguments-model-arguments-c02"];
    costs["quotientInteger-cpu-arguments-model-arguments-c10"] = defaultV3Costs["quotientInteger-cpu-arguments-model-arguments-c10"];
    costs["quotientInteger-cpu-arguments-model-arguments-c11"] = defaultV3Costs["quotientInteger-cpu-arguments-model-arguments-c11"];
    costs["quotientInteger-cpu-arguments-model-arguments-c20"] = defaultV3Costs["quotientInteger-cpu-arguments-model-arguments-c20"];
    costs["quotientInteger-cpu-arguments-model-arguments-minimum"] = defaultV3Costs["quotientInteger-cpu-arguments-model-arguments-minimum"];
    costs["quotientInteger-memory-arguments-intercept"] = defaultV3Costs["quotientInteger-memory-arguments-intercept"];
    costs["quotientInteger-memory-arguments-minimum"] = defaultV3Costs["quotientInteger-memory-arguments-minimum"];
    costs["quotientInteger-memory-arguments-slope"] = defaultV3Costs["quotientInteger-memory-arguments-slope"];
    costs["remainderInteger-cpu-arguments-constant"] = defaultV3Costs["remainderInteger-cpu-arguments-constant"];
    costs["remainderInteger-cpu-arguments-model-arguments-c00"] = defaultV3Costs["remainderInteger-cpu-arguments-model-arguments-c00"];
    costs["remainderInteger-cpu-arguments-model-arguments-c01"] = defaultV3Costs["remainderInteger-cpu-arguments-model-arguments-c01"];
    costs["remainderInteger-cpu-arguments-model-arguments-c02"] = defaultV3Costs["remainderInteger-cpu-arguments-model-arguments-c02"];
    costs["remainderInteger-cpu-arguments-model-arguments-c10"] = defaultV3Costs["remainderInteger-cpu-arguments-model-arguments-c10"];
    costs["remainderInteger-cpu-arguments-model-arguments-c11"] = defaultV3Costs["remainderInteger-cpu-arguments-model-arguments-c11"];
    costs["remainderInteger-cpu-arguments-model-arguments-c20"] = defaultV3Costs["remainderInteger-cpu-arguments-model-arguments-c20"];
    costs["remainderInteger-cpu-arguments-model-arguments-minimum"] = defaultV3Costs["remainderInteger-cpu-arguments-model-arguments-minimum"];
    costs["remainderInteger-memory-arguments-intercept"] = defaultV3Costs["remainderInteger-memory-arguments-intercept"];
    costs["remainderInteger-memory-arguments-slope"] = defaultV3Costs["remainderInteger-memory-arguments-slope"];
    
    const realNewKeys = newV3Keys.filter( k => !(
        k.startsWith("divideInteger") ||
        k.startsWith("modInteger") ||
        k.startsWith("quotientInteger") ||
        k.startsWith("remainderInteger")
    ));
    for( const key of realNewKeys)
    {
        defineReadOnlyProperty( costs, key, a_lot );
    }

    // makeItALot("cekConstrCost-exBudgetCPU");
    // makeItALot("cekConstrCost-exBudgetMemory");
    // makeItALot("cekCaseCost-exBudgetCPU");
    // makeItALot("cekCaseCost-exBudgetMemory");
    // makeItALot("bls12_381_G1_add-cpu-arguments");
    // makeItALot("bls12_381_G1_add-memory-arguments");
    // makeItALot("bls12_381_G1_compress-cpu-arguments");
    // makeItALot("bls12_381_G1_compress-memory-arguments");
    // makeItALot("bls12_381_G1_equal-cpu-arguments");
    // makeItALot("bls12_381_G1_equal-memory-arguments");
    // makeItALot("bls12_381_G1_hashToGroup-cpu-arguments-intercept");
    // makeItALot("bls12_381_G1_hashToGroup-cpu-arguments-slope");
    // makeItALot("bls12_381_G1_hashToGroup-memory-arguments");
    // makeItALot("bls12_381_G1_neg-cpu-arguments");
    // makeItALot("bls12_381_G1_neg-memory-arguments");
    // makeItALot("bls12_381_G1_scalarMul-cpu-arguments-intercept");
    // makeItALot("bls12_381_G1_scalarMul-cpu-arguments-slope");
    // makeItALot("bls12_381_G1_scalarMul-memory-arguments");
    // makeItALot("bls12_381_G1_uncompress-cpu-arguments");
    // makeItALot("bls12_381_G1_uncompress-memory-arguments");
    // makeItALot("bls12_381_G2_add-cpu-arguments");
    // makeItALot("bls12_381_G2_add-memory-arguments");
    // makeItALot("bls12_381_G2_compress-cpu-arguments");
    // makeItALot("bls12_381_G2_compress-memory-arguments");
    // makeItALot("bls12_381_G2_equal-cpu-arguments");
    // makeItALot("bls12_381_G2_equal-memory-arguments");
    // makeItALot("bls12_381_G2_hashToGroup-cpu-arguments-intercept");
    // makeItALot("bls12_381_G2_hashToGroup-cpu-arguments-slope");
    // makeItALot("bls12_381_G2_hashToGroup-memory-arguments");
    // makeItALot("bls12_381_G2_neg-cpu-arguments");
    // makeItALot("bls12_381_G2_neg-memory-arguments");
    // makeItALot("bls12_381_G2_scalarMul-cpu-arguments-intercept");
    // makeItALot("bls12_381_G2_scalarMul-cpu-arguments-slope");
    // makeItALot("bls12_381_G2_scalarMul-memory-arguments");
    // makeItALot("bls12_381_G2_uncompress-cpu-arguments");
    // makeItALot("bls12_381_G2_uncompress-memory-arguments");
    // makeItALot("bls12_381_finalVerify-cpu-arguments");
    // makeItALot("bls12_381_finalVerify-memory-arguments");
    // makeItALot("bls12_381_millerLoop-cpu-arguments");
    // makeItALot("bls12_381_millerLoop-memory-arguments");
    // makeItALot("bls12_381_mulMlResult-cpu-arguments");
    // makeItALot("bls12_381_mulMlResult-memory-arguments");
    // makeItALot("keccak_256-cpu-arguments-intercept");
    // makeItALot("keccak_256-cpu-arguments-slope");
    // makeItALot("keccak_256-memory-arguments");
    // makeItALot("blake2b_224-cpu-arguments-intercept");
    // makeItALot("blake2b_224-cpu-arguments-slope");
    // makeItALot("blake2b_224-memory-arguments");
    // makeItALot("integerToByteString-cpu-arguments-c0");
    // makeItALot("integerToByteString-cpu-arguments-c1");
    // makeItALot("integerToByteString-cpu-arguments-c2");
    // makeItALot("integerToByteString-memory-arguments-intercept");
    // makeItALot("integerToByteString-memory-arguments-slope");
    // makeItALot("byteStringToInteger-cpu-arguments-c0");
    // makeItALot("byteStringToInteger-cpu-arguments-c1");
    // makeItALot("byteStringToInteger-cpu-arguments-c2");
    // makeItALot("byteStringToInteger-memory-arguments-intercept");
    // makeItALot("byteStringToInteger-memory-arguments-slope");

    return {
        ...defaultV3Costs,
        ...costs
    };
}