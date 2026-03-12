import { CostModelPlutusV4 } from "./CostModelPlutusV4";
import { defaultV3Costs } from "../v3/defaultV3Costs";

// Default costs for Plutus V4 (Dijkstra era) builtins.
// V3 defaults are inherited; values for new V4 builtins are taken from
// blaze-plutus DEFAULT_BUILTIN_COSTS (packages/blaze-plutus/src/cek/costs.ts).
export const defaultV4Costs: CostModelPlutusV4 = Object.freeze({
    ...defaultV3Costs,

    // expModInteger
    "expModInteger-cpu-arguments-coefficient00": 607153,
    "expModInteger-cpu-arguments-coefficient11": 231697,
    "expModInteger-cpu-arguments-coefficient12": 53144,
    "expModInteger-memory-arguments-intercept": 0,
    "expModInteger-memory-arguments-slope": 1,

    // dropList
    "dropList-cpu-arguments-intercept": 116711,
    "dropList-cpu-arguments-slope": 1957,
    "dropList-memory-arguments": 4,

    // lengthOfArray
    "lengthOfArray-cpu-arguments": 231883,
    "lengthOfArray-memory-arguments": 10,

    // listToArray
    "listToArray-cpu-arguments-intercept": 1000,
    "listToArray-cpu-arguments-slope": 24838,
    "listToArray-memory-arguments-intercept": 7,
    "listToArray-memory-arguments-slope": 1,

    // indexArray
    "indexArray-cpu-arguments": 232010,
    "indexArray-memory-arguments": 32,

    // bls12_381_G1_multiScalarMul
    "bls12_381_G1_multiScalarMul-cpu-arguments-intercept": 321837444,
    "bls12_381_G1_multiScalarMul-cpu-arguments-slope": 25087669,
    "bls12_381_G1_multiScalarMul-memory-arguments": 18,

    // bls12_381_G2_multiScalarMul
    "bls12_381_G2_multiScalarMul-cpu-arguments-intercept": 617887431,
    "bls12_381_G2_multiScalarMul-cpu-arguments-slope": 67302824,
    "bls12_381_G2_multiScalarMul-memory-arguments": 36,

    // insertCoin
    "insertCoin-cpu-arguments-intercept": 356924,
    "insertCoin-cpu-arguments-slope": 18413,
    "insertCoin-memory-arguments-intercept": 45,
    "insertCoin-memory-arguments-slope": 21,

    // lookupCoin
    "lookupCoin-cpu-arguments-intercept": 219951,
    "lookupCoin-cpu-arguments-slope": 9444,
    "lookupCoin-memory-arguments": 1,

    // unionValue
    "unionValue-cpu-arguments-c00": 1000,
    "unionValue-cpu-arguments-c10": 172116,
    "unionValue-cpu-arguments-c01": 183150,
    "unionValue-cpu-arguments-c11": 6,
    "unionValue-memory-arguments-intercept": 24,
    "unionValue-memory-arguments-slope": 21,

    // valueContains
    "valueContains-cpu-arguments-constant": 213283,
    "valueContains-cpu-arguments-model-arguments-intercept": 618401,
    "valueContains-cpu-arguments-model-arguments-slope1": 1998,
    "valueContains-cpu-arguments-model-arguments-slope2": 28258,
    "valueContains-memory-arguments": 1,

    // valueData
    "valueData-cpu-arguments-intercept": 1000,
    "valueData-cpu-arguments-slope": 38159,
    "valueData-memory-arguments-intercept": 2,
    "valueData-memory-arguments-slope": 22,

    // unValueData
    "unValueData-cpu-arguments-c0": 1000,
    "unValueData-cpu-arguments-c1": 95933,
    "unValueData-cpu-arguments-c2": 1,
    "unValueData-memory-arguments-intercept": 1,
    "unValueData-memory-arguments-slope": 11,

    // scaleValue
    "scaleValue-cpu-arguments-intercept": 1000,
    "scaleValue-cpu-arguments-slope": 277577,
    "scaleValue-memory-arguments-intercept": 12,
    "scaleValue-memory-arguments-slope": 21,
} as CostModelPlutusV4);
