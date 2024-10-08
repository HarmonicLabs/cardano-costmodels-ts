import { canBeInteger, CanBeUInteger, cborNumber } from "./utils/ints";
import { defineNormalProperty, defineReadOnlyProperty, hasOwn, isObject } from "@harmoniclabs/obj-utils";
import { CanBeCborString, Cbor, CborArray, CborBytes, CborMap, CborMapEntry, CborObj, CborString, CborUInt, forceCborString } from "@harmoniclabs/cbor";
import { forceArrayish, isArrayish } from "./utils/isArrayish";

export type AnyV1CostModel = CostModelPlutusV1 | CostModelPlutusV1Array;

export type AnyV2CostModel = CostModelPlutusV2 | CostModelPlutusV2Array;

export type AnyV3CostModel = CostModelPlutusV3 | CostModelPlutusV3Array;

export type CostModelPlutusV1Array = CanBeUInteger[] & { length: 166 };

export type CostModelPlutusV2Array = CanBeUInteger[] & { length: 175 };

export type CostModelPlutusV3Array = CanBeUInteger[] & { length: 251 };

export interface CostModels {
    PlutusScriptV1?: AnyV1CostModel,
    PlutusScriptV2?: AnyV2CostModel,
    PlutusScriptV3?: AnyV3CostModel,
}

export const defaultV1Costs: CostModelPlutusV1 = Object.freeze({
    "addInteger-cpu-arguments-intercept": 205665,
    "addInteger-cpu-arguments-slope": 812,
    "addInteger-memory-arguments-intercept": 1,
    "addInteger-memory-arguments-slope": 1,
    "appendByteString-cpu-arguments-intercept": 1000,
    "appendByteString-cpu-arguments-slope": 571,
    "appendByteString-memory-arguments-intercept": 0,
    "appendByteString-memory-arguments-slope": 1,
    "appendString-cpu-arguments-intercept": 1000,
    "appendString-cpu-arguments-slope": 24177,
    "appendString-memory-arguments-intercept": 4,
    "appendString-memory-arguments-slope": 1,
    "bData-cpu-arguments": 1000,
    "bData-memory-arguments": 32,
    "blake2b_256-cpu-arguments-intercept": 117366,
    "blake2b_256-cpu-arguments-slope": 10475,
    "blake2b_256-memory-arguments": 4,
    "cekApplyCost-exBudgetCPU": 23000,
    "cekApplyCost-exBudgetMemory": 100,
    "cekBuiltinCost-exBudgetCPU": 23000,
    "cekBuiltinCost-exBudgetMemory": 100,
    "cekConstCost-exBudgetCPU": 23000,
    "cekConstCost-exBudgetMemory": 100,
    "cekDelayCost-exBudgetCPU": 23000,
    "cekDelayCost-exBudgetMemory": 100,
    "cekForceCost-exBudgetCPU": 23000,
    "cekForceCost-exBudgetMemory": 100,
    "cekLamCost-exBudgetCPU": 23000,
    "cekLamCost-exBudgetMemory": 100,
    "cekStartupCost-exBudgetCPU": 100,
    "cekStartupCost-exBudgetMemory": 100,
    "cekVarCost-exBudgetCPU": 23000,
    "cekVarCost-exBudgetMemory": 100,
    "chooseData-cpu-arguments": 19537,
    "chooseData-memory-arguments": 32,
    "chooseList-cpu-arguments": 175354,
    "chooseList-memory-arguments": 32,
    "chooseUnit-cpu-arguments": 46417,
    "chooseUnit-memory-arguments": 4,
    "consByteString-cpu-arguments-intercept": 221973,
    "consByteString-cpu-arguments-slope": 511,
    "consByteString-memory-arguments-intercept": 0,
    "consByteString-memory-arguments-slope": 1,
    "constrData-cpu-arguments": 89141,
    "constrData-memory-arguments": 32,
    "decodeUtf8-cpu-arguments-intercept": 497525,
    "decodeUtf8-cpu-arguments-slope": 14068,
    "decodeUtf8-memory-arguments-intercept": 4,
    "decodeUtf8-memory-arguments-slope": 2,
    "divideInteger-cpu-arguments-constant": 196500,
    "divideInteger-cpu-arguments-model-arguments-intercept": 453240,
    "divideInteger-cpu-arguments-model-arguments-slope": 220,
    "divideInteger-memory-arguments-intercept": 0,
    "divideInteger-memory-arguments-minimum": 1,
    "divideInteger-memory-arguments-slope": 1,
    "encodeUtf8-cpu-arguments-intercept": 1000,
    "encodeUtf8-cpu-arguments-slope": 28662,
    "encodeUtf8-memory-arguments-intercept": 4,
    "encodeUtf8-memory-arguments-slope": 2,
    "equalsByteString-cpu-arguments-constant": 245000,
    "equalsByteString-cpu-arguments-intercept": 216773,
    "equalsByteString-cpu-arguments-slope": 62,
    "equalsByteString-memory-arguments": 1,
    "equalsData-cpu-arguments-intercept": 1060367,
    "equalsData-cpu-arguments-slope": 12586,
    "equalsData-memory-arguments": 1,
    "equalsInteger-cpu-arguments-intercept": 208512,
    "equalsInteger-cpu-arguments-slope": 421,
    "equalsInteger-memory-arguments": 1,
    "equalsString-cpu-arguments-constant": 187000,
    "equalsString-cpu-arguments-intercept": 1000,
    "equalsString-cpu-arguments-slope": 52998,
    "equalsString-memory-arguments": 1,
    "fstPair-cpu-arguments": 80436,
    "fstPair-memory-arguments": 32,
    "headList-cpu-arguments": 43249,
    "headList-memory-arguments": 32,
    "iData-cpu-arguments": 1000,
    "iData-memory-arguments": 32,
    "ifThenElse-cpu-arguments": 80556,
    "ifThenElse-memory-arguments": 1,
    "indexByteString-cpu-arguments": 57667,
    "indexByteString-memory-arguments": 4,
    "lengthOfByteString-cpu-arguments": 1000,
    "lengthOfByteString-memory-arguments": 10,
    "lessThanByteString-cpu-arguments-intercept": 197145,
    "lessThanByteString-cpu-arguments-slope": 156,
    "lessThanByteString-memory-arguments": 1,
    "lessThanEqualsByteString-cpu-arguments-intercept": 197145,
    "lessThanEqualsByteString-cpu-arguments-slope": 156,
    "lessThanEqualsByteString-memory-arguments": 1,
    "lessThanEqualsInteger-cpu-arguments-intercept": 204924,
    "lessThanEqualsInteger-cpu-arguments-slope": 473,
    "lessThanEqualsInteger-memory-arguments": 1,
    "lessThanInteger-cpu-arguments-intercept": 208896,
    "lessThanInteger-cpu-arguments-slope": 511,
    "lessThanInteger-memory-arguments": 1,
    "listData-cpu-arguments": 52467,
    "listData-memory-arguments": 32,
    "mapData-cpu-arguments": 64832,
    "mapData-memory-arguments": 32,
    "mkCons-cpu-arguments": 65493,
    "mkCons-memory-arguments": 32,
    "mkNilData-cpu-arguments": 22558,
    "mkNilData-memory-arguments": 32,
    "mkNilPairData-cpu-arguments": 16563,
    "mkNilPairData-memory-arguments": 32,
    "mkPairData-cpu-arguments": 76511,
    "mkPairData-memory-arguments": 32,
    "modInteger-cpu-arguments-constant": 196500,
    "modInteger-cpu-arguments-model-arguments-intercept": 453240,
    "modInteger-cpu-arguments-model-arguments-slope": 220,
    "modInteger-memory-arguments-intercept": 0,
    "modInteger-memory-arguments-minimum": 1,
    "modInteger-memory-arguments-slope": 1,
    "multiplyInteger-cpu-arguments-intercept": 69522,
    "multiplyInteger-cpu-arguments-slope": 11687,
    "multiplyInteger-memory-arguments-intercept": 0,
    "multiplyInteger-memory-arguments-slope": 1,
    "nullList-cpu-arguments": 60091,
    "nullList-memory-arguments": 32,
    "quotientInteger-cpu-arguments-constant": 196500,
    "quotientInteger-cpu-arguments-model-arguments-intercept": 453240,
    "quotientInteger-cpu-arguments-model-arguments-slope": 220,
    "quotientInteger-memory-arguments-intercept": 0,
    "quotientInteger-memory-arguments-minimum": 1,
    "quotientInteger-memory-arguments-slope": 1,
    "remainderInteger-cpu-arguments-constant": 196500,
    "remainderInteger-cpu-arguments-model-arguments-intercept": 453240,
    "remainderInteger-cpu-arguments-model-arguments-slope": 220,
    "remainderInteger-memory-arguments-intercept": 0,
    "remainderInteger-memory-arguments-minimum": 1,
    "remainderInteger-memory-arguments-slope": 1,
    "sha2_256-cpu-arguments-intercept": 806990,
    "sha2_256-cpu-arguments-slope": 30482,
    "sha2_256-memory-arguments": 4,
    "sha3_256-cpu-arguments-intercept": 1927926,
    "sha3_256-cpu-arguments-slope": 82523,
    "sha3_256-memory-arguments": 4,
    "sliceByteString-cpu-arguments-intercept": 265318,
    "sliceByteString-cpu-arguments-slope": 0,
    "sliceByteString-memory-arguments-intercept": 4,
    "sliceByteString-memory-arguments-slope": 0,
    "sndPair-cpu-arguments": 85931,
    "sndPair-memory-arguments": 32,
    "subtractInteger-cpu-arguments-intercept": 205665,
    "subtractInteger-cpu-arguments-slope": 812,
    "subtractInteger-memory-arguments-intercept": 1,
    "subtractInteger-memory-arguments-slope": 1,
    "tailList-cpu-arguments": 41182,
    "tailList-memory-arguments": 32,
    "trace-cpu-arguments": 212342,
    "trace-memory-arguments": 32,
    "unBData-cpu-arguments": 31220,
    "unBData-memory-arguments": 32,
    "unConstrData-cpu-arguments": 32696,
    "unConstrData-memory-arguments": 32,
    "unIData-cpu-arguments": 43357,
    "unIData-memory-arguments": 32,
    "unListData-cpu-arguments": 32247,
    "unListData-memory-arguments": 32,
    "unMapData-cpu-arguments": 38314,
    "unMapData-memory-arguments": 32,
    "verifyEd25519Signature-cpu-arguments-intercept": 9462713,
    "verifyEd25519Signature-cpu-arguments-slope": 1021,
    "verifyEd25519Signature-memory-arguments": 10
} as CostModelPlutusV1);

export const defaultV2Costs: CostModelPlutusV2 = Object.freeze({
    "addInteger-cpu-arguments-intercept": 205665,
    "addInteger-cpu-arguments-slope": 812,
    "addInteger-memory-arguments-intercept": 1,
    "addInteger-memory-arguments-slope": 1,
    "appendByteString-cpu-arguments-intercept": 1000,
    "appendByteString-cpu-arguments-slope": 571,
    "appendByteString-memory-arguments-intercept": 0,
    "appendByteString-memory-arguments-slope": 1,
    "appendString-cpu-arguments-intercept": 1000,
    "appendString-cpu-arguments-slope": 24177,
    "appendString-memory-arguments-intercept": 4,
    "appendString-memory-arguments-slope": 1,
    "bData-cpu-arguments": 1000,
    "bData-memory-arguments": 32,
    "blake2b_256-cpu-arguments-intercept": 117366,
    "blake2b_256-cpu-arguments-slope": 10475,
    "blake2b_256-memory-arguments": 4,
    "cekApplyCost-exBudgetCPU": 23000,
    "cekApplyCost-exBudgetMemory": 100,
    "cekBuiltinCost-exBudgetCPU": 23000,
    "cekBuiltinCost-exBudgetMemory": 100,
    "cekConstCost-exBudgetCPU": 23000,
    "cekConstCost-exBudgetMemory": 100,
    "cekDelayCost-exBudgetCPU": 23000,
    "cekDelayCost-exBudgetMemory": 100,
    "cekForceCost-exBudgetCPU": 23000,
    "cekForceCost-exBudgetMemory": 100,
    "cekLamCost-exBudgetCPU": 23000,
    "cekLamCost-exBudgetMemory": 100,
    "cekStartupCost-exBudgetCPU": 100,
    "cekStartupCost-exBudgetMemory": 100,
    "cekVarCost-exBudgetCPU": 23000,
    "cekVarCost-exBudgetMemory": 100,
    "chooseData-cpu-arguments": 19537,
    "chooseData-memory-arguments": 32,
    "chooseList-cpu-arguments": 175354,
    "chooseList-memory-arguments": 32,
    "chooseUnit-cpu-arguments": 46417,
    "chooseUnit-memory-arguments": 4,
    "consByteString-cpu-arguments-intercept": 221973,
    "consByteString-cpu-arguments-slope": 511,
    "consByteString-memory-arguments-intercept": 0,
    "consByteString-memory-arguments-slope": 1,
    "constrData-cpu-arguments": 89141,
    "constrData-memory-arguments": 32,
    "decodeUtf8-cpu-arguments-intercept": 497525,
    "decodeUtf8-cpu-arguments-slope": 14068,
    "decodeUtf8-memory-arguments-intercept": 4,
    "decodeUtf8-memory-arguments-slope": 2,
    "divideInteger-cpu-arguments-constant": 196500,
    "divideInteger-cpu-arguments-model-arguments-intercept": 453240,
    "divideInteger-cpu-arguments-model-arguments-slope": 220,
    "divideInteger-memory-arguments-intercept": 0,
    "divideInteger-memory-arguments-minimum": 1,
    "divideInteger-memory-arguments-slope": 1,
    "encodeUtf8-cpu-arguments-intercept": 1000,
    "encodeUtf8-cpu-arguments-slope": 28662,
    "encodeUtf8-memory-arguments-intercept": 4,
    "encodeUtf8-memory-arguments-slope": 2,
    "equalsByteString-cpu-arguments-constant": 245000,
    "equalsByteString-cpu-arguments-intercept": 216773,
    "equalsByteString-cpu-arguments-slope": 62,
    "equalsByteString-memory-arguments": 1,
    "equalsData-cpu-arguments-intercept": 1060367,
    "equalsData-cpu-arguments-slope": 12586,
    "equalsData-memory-arguments": 1,
    "equalsInteger-cpu-arguments-intercept": 208512,
    "equalsInteger-cpu-arguments-slope": 421,
    "equalsInteger-memory-arguments": 1,
    "equalsString-cpu-arguments-constant": 187000,
    "equalsString-cpu-arguments-intercept": 1000,
    "equalsString-cpu-arguments-slope": 52998,
    "equalsString-memory-arguments": 1,
    "fstPair-cpu-arguments": 80436,
    "fstPair-memory-arguments": 32,
    "headList-cpu-arguments": 43249,
    "headList-memory-arguments": 32,
    "iData-cpu-arguments": 1000,
    "iData-memory-arguments": 32,
    "ifThenElse-cpu-arguments": 80556,
    "ifThenElse-memory-arguments": 1,
    "indexByteString-cpu-arguments": 57667,
    "indexByteString-memory-arguments": 4,
    "lengthOfByteString-cpu-arguments": 1000,
    "lengthOfByteString-memory-arguments": 10,
    "lessThanByteString-cpu-arguments-intercept": 197145,
    "lessThanByteString-cpu-arguments-slope": 156,
    "lessThanByteString-memory-arguments": 1,
    "lessThanEqualsByteString-cpu-arguments-intercept": 197145,
    "lessThanEqualsByteString-cpu-arguments-slope": 156,
    "lessThanEqualsByteString-memory-arguments": 1,
    "lessThanEqualsInteger-cpu-arguments-intercept": 204924,
    "lessThanEqualsInteger-cpu-arguments-slope": 473,
    "lessThanEqualsInteger-memory-arguments": 1,
    "lessThanInteger-cpu-arguments-intercept": 208896,
    "lessThanInteger-cpu-arguments-slope": 511,
    "lessThanInteger-memory-arguments": 1,
    "listData-cpu-arguments": 52467,
    "listData-memory-arguments": 32,
    "mapData-cpu-arguments": 64832,
    "mapData-memory-arguments": 32,
    "mkCons-cpu-arguments": 65493,
    "mkCons-memory-arguments": 32,
    "mkNilData-cpu-arguments": 22558,
    "mkNilData-memory-arguments": 32,
    "mkNilPairData-cpu-arguments": 16563,
    "mkNilPairData-memory-arguments": 32,
    "mkPairData-cpu-arguments": 76511,
    "mkPairData-memory-arguments": 32,
    "modInteger-cpu-arguments-constant": 196500,
    "modInteger-cpu-arguments-model-arguments-intercept": 453240,
    "modInteger-cpu-arguments-model-arguments-slope": 220,
    "modInteger-memory-arguments-intercept": 0,
    "modInteger-memory-arguments-minimum": 1,
    "modInteger-memory-arguments-slope": 1,
    "multiplyInteger-cpu-arguments-intercept": 69522,
    "multiplyInteger-cpu-arguments-slope": 11687,
    "multiplyInteger-memory-arguments-intercept": 0,
    "multiplyInteger-memory-arguments-slope": 1,
    "nullList-cpu-arguments": 60091,
    "nullList-memory-arguments": 32,
    "quotientInteger-cpu-arguments-constant": 196500,
    "quotientInteger-cpu-arguments-model-arguments-intercept": 453240,
    "quotientInteger-cpu-arguments-model-arguments-slope": 220,
    "quotientInteger-memory-arguments-intercept": 0,
    "quotientInteger-memory-arguments-minimum": 1,
    "quotientInteger-memory-arguments-slope": 1,
    "remainderInteger-cpu-arguments-constant": 196500,
    "remainderInteger-cpu-arguments-model-arguments-intercept": 453240,
    "remainderInteger-cpu-arguments-model-arguments-slope": 220,
    "remainderInteger-memory-arguments-intercept": 0,
    "remainderInteger-memory-arguments-minimum": 1,
    "remainderInteger-memory-arguments-slope": 1,
    "serialiseData-cpu-arguments-intercept": 1159724,
    "serialiseData-cpu-arguments-slope": 392670,
    "serialiseData-memory-arguments-intercept": 0,
    "serialiseData-memory-arguments-slope": 2,
    "sha2_256-cpu-arguments-intercept": 806990,
    "sha2_256-cpu-arguments-slope": 30482,
    "sha2_256-memory-arguments": 4,
    "sha3_256-cpu-arguments-intercept": 1927926,
    "sha3_256-cpu-arguments-slope": 82523,
    "sha3_256-memory-arguments": 4,
    "sliceByteString-cpu-arguments-intercept": 265318,
    "sliceByteString-cpu-arguments-slope": 0,
    "sliceByteString-memory-arguments-intercept": 4,
    "sliceByteString-memory-arguments-slope": 0,
    "sndPair-cpu-arguments": 85931,
    "sndPair-memory-arguments": 32,
    "subtractInteger-cpu-arguments-intercept": 205665,
    "subtractInteger-cpu-arguments-slope": 812,
    "subtractInteger-memory-arguments-intercept": 1,
    "subtractInteger-memory-arguments-slope": 1,
    "tailList-cpu-arguments": 41182,
    "tailList-memory-arguments": 32,
    "trace-cpu-arguments": 212342,
    "trace-memory-arguments": 32,
    "unBData-cpu-arguments": 31220,
    "unBData-memory-arguments": 32,
    "unConstrData-cpu-arguments": 32696,
    "unConstrData-memory-arguments": 32,
    "unIData-cpu-arguments": 43357,
    "unIData-memory-arguments": 32,
    "unListData-cpu-arguments": 32247,
    "unListData-memory-arguments": 32,
    "unMapData-cpu-arguments": 38314,
    "unMapData-memory-arguments": 32,
    "verifyEcdsaSecp256k1Signature-cpu-arguments": 35892428,
    "verifyEcdsaSecp256k1Signature-memory-arguments": 10,
    "verifyEd25519Signature-cpu-arguments-intercept": 57996947,
    "verifyEd25519Signature-cpu-arguments-slope": 18975,
    "verifyEd25519Signature-memory-arguments": 10,
    "verifySchnorrSecp256k1Signature-cpu-arguments-intercept": 38887044,
    "verifySchnorrSecp256k1Signature-cpu-arguments-slope": 32947,
    "verifySchnorrSecp256k1Signature-memory-arguments": 10
} as CostModelPlutusV2);

export const defaultV3Costs: CostModelPlutusV3 = Object.freeze({
    "addInteger-cpu-arguments-intercept": 100788,
    "addInteger-cpu-arguments-slope": 420,
    "addInteger-memory-arguments-intercept": 1,
    "addInteger-memory-arguments-slope": 1,
    "appendByteString-cpu-arguments-intercept": 1000,
    "appendByteString-cpu-arguments-slope": 173,
    "appendByteString-memory-arguments-intercept": 0,
    "appendByteString-memory-arguments-slope": 1,
    "appendString-cpu-arguments-intercept": 1000,
    "appendString-cpu-arguments-slope": 59957,
    "appendString-memory-arguments-intercept": 4,
    "appendString-memory-arguments-slope": 1,
    "bData-cpu-arguments": 11183,
    "bData-memory-arguments": 32,
    "blake2b_256-cpu-arguments-intercept": 201305,
    "blake2b_256-cpu-arguments-slope": 8356,
    "blake2b_256-memory-arguments": 4,
    "cekApplyCost-exBudgetCPU": 16000,
    "cekApplyCost-exBudgetMemory": 100,
    "cekBuiltinCost-exBudgetCPU": 16000,
    "cekBuiltinCost-exBudgetMemory": 100,
    "cekConstCost-exBudgetCPU": 16000,
    "cekConstCost-exBudgetMemory": 100,
    "cekDelayCost-exBudgetCPU": 16000,
    "cekDelayCost-exBudgetMemory": 100,
    "cekForceCost-exBudgetCPU": 16000,
    "cekForceCost-exBudgetMemory": 100,
    "cekLamCost-exBudgetCPU": 16000,
    "cekLamCost-exBudgetMemory": 100,
    "cekStartupCost-exBudgetCPU": 100,
    "cekStartupCost-exBudgetMemory": 100,
    "cekVarCost-exBudgetCPU": 16000,
    "cekVarCost-exBudgetMemory": 100,
    "chooseData-cpu-arguments": 94375,
    "chooseData-memory-arguments": 32,
    "chooseList-cpu-arguments": 132994,
    "chooseList-memory-arguments": 32,
    "chooseUnit-cpu-arguments": 61462,
    "chooseUnit-memory-arguments": 4,
    "consByteString-cpu-arguments-intercept": 72010,
    "consByteString-cpu-arguments-slope": 178,
    "consByteString-memory-arguments-intercept": 0,
    "consByteString-memory-arguments-slope": 1,
    "constrData-cpu-arguments": 22151,
    "constrData-memory-arguments": 32,
    "decodeUtf8-cpu-arguments-intercept": 91189,
    "decodeUtf8-cpu-arguments-slope": 769,
    "decodeUtf8-memory-arguments-intercept": 4,
    "decodeUtf8-memory-arguments-slope": 2,
    "divideInteger-cpu-arguments-constant": 85848,
    "divideInteger-cpu-arguments-model-arguments-c00": 123203,
    "divideInteger-cpu-arguments-model-arguments-c01": 7305,
    "divideInteger-cpu-arguments-model-arguments-c02": -900,
    "divideInteger-cpu-arguments-model-arguments-c10": 1716,
    "divideInteger-cpu-arguments-model-arguments-c11": 549,
    "divideInteger-cpu-arguments-model-arguments-c20": 57,
    "divideInteger-cpu-arguments-model-arguments-minimum": 453240,
    "divideInteger-memory-arguments-intercept": 0,
    "divideInteger-memory-arguments-minimum": 1,
    "divideInteger-memory-arguments-slope": 1,
    "encodeUtf8-cpu-arguments-intercept": 1000,
    "encodeUtf8-cpu-arguments-slope": 42921,
    "encodeUtf8-memory-arguments-intercept": 4,
    "encodeUtf8-memory-arguments-slope": 2,
    "equalsByteString-cpu-arguments-constant": 24548,
    "equalsByteString-cpu-arguments-intercept": 29498,
    "equalsByteString-cpu-arguments-slope": 38,
    "equalsByteString-memory-arguments": 1,
    "equalsData-cpu-arguments-intercept": 898148,
    "equalsData-cpu-arguments-slope": 27279,
    "equalsData-memory-arguments": 1,
    "equalsInteger-cpu-arguments-intercept": 51775,
    "equalsInteger-cpu-arguments-slope": 558,
    "equalsInteger-memory-arguments": 1,
    "equalsString-cpu-arguments-constant": 39184,
    "equalsString-cpu-arguments-intercept": 1000,
    "equalsString-cpu-arguments-slope": 60594,
    "equalsString-memory-arguments": 1,
    "fstPair-cpu-arguments": 141895,
    "fstPair-memory-arguments": 32,
    "headList-cpu-arguments": 83150,
    "headList-memory-arguments": 32,
    "iData-cpu-arguments": 15299,
    "iData-memory-arguments": 32,
    "ifThenElse-cpu-arguments": 76049,
    "ifThenElse-memory-arguments": 1,
    "indexByteString-cpu-arguments": 13169,
    "indexByteString-memory-arguments": 4,
    "lengthOfByteString-cpu-arguments": 22100,
    "lengthOfByteString-memory-arguments": 10,
    "lessThanByteString-cpu-arguments-intercept": 28999,
    "lessThanByteString-cpu-arguments-slope": 74,
    "lessThanByteString-memory-arguments": 1,
    "lessThanEqualsByteString-cpu-arguments-intercept": 28999,
    "lessThanEqualsByteString-cpu-arguments-slope": 74,
    "lessThanEqualsByteString-memory-arguments": 1,
    "lessThanEqualsInteger-cpu-arguments-intercept": 43285,
    "lessThanEqualsInteger-cpu-arguments-slope": 552,
    "lessThanEqualsInteger-memory-arguments": 1,
    "lessThanInteger-cpu-arguments-intercept": 44749,
    "lessThanInteger-cpu-arguments-slope": 541,
    "lessThanInteger-memory-arguments": 1,
    "listData-cpu-arguments": 33852,
    "listData-memory-arguments": 32,
    "mapData-cpu-arguments": 68246,
    "mapData-memory-arguments": 32,
    "mkCons-cpu-arguments": 72362,
    "mkCons-memory-arguments": 32,
    "mkNilData-cpu-arguments": 7243,
    "mkNilData-memory-arguments": 32,
    "mkNilPairData-cpu-arguments": 7391,
    "mkNilPairData-memory-arguments": 32,
    "mkPairData-cpu-arguments": 11546,
    "mkPairData-memory-arguments": 32,
    "modInteger-cpu-arguments-constant": 85848,
    "modInteger-cpu-arguments-model-arguments-c00": 123203,
    "modInteger-cpu-arguments-model-arguments-c01": 7305,
    "modInteger-cpu-arguments-model-arguments-c02": -900,
    "modInteger-cpu-arguments-model-arguments-c10": 1716,
    "modInteger-cpu-arguments-model-arguments-c11": 549,
    "modInteger-cpu-arguments-model-arguments-c20": 57,
    "modInteger-cpu-arguments-model-arguments-minimum": 85848,
    "modInteger-memory-arguments-intercept": 0,
    "modInteger-memory-arguments-slope": 1,
    "multiplyInteger-cpu-arguments-intercept": 90434,
    "multiplyInteger-cpu-arguments-slope": 519,
    "multiplyInteger-memory-arguments-intercept": 0,
    "multiplyInteger-memory-arguments-slope": 1,
    "nullList-cpu-arguments": 74433,
    "nullList-memory-arguments": 32,
    "quotientInteger-cpu-arguments-constant": 85848,
    "quotientInteger-cpu-arguments-model-arguments-c00": 123203,
    "quotientInteger-cpu-arguments-model-arguments-c01": 7305,
    "quotientInteger-cpu-arguments-model-arguments-c02": -900,
    "quotientInteger-cpu-arguments-model-arguments-c10": 1716,
    "quotientInteger-cpu-arguments-model-arguments-c11": 549,
    "quotientInteger-cpu-arguments-model-arguments-c20": 57,
    "quotientInteger-cpu-arguments-model-arguments-minimum": 85848,
    "quotientInteger-memory-arguments-intercept": 0,
    "quotientInteger-memory-arguments-minimum": 1,
    "quotientInteger-memory-arguments-slope": 1,
    "remainderInteger-cpu-arguments-constant": 85848,
    "remainderInteger-cpu-arguments-model-arguments-c00": 123203,
    "remainderInteger-cpu-arguments-model-arguments-c01": 7305,
    "remainderInteger-cpu-arguments-model-arguments-c02": -900,
    "remainderInteger-cpu-arguments-model-arguments-c10": 1716,
    "remainderInteger-cpu-arguments-model-arguments-c11": 549,
    "remainderInteger-cpu-arguments-model-arguments-c20": 57,
    "remainderInteger-cpu-arguments-model-arguments-minimum": 85848,
    "remainderInteger-memory-arguments-intercept": 0,
    "remainderInteger-memory-arguments-slope": 1,
    "serialiseData-cpu-arguments-intercept": 955506,
    "serialiseData-cpu-arguments-slope": 213312,
    "serialiseData-memory-arguments-intercept": 0,
    "serialiseData-memory-arguments-slope": 2,
    "sha2_256-cpu-arguments-intercept": 270652,
    "sha2_256-cpu-arguments-slope": 22588,
    "sha2_256-memory-arguments": 4,
    "sha3_256-cpu-arguments-intercept": 1457325,
    "sha3_256-cpu-arguments-slope": 64566,
    "sha3_256-memory-arguments": 4,
    "sliceByteString-cpu-arguments-intercept": 20467,
    "sliceByteString-cpu-arguments-slope": 1,
    "sliceByteString-memory-arguments-intercept": 4,
    "sliceByteString-memory-arguments-slope": 0,
    "sndPair-cpu-arguments": 141992,
    "sndPair-memory-arguments": 32,
    "subtractInteger-cpu-arguments-intercept": 100788,
    "subtractInteger-cpu-arguments-slope": 420,
    "subtractInteger-memory-arguments-intercept": 1,
    "subtractInteger-memory-arguments-slope": 1,
    "tailList-cpu-arguments": 81663,
    "tailList-memory-arguments": 32,
    "trace-cpu-arguments": 59498,
    "trace-memory-arguments": 32,
    "unBData-cpu-arguments": 20142,
    "unBData-memory-arguments": 32,
    "unConstrData-cpu-arguments": 24588,
    "unConstrData-memory-arguments": 32,
    "unIData-cpu-arguments": 20744,
    "unIData-memory-arguments": 32,
    "unListData-cpu-arguments": 25933,
    "unListData-memory-arguments": 32,
    "unMapData-cpu-arguments": 24623,
    "unMapData-memory-arguments": 32,
    "verifyEcdsaSecp256k1Signature-cpu-arguments": 43053543,
    "verifyEcdsaSecp256k1Signature-memory-arguments": 10,
    "verifyEd25519Signature-cpu-arguments-intercept": 53384111,
    "verifyEd25519Signature-cpu-arguments-slope": 14333,
    "verifyEd25519Signature-memory-arguments": 10,
    "verifySchnorrSecp256k1Signature-cpu-arguments-intercept": 43574283,
    "verifySchnorrSecp256k1Signature-cpu-arguments-slope": 26308,
    "verifySchnorrSecp256k1Signature-memory-arguments": 10,
    "cekConstrCost-exBudgetCPU": 16000,
    "cekConstrCost-exBudgetMemory": 100,
    "cekCaseCost-exBudgetCPU": 16000,
    "cekCaseCost-exBudgetMemory": 100,
    "bls12_381_G1_add-cpu-arguments": 962335,
    "bls12_381_G1_add-memory-arguments": 18,
    "bls12_381_G1_compress-cpu-arguments": 2780678,
    "bls12_381_G1_compress-memory-arguments": 6,
    "bls12_381_G1_equal-cpu-arguments": 442008,
    "bls12_381_G1_equal-memory-arguments": 1,
    "bls12_381_G1_hashToGroup-cpu-arguments-intercept": 52538055,
    "bls12_381_G1_hashToGroup-cpu-arguments-slope": 3756,
    "bls12_381_G1_hashToGroup-memory-arguments": 18,
    "bls12_381_G1_neg-cpu-arguments": 267929,
    "bls12_381_G1_neg-memory-arguments": 18,
    "bls12_381_G1_scalarMul-cpu-arguments-intercept": 76433006,
    "bls12_381_G1_scalarMul-cpu-arguments-slope": 8868,
    "bls12_381_G1_scalarMul-memory-arguments": 18,
    "bls12_381_G1_uncompress-cpu-arguments": 52948122,
    "bls12_381_G1_uncompress-memory-arguments": 18,
    "bls12_381_G2_add-cpu-arguments": 1995836,
    "bls12_381_G2_add-memory-arguments": 36,
    "bls12_381_G2_compress-cpu-arguments": 3227919,
    "bls12_381_G2_compress-memory-arguments": 12,
    "bls12_381_G2_equal-cpu-arguments": 901022,
    "bls12_381_G2_equal-memory-arguments": 1,
    "bls12_381_G2_hashToGroup-cpu-arguments-intercept": 166917843,
    "bls12_381_G2_hashToGroup-cpu-arguments-slope": 4307,
    "bls12_381_G2_hashToGroup-memory-arguments": 36,
    "bls12_381_G2_neg-cpu-arguments": 284546,
    "bls12_381_G2_neg-memory-arguments": 36,
    "bls12_381_G2_scalarMul-cpu-arguments-intercept": 158221314,
    "bls12_381_G2_scalarMul-cpu-arguments-slope": 26549,
    "bls12_381_G2_scalarMul-memory-arguments": 36,
    "bls12_381_G2_uncompress-cpu-arguments": 74698472,
    "bls12_381_G2_uncompress-memory-arguments": 36,
    "bls12_381_finalVerify-cpu-arguments": 333849714,
    "bls12_381_finalVerify-memory-arguments": 1,
    "bls12_381_millerLoop-cpu-arguments": 254006273,
    "bls12_381_millerLoop-memory-arguments": 72,
    "bls12_381_mulMlResult-cpu-arguments": 2174038,
    "bls12_381_mulMlResult-memory-arguments": 72,
    "keccak_256-cpu-arguments-intercept": 2261318,
    "keccak_256-cpu-arguments-slope": 64571,
    "keccak_256-memory-arguments": 4,
    "blake2b_224-cpu-arguments-intercept": 201305,
    "blake2b_224-cpu-arguments-slope": 8356,
    "blake2b_224-memory-arguments": 4,
    "integerToByteString-cpu-arguments-c0": 1293828,
    "integerToByteString-cpu-arguments-c1": 28716,
    "integerToByteString-cpu-arguments-c2": 63,
    "integerToByteString-memory-arguments-intercept": 0,
    "integerToByteString-memory-arguments-slope": 1,
    "byteStringToInteger-cpu-arguments-c0": 1006041,
    "byteStringToInteger-cpu-arguments-c1": 43623,
    "byteStringToInteger-cpu-arguments-c2": 251,
    "byteStringToInteger-memory-arguments-intercept": 0,
    "byteStringToInteger-memory-arguments-slope": 1
} as CostModelPlutusV3);

export const costModelV1Keys: (keyof CostModelPlutusV1)[] = Object.freeze( Object.keys( defaultV1Costs ) ) as any;

export const costModelV2Keys: (keyof CostModelPlutusV2)[] = Object.freeze( Object.keys( defaultV2Costs ) ) as any;

export const costModelV3Keys: (keyof CostModelPlutusV3)[] = Object.freeze( Object.keys( defaultV3Costs ) ) as any;

const a_lot = BigInt( Number.MAX_SAFE_INTEGER );

export function costModelV1ToFakeV2( costmdlsV1: AnyV1CostModel ): CostModelPlutusV2
{    
    const costs = toCostModelV1( costmdlsV1 );

    function makeItALot( key: keyof CostModelPlutusV2 )
    {
        defineReadOnlyProperty( costs, key, a_lot );
    }

    makeItALot( "serialiseData-cpu-arguments-intercept" );
    makeItALot( "serialiseData-cpu-arguments-slope" );
    makeItALot( "serialiseData-memory-arguments-intercept" );
    makeItALot( "serialiseData-memory-arguments-slope" );
    makeItALot( "verifyEcdsaSecp256k1Signature-cpu-arguments" );
    makeItALot( "verifyEcdsaSecp256k1Signature-memory-arguments" );
    makeItALot( "verifySchnorrSecp256k1Signature-cpu-arguments-intercept" );
    makeItALot( "verifySchnorrSecp256k1Signature-cpu-arguments-slope" );
    makeItALot( "verifySchnorrSecp256k1Signature-memory-arguments" );

    return costs as any;
}

export function costModelV2ToFakeV3( costmdlsV2: AnyV2CostModel ): CostModelPlutusV3
{    
    const costs = { ...toCostModelV2( costmdlsV2 ) } as unknown as CostModelPlutusV3;

    function makeItALot( key: keyof CostModelPlutusV3 )
    {
        defineReadOnlyProperty( costs, key, a_lot );
    }

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
    
    makeItALot("cekConstrCost-exBudgetCPU");
    makeItALot("cekConstrCost-exBudgetMemory");
    makeItALot("cekCaseCost-exBudgetCPU");
    makeItALot("cekCaseCost-exBudgetMemory");
    makeItALot("bls12_381_G1_add-cpu-arguments");
    makeItALot("bls12_381_G1_add-memory-arguments");
    makeItALot("bls12_381_G1_compress-cpu-arguments");
    makeItALot("bls12_381_G1_compress-memory-arguments");
    makeItALot("bls12_381_G1_equal-cpu-arguments");
    makeItALot("bls12_381_G1_equal-memory-arguments");
    makeItALot("bls12_381_G1_hashToGroup-cpu-arguments-intercept");
    makeItALot("bls12_381_G1_hashToGroup-cpu-arguments-slope");
    makeItALot("bls12_381_G1_hashToGroup-memory-arguments");
    makeItALot("bls12_381_G1_neg-cpu-arguments");
    makeItALot("bls12_381_G1_neg-memory-arguments");
    makeItALot("bls12_381_G1_scalarMul-cpu-arguments-intercept");
    makeItALot("bls12_381_G1_scalarMul-cpu-arguments-slope");
    makeItALot("bls12_381_G1_scalarMul-memory-arguments");
    makeItALot("bls12_381_G1_uncompress-cpu-arguments");
    makeItALot("bls12_381_G1_uncompress-memory-arguments");
    makeItALot("bls12_381_G2_add-cpu-arguments");
    makeItALot("bls12_381_G2_add-memory-arguments");
    makeItALot("bls12_381_G2_compress-cpu-arguments");
    makeItALot("bls12_381_G2_compress-memory-arguments");
    makeItALot("bls12_381_G2_equal-cpu-arguments");
    makeItALot("bls12_381_G2_equal-memory-arguments");
    makeItALot("bls12_381_G2_hashToGroup-cpu-arguments-intercept");
    makeItALot("bls12_381_G2_hashToGroup-cpu-arguments-slope");
    makeItALot("bls12_381_G2_hashToGroup-memory-arguments");
    makeItALot("bls12_381_G2_neg-cpu-arguments");
    makeItALot("bls12_381_G2_neg-memory-arguments");
    makeItALot("bls12_381_G2_scalarMul-cpu-arguments-intercept");
    makeItALot("bls12_381_G2_scalarMul-cpu-arguments-slope");
    makeItALot("bls12_381_G2_scalarMul-memory-arguments");
    makeItALot("bls12_381_G2_uncompress-cpu-arguments");
    makeItALot("bls12_381_G2_uncompress-memory-arguments");
    makeItALot("bls12_381_finalVerify-cpu-arguments");
    makeItALot("bls12_381_finalVerify-memory-arguments");
    makeItALot("bls12_381_millerLoop-cpu-arguments");
    makeItALot("bls12_381_millerLoop-memory-arguments");
    makeItALot("bls12_381_mulMlResult-cpu-arguments");
    makeItALot("bls12_381_mulMlResult-memory-arguments");
    makeItALot("keccak_256-cpu-arguments-intercept");
    makeItALot("keccak_256-cpu-arguments-slope");
    makeItALot("keccak_256-memory-arguments");
    makeItALot("blake2b_224-cpu-arguments-intercept");
    makeItALot("blake2b_224-cpu-arguments-slope");
    makeItALot("blake2b_224-memory-arguments");
    makeItALot("integerToByteString-cpu-arguments-c0");
    makeItALot("integerToByteString-cpu-arguments-c1");
    makeItALot("integerToByteString-cpu-arguments-c2");
    makeItALot("integerToByteString-memory-arguments-intercept");
    makeItALot("integerToByteString-memory-arguments-slope");
    makeItALot("byteStringToInteger-cpu-arguments-c0");
    makeItALot("byteStringToInteger-cpu-arguments-c1");
    makeItALot("byteStringToInteger-cpu-arguments-c2");
    makeItALot("byteStringToInteger-memory-arguments-intercept");
    makeItALot("byteStringToInteger-memory-arguments-slope");

    return costs as any;
}

export function costModelV1ToFakeV3( costmdlsV1: AnyV1CostModel ): CostModelPlutusV3
{
    const costs = toCostModelV1( costmdlsV1 );
    return costModelV2ToFakeV3( costModelV1ToFakeV2( costs ) );
}

export function isCostModelsV1( something: any ): something is AnyV1CostModel
{
    if(!( typeof something === "object" && something !== null )) return false;

    return (
        Array.isArray( something ) ?

        // CostModelPlutusV1Array
        something.length >= 166 && something.every( canBeInteger ) :

        // CostModelPlutusV1
        costModelV1Keys.every( k => {
            const val = something[k];
            return val !== undefined && canBeInteger( val ) 
        })
    )
}

export function isCostModelsV2( something: any ): something is AnyV2CostModel
{
    if(!( typeof something === "object" && something !== null )) return false;

    return (
        Array.isArray( something ) ?

        // CostModelPlutusV2Array
        something.length >= 175 && something.every( canBeInteger ) :

        // CostModelPlutusV2
        costModelV2Keys.every( k => {
            const val = something[k];
            return val !== undefined && canBeInteger( val ) 
        })
    )
}

export function isCostModelsV3( something: any ): something is AnyV3CostModel
{
    if(!( typeof something === "object" && something !== null )) return false;

    return (
        Array.isArray( something ) ?

        // CostModelPlutusV3Array
        something.length >= 251 && something.every( canBeInteger ) :

        // CostModelPlutusV3
        costModelV3Keys.every( k => {
            const val = something[k];
            return val !== undefined && canBeInteger( val ) 
        })
    );
}

export function isCostModels( something: any ): something is CostModels
{
    if(!isObject( something )) return false;

    let hasV1, hasV2, hasV3;
    hasV1 = hasV2 = hasV3 = false;

    if( hasOwn<object,"PlutusScriptV1">( something, "PlutusScriptV1" ) )
    {
        hasV1 = true;
        if( !isCostModelsV1( something.PlutusScriptV1 ) ) return false;
    }
    
    if( hasOwn<object,"PlutusScriptV2">( something, "PlutusScriptV2" ) )
    {
        hasV2 = true;
        if( !isCostModelsV2( something.PlutusScriptV2 ) ) return false;
    }

    if( hasOwn<object,"PlutusScriptV3">( something, "PlutusScriptV3" ) )
    {
        hasV3 = true;
        if( !isCostModelsV3( something.PlutusScriptV3 ) ) return false;
    }

    if(!( hasV1 || hasV2 || hasV3 )) return false

    return true
};

export function costModelsToCborObj( costmdls: CostModels ): CborMap
{
    const {
        PlutusScriptV1,
        PlutusScriptV2,
        PlutusScriptV3,
    } = costmdls;

    return new CborMap([
        PlutusScriptV1 === undefined ? undefined :
        {
            k: new CborUInt( 0 ),
            v: new CborArray( toCostModelArrV1( PlutusScriptV1 ).map( cborNumber ) )
        },
        PlutusScriptV2 === undefined ? undefined :
        {
            k: new CborUInt( 1 ),
            v: new CborArray( toCostModelArrV2( PlutusScriptV2 ).map( cborNumber ) )
        },
        PlutusScriptV3 === undefined ? undefined :
        {
            k: new CborUInt( 2 ),
            v: new CborArray( toCostModelArrV3( PlutusScriptV3 ).map( cborNumber ) )
        }
    ].filter( elem => elem !== undefined ) as CborMapEntry[])
}

export function costModelsFromCbor( cStr: CanBeCborString ): CostModels
{
    return costModelsFromCborObj( Cbor.parse( forceCborString( cStr ) ) );
}
export function costModelsFromCborObj( cObj: CborObj | undefined ): CostModels
{
    if( cObj === undefined || !( cObj instanceof CborMap )) return {};

    const costs = {};

    cObj.map.forEach( ({ k, v }) => {

        if(!(
            k instanceof CborUInt && 
            v instanceof CborArray && 
            v.array.every( n => n instanceof CborUInt )
        )) return; // ingore entry

        const plutusIdx = Number( k.num );
        if( plutusIdx === 0 )
        {
            defineReadOnlyProperty(
                costs, "PlutusScriptV1", toCostModelV1( (v.array.map( n => (n as CborUInt).num ) ) as any )
            );
        }
        else if( plutusIdx === 1 )
        {
            defineReadOnlyProperty(
                costs, "PlutusScriptV2", toCostModelV2( (v.array.map( n => (n as CborUInt).num ) ) as any )
            );
        }
        else if( plutusIdx === 2 )
        {
            defineReadOnlyProperty(
                costs, "PlutusScriptV3", toCostModelV3( (v.array.map( n => (n as CborUInt).num ) ) as any )
            );
        }

    });

    return costs;
}

export interface CostModelsToLanguageViewCborOpts {
    mustHaveV1?: boolean,
    mustHaveV2?: boolean,
    mustHaveV3?: boolean,
}

export function costModelsToLanguageViewCbor( costmdls: CostModels, opts: CostModelsToLanguageViewCborOpts ): CborString
{
    const {
        PlutusScriptV1,
        PlutusScriptV2,
        PlutusScriptV3,
    } = costmdls;

    if( opts.mustHaveV1 === true && PlutusScriptV1 === undefined )
    throw new Error("missing required PlutusScriptV1");

    if( opts.mustHaveV2 === true && PlutusScriptV2 === undefined )
    throw new Error("missing required PlutusScriptV2");

    if( opts.mustHaveV3 === true && PlutusScriptV3 === undefined )
    throw new Error("missing required PlutusScriptV3");

    return Cbor.encode(
        new CborMap([
            opts.mustHaveV1 ?
            {
                // k: new CborUInt(0); but as bytes (...)
                // 
                // The language ID tag is also encoded twice. first as a uint then as
                // a bytestring. (our apologies)
                // Concretely, this means that the language version for V1 is encoded as
                // 4100 in hex.
                k: new CborBytes(Uint8Array.from([0])),

                /// plutus v1 language view is messed up, not my fault
                // 
                // the value of costmdls map at key 0 (in other words, the script_integrity_data)
                // is encoded as an indefinite length list and the result is encoded as a bytestring.
                // (our apologies)
                v: new CborBytes(
                    Cbor.encode(
                        new CborArray(
                            toCostModelArrV1( PlutusScriptV1 as any )
                            .map( cborNumber ),
                            { indefinite: true }
                        )
                    ).toBuffer()
                )
            } : undefined,
            opts.mustHaveV2 ? 
            {
                k: new CborUInt(1),
                v: new CborArray( toCostModelArrV2( PlutusScriptV2 as any ).map( cborNumber ) )
            } : undefined,
            opts.mustHaveV3 ? 
            {
                k: new CborUInt(2),
                v: new CborArray( toCostModelArrV3( PlutusScriptV3 as any ).map( cborNumber ) )
            } : undefined
        ].filter( elem => elem !== undefined ) as CborMapEntry[])
    )
}

export function costModelsToJson( costmdls: CostModels )
{
    const _pv1 = costmdls.PlutusScriptV1 === undefined ? undefined : toCostModelV1( costmdls.PlutusScriptV1 );
    const _pv2 = costmdls.PlutusScriptV2 === undefined ? undefined : toCostModelV2( costmdls.PlutusScriptV2 );
    const _pv3 = costmdls.PlutusScriptV3 === undefined ? undefined : toCostModelV3( costmdls.PlutusScriptV3 );

    const pv1 = {};
    if( _pv1 !== undefined )
    {
        const ks = Object.keys( _pv1 ) as (keyof CostModelPlutusV1)[];
        const n = ks.length;
        for(let i = 0; i < n; i++)
        {
            defineReadOnlyProperty(
                pv1, ks[i], BigInt( _pv1[ks[i]] ).toString()
            )
        }
    }

    const pv2 = {};
    if( _pv2 !== undefined )
    {
        const ks = Object.keys( _pv2 ) as (keyof CostModelPlutusV2)[];
        const n = ks.length;
        for(let i = 0; i < n; i++)
        {
            defineReadOnlyProperty(
                pv2, ks[i], BigInt( _pv2[ks[i]] ).toString()
            )
        }
    }

    const pv3 = {};
    if( _pv3 !== undefined )
    {
        const ks = Object.keys( _pv3 ) as (keyof CostModelPlutusV3)[];
        const n = ks.length;
        for(let i = 0; i < n; i++)
        {
            const k = ks[i];
            defineReadOnlyProperty(
                pv3, k, BigInt( _pv3[k] ).toString()
            )
        }
    }

    return {
        PlutusScriptV1: pv1,
        PlutusScriptV2: pv2,
        PlutusScriptV3: pv3,
    };
}

export function toCostModelV1( v1: AnyV1CostModel ): CostModelPlutusV1
{
    if( isArrayish( v1 ) ) v1 = forceArrayish( v1 ) as any;
    if( !Array.isArray( v1 ) ) return v1;

    const result = { ...defaultV1Costs};

    if( v1.length < 166 )
    throw new Error(
        "impossible to convert cost model v1 array to object; not enough arguments; arguments found in total: " + v1.length.toString()
    );
    
    for( let i = 0; i < costModelV1Keys.length; i++ )
    {
        defineReadOnlyProperty(
            result,
            costModelV1Keys[i],
            BigInt( v1[i] )
        );
    }

    return result as any;
}

export function toCostModelV2( v2: AnyV2CostModel ): CostModelPlutusV2
{
    if( isArrayish( v2 ) ) v2 = forceArrayish( v2 ) as any;
    if( !Array.isArray( v2 ) ) return v2;

    const result = { ...defaultV2Costs };

    if( v2.length < 175 )
    throw new Error(
        "impossible to convert cost model v2 array to object; not enough arguments; arguments found in total: " + v2.length.toString()
    );
    
    for( let i = 0; i < costModelV2Keys.length; i++ )
    {
        defineNormalProperty(
            result,
            costModelV2Keys[i],
            BigInt( v2[i] )
        );
    }

    return result as any;
}

export function toCostModelV3( v3: AnyV3CostModel ): CostModelPlutusV3
{
    if( isArrayish( v3 ) ) v3 = forceArrayish( v3 ) as any;
    if( !Array.isArray( v3 ) ) return v3;

    const result = { ...defaultV3Costs};

    if( v3.length < 251 )
    throw new Error(
        "impossible to convert cost model v3 array to object; not enough arguments; arguments found in total: "
        + v3.length.toString()
    );
    
    for( let i = 0; i < costModelV3Keys.length; i++ )
    {
        defineNormalProperty(
            result,
            costModelV3Keys[i],
            BigInt( v3[i] )
        );
    }

    return result as any;
}

export function toCostModelArrV1( v1: AnyV1CostModel ): CostModelPlutusV1Array
{
    if( Array.isArray( v1 ) ) return v1;

    // order matters; cant do `Object.keys`
    return Object.freeze([
        v1["addInteger-cpu-arguments-intercept"],
        v1["addInteger-cpu-arguments-slope"],
        v1["addInteger-memory-arguments-intercept"],
        v1["addInteger-memory-arguments-slope"],
        v1["appendByteString-cpu-arguments-intercept"],
        v1["appendByteString-cpu-arguments-slope"],
        v1["appendByteString-memory-arguments-intercept"],
        v1["appendByteString-memory-arguments-slope"],
        v1["appendString-cpu-arguments-intercept"],
        v1["appendString-cpu-arguments-slope"],
        v1["appendString-memory-arguments-intercept"],
        v1["appendString-memory-arguments-slope"],
        v1["bData-cpu-arguments"],
        v1["bData-memory-arguments"],
        v1["blake2b_256-cpu-arguments-intercept"],
        v1["blake2b_256-cpu-arguments-slope"],
        v1["blake2b_256-memory-arguments"],
        v1["cekApplyCost-exBudgetCPU"],
        v1["cekApplyCost-exBudgetMemory"],
        v1["cekBuiltinCost-exBudgetCPU"],
        v1["cekBuiltinCost-exBudgetMemory"],
        v1["cekConstCost-exBudgetCPU"],
        v1["cekConstCost-exBudgetMemory"],
        v1["cekDelayCost-exBudgetCPU"],
        v1["cekDelayCost-exBudgetMemory"],
        v1["cekForceCost-exBudgetCPU"],
        v1["cekForceCost-exBudgetMemory"],
        v1["cekLamCost-exBudgetCPU"],
        v1["cekLamCost-exBudgetMemory"],
        v1["cekStartupCost-exBudgetCPU"],
        v1["cekStartupCost-exBudgetMemory"],
        v1["cekVarCost-exBudgetCPU"],
        v1["cekVarCost-exBudgetMemory"],
        v1["chooseData-cpu-arguments"],
        v1["chooseData-memory-arguments"],
        v1["chooseList-cpu-arguments"],
        v1["chooseList-memory-arguments"],
        v1["chooseUnit-cpu-arguments"],
        v1["chooseUnit-memory-arguments"],
        v1["consByteString-cpu-arguments-intercept"],
        v1["consByteString-cpu-arguments-slope"],
        v1["consByteString-memory-arguments-intercept"],
        v1["consByteString-memory-arguments-slope"],
        v1["constrData-cpu-arguments"],
        v1["constrData-memory-arguments"],
        v1["decodeUtf8-cpu-arguments-intercept"],
        v1["decodeUtf8-cpu-arguments-slope"],
        v1["decodeUtf8-memory-arguments-intercept"],
        v1["decodeUtf8-memory-arguments-slope"],
        v1["divideInteger-cpu-arguments-constant"],
        v1["divideInteger-cpu-arguments-model-arguments-intercept"],
        v1["divideInteger-cpu-arguments-model-arguments-slope"],
        v1["divideInteger-memory-arguments-intercept"],
        v1["divideInteger-memory-arguments-minimum"],
        v1["divideInteger-memory-arguments-slope"],
        v1["encodeUtf8-cpu-arguments-intercept"],
        v1["encodeUtf8-cpu-arguments-slope"],
        v1["encodeUtf8-memory-arguments-intercept"],
        v1["encodeUtf8-memory-arguments-slope"],
        v1["equalsByteString-cpu-arguments-constant"],
        v1["equalsByteString-cpu-arguments-intercept"],
        v1["equalsByteString-cpu-arguments-slope"],
        v1["equalsByteString-memory-arguments"],
        v1["equalsData-cpu-arguments-intercept"],
        v1["equalsData-cpu-arguments-slope"],
        v1["equalsData-memory-arguments"],
        v1["equalsInteger-cpu-arguments-intercept"],
        v1["equalsInteger-cpu-arguments-slope"],
        v1["equalsInteger-memory-arguments"],
        v1["equalsString-cpu-arguments-constant"],
        v1["equalsString-cpu-arguments-intercept"],
        v1["equalsString-cpu-arguments-slope"],
        v1["equalsString-memory-arguments"],
        v1["fstPair-cpu-arguments"],
        v1["fstPair-memory-arguments"],
        v1["headList-cpu-arguments"],
        v1["headList-memory-arguments"],
        v1["iData-cpu-arguments"],
        v1["iData-memory-arguments"],
        v1["ifThenElse-cpu-arguments"],
        v1["ifThenElse-memory-arguments"],
        v1["indexByteString-cpu-arguments"],
        v1["indexByteString-memory-arguments"],
        v1["lengthOfByteString-cpu-arguments"],
        v1["lengthOfByteString-memory-arguments"],
        v1["lessThanByteString-cpu-arguments-intercept"],
        v1["lessThanByteString-cpu-arguments-slope"],
        v1["lessThanByteString-memory-arguments"],
        v1["lessThanEqualsByteString-cpu-arguments-intercept"],
        v1["lessThanEqualsByteString-cpu-arguments-slope"],
        v1["lessThanEqualsByteString-memory-arguments"],
        v1["lessThanEqualsInteger-cpu-arguments-intercept"],
        v1["lessThanEqualsInteger-cpu-arguments-slope"],
        v1["lessThanEqualsInteger-memory-arguments"],
        v1["lessThanInteger-cpu-arguments-intercept"],
        v1["lessThanInteger-cpu-arguments-slope"],
        v1["lessThanInteger-memory-arguments"],
        v1["listData-cpu-arguments"],
        v1["listData-memory-arguments"],
        v1["mapData-cpu-arguments"],
        v1["mapData-memory-arguments"],
        v1["mkCons-cpu-arguments"],
        v1["mkCons-memory-arguments"],
        v1["mkNilData-cpu-arguments"],
        v1["mkNilData-memory-arguments"],
        v1["mkNilPairData-cpu-arguments"],
        v1["mkNilPairData-memory-arguments"],
        v1["mkPairData-cpu-arguments"],
        v1["mkPairData-memory-arguments"],
        v1["modInteger-cpu-arguments-constant"],
        v1["modInteger-cpu-arguments-model-arguments-intercept"],
        v1["modInteger-cpu-arguments-model-arguments-slope"],
        v1["modInteger-memory-arguments-intercept"],
        v1["modInteger-memory-arguments-minimum"],
        v1["modInteger-memory-arguments-slope"],
        v1["multiplyInteger-cpu-arguments-intercept"],
        v1["multiplyInteger-cpu-arguments-slope"],
        v1["multiplyInteger-memory-arguments-intercept"],
        v1["multiplyInteger-memory-arguments-slope"],
        v1["nullList-cpu-arguments"],
        v1["nullList-memory-arguments"],
        v1["quotientInteger-cpu-arguments-constant"],
        v1["quotientInteger-cpu-arguments-model-arguments-intercept"],
        v1["quotientInteger-cpu-arguments-model-arguments-slope"],
        v1["quotientInteger-memory-arguments-intercept"],
        v1["quotientInteger-memory-arguments-minimum"],
        v1["quotientInteger-memory-arguments-slope"],
        v1["remainderInteger-cpu-arguments-constant"],
        v1["remainderInteger-cpu-arguments-model-arguments-intercept"],
        v1["remainderInteger-cpu-arguments-model-arguments-slope"],
        v1["remainderInteger-memory-arguments-intercept"],
        v1["remainderInteger-memory-arguments-minimum"],
        v1["remainderInteger-memory-arguments-slope"],
        v1["sha2_256-cpu-arguments-intercept"],
        v1["sha2_256-cpu-arguments-slope"],
        v1["sha2_256-memory-arguments"],
        v1["sha3_256-cpu-arguments-intercept"],
        v1["sha3_256-cpu-arguments-slope"],
        v1["sha3_256-memory-arguments"],
        v1["sliceByteString-cpu-arguments-intercept"],
        v1["sliceByteString-cpu-arguments-slope"],
        v1["sliceByteString-memory-arguments-intercept"],
        v1["sliceByteString-memory-arguments-slope"],
        v1["sndPair-cpu-arguments"],
        v1["sndPair-memory-arguments"],
        v1["subtractInteger-cpu-arguments-intercept"],
        v1["subtractInteger-cpu-arguments-slope"],
        v1["subtractInteger-memory-arguments-intercept"],
        v1["subtractInteger-memory-arguments-slope"],
        v1["tailList-cpu-arguments"],
        v1["tailList-memory-arguments"],
        v1["trace-cpu-arguments"],
        v1["trace-memory-arguments"],
        v1["unBData-cpu-arguments"],
        v1["unBData-memory-arguments"],
        v1["unConstrData-cpu-arguments"],
        v1["unConstrData-memory-arguments"],
        v1["unIData-cpu-arguments"],
        v1["unIData-memory-arguments"],
        v1["unListData-cpu-arguments"],
        v1["unListData-memory-arguments"],
        v1["unMapData-cpu-arguments"],
        v1["unMapData-memory-arguments"],
        v1["verifyEd25519Signature-cpu-arguments-intercept"],
        v1["verifyEd25519Signature-cpu-arguments-slope"],
        v1["verifyEd25519Signature-memory-arguments"],
    ]) as any;
}

export function toCostModelArrV2( v2: AnyV2CostModel ): CostModelPlutusV2Array
{
    if( Array.isArray( v2 ) ) return v2;

    // order matters; cant do `Object.keys`
    return Object.freeze([
        v2["addInteger-cpu-arguments-intercept"],
        v2["addInteger-cpu-arguments-slope"],
        v2["addInteger-memory-arguments-intercept"],
        v2["addInteger-memory-arguments-slope"],
        v2["appendByteString-cpu-arguments-intercept"],
        v2["appendByteString-cpu-arguments-slope"],
        v2["appendByteString-memory-arguments-intercept"],
        v2["appendByteString-memory-arguments-slope"],
        v2["appendString-cpu-arguments-intercept"],
        v2["appendString-cpu-arguments-slope"],
        v2["appendString-memory-arguments-intercept"],
        v2["appendString-memory-arguments-slope"],
        v2["bData-cpu-arguments"],
        v2["bData-memory-arguments"],
        v2["blake2b_256-cpu-arguments-intercept"],
        v2["blake2b_256-cpu-arguments-slope"],
        v2["blake2b_256-memory-arguments"],
        v2["cekApplyCost-exBudgetCPU"],
        v2["cekApplyCost-exBudgetMemory"],
        v2["cekBuiltinCost-exBudgetCPU"],
        v2["cekBuiltinCost-exBudgetMemory"],
        v2["cekConstCost-exBudgetCPU"],
        v2["cekConstCost-exBudgetMemory"],
        v2["cekDelayCost-exBudgetCPU"],
        v2["cekDelayCost-exBudgetMemory"],
        v2["cekForceCost-exBudgetCPU"],
        v2["cekForceCost-exBudgetMemory"],
        v2["cekLamCost-exBudgetCPU"],
        v2["cekLamCost-exBudgetMemory"],
        v2["cekStartupCost-exBudgetCPU"],
        v2["cekStartupCost-exBudgetMemory"],
        v2["cekVarCost-exBudgetCPU"],
        v2["cekVarCost-exBudgetMemory"],
        v2["chooseData-cpu-arguments"],
        v2["chooseData-memory-arguments"],
        v2["chooseList-cpu-arguments"],
        v2["chooseList-memory-arguments"],
        v2["chooseUnit-cpu-arguments"],
        v2["chooseUnit-memory-arguments"],
        v2["consByteString-cpu-arguments-intercept"],
        v2["consByteString-cpu-arguments-slope"],
        v2["consByteString-memory-arguments-intercept"],
        v2["consByteString-memory-arguments-slope"],
        v2["constrData-cpu-arguments"],
        v2["constrData-memory-arguments"],
        v2["decodeUtf8-cpu-arguments-intercept"],
        v2["decodeUtf8-cpu-arguments-slope"],
        v2["decodeUtf8-memory-arguments-intercept"],
        v2["decodeUtf8-memory-arguments-slope"],
        v2["divideInteger-cpu-arguments-constant"],
        v2["divideInteger-cpu-arguments-model-arguments-intercept"],
        v2["divideInteger-cpu-arguments-model-arguments-slope"],
        v2["divideInteger-memory-arguments-intercept"],
        v2["divideInteger-memory-arguments-minimum"],
        v2["divideInteger-memory-arguments-slope"],
        v2["encodeUtf8-cpu-arguments-intercept"],
        v2["encodeUtf8-cpu-arguments-slope"],
        v2["encodeUtf8-memory-arguments-intercept"],
        v2["encodeUtf8-memory-arguments-slope"],
        v2["equalsByteString-cpu-arguments-constant"],
        v2["equalsByteString-cpu-arguments-intercept"],
        v2["equalsByteString-cpu-arguments-slope"],
        v2["equalsByteString-memory-arguments"],
        v2["equalsData-cpu-arguments-intercept"],
        v2["equalsData-cpu-arguments-slope"],
        v2["equalsData-memory-arguments"],
        v2["equalsInteger-cpu-arguments-intercept"],
        v2["equalsInteger-cpu-arguments-slope"],
        v2["equalsInteger-memory-arguments"],
        v2["equalsString-cpu-arguments-constant"],
        v2["equalsString-cpu-arguments-intercept"],
        v2["equalsString-cpu-arguments-slope"],
        v2["equalsString-memory-arguments"],
        v2["fstPair-cpu-arguments"],
        v2["fstPair-memory-arguments"],
        v2["headList-cpu-arguments"],
        v2["headList-memory-arguments"],
        v2["iData-cpu-arguments"],
        v2["iData-memory-arguments"],
        v2["ifThenElse-cpu-arguments"],
        v2["ifThenElse-memory-arguments"],
        v2["indexByteString-cpu-arguments"],
        v2["indexByteString-memory-arguments"],
        v2["lengthOfByteString-cpu-arguments"],
        v2["lengthOfByteString-memory-arguments"],
        v2["lessThanByteString-cpu-arguments-intercept"],
        v2["lessThanByteString-cpu-arguments-slope"],
        v2["lessThanByteString-memory-arguments"],
        v2["lessThanEqualsByteString-cpu-arguments-intercept"],
        v2["lessThanEqualsByteString-cpu-arguments-slope"],
        v2["lessThanEqualsByteString-memory-arguments"],
        v2["lessThanEqualsInteger-cpu-arguments-intercept"],
        v2["lessThanEqualsInteger-cpu-arguments-slope"],
        v2["lessThanEqualsInteger-memory-arguments"],
        v2["lessThanInteger-cpu-arguments-intercept"],
        v2["lessThanInteger-cpu-arguments-slope"],
        v2["lessThanInteger-memory-arguments"],
        v2["listData-cpu-arguments"],
        v2["listData-memory-arguments"],
        v2["mapData-cpu-arguments"],
        v2["mapData-memory-arguments"],
        v2["mkCons-cpu-arguments"],
        v2["mkCons-memory-arguments"],
        v2["mkNilData-cpu-arguments"],
        v2["mkNilData-memory-arguments"],
        v2["mkNilPairData-cpu-arguments"],
        v2["mkNilPairData-memory-arguments"],
        v2["mkPairData-cpu-arguments"],
        v2["mkPairData-memory-arguments"],
        v2["modInteger-cpu-arguments-constant"],
        v2["modInteger-cpu-arguments-model-arguments-intercept"],
        v2["modInteger-cpu-arguments-model-arguments-slope"],
        v2["modInteger-memory-arguments-intercept"],
        v2["modInteger-memory-arguments-minimum"],
        v2["modInteger-memory-arguments-slope"],
        v2["multiplyInteger-cpu-arguments-intercept"],
        v2["multiplyInteger-cpu-arguments-slope"],
        v2["multiplyInteger-memory-arguments-intercept"],
        v2["multiplyInteger-memory-arguments-slope"],
        v2["nullList-cpu-arguments"],
        v2["nullList-memory-arguments"],
        v2["quotientInteger-cpu-arguments-constant"],
        v2["quotientInteger-cpu-arguments-model-arguments-intercept"],
        v2["quotientInteger-cpu-arguments-model-arguments-slope"],
        v2["quotientInteger-memory-arguments-intercept"],
        v2["quotientInteger-memory-arguments-minimum"],
        v2["quotientInteger-memory-arguments-slope"],
        v2["remainderInteger-cpu-arguments-constant"],
        v2["remainderInteger-cpu-arguments-model-arguments-intercept"],
        v2["remainderInteger-cpu-arguments-model-arguments-slope"],
        v2["remainderInteger-memory-arguments-intercept"],
        v2["remainderInteger-memory-arguments-minimum"],
        v2["remainderInteger-memory-arguments-slope"],
        v2["serialiseData-cpu-arguments-intercept"],
        v2["serialiseData-cpu-arguments-slope"],
        v2["serialiseData-memory-arguments-intercept"],
        v2["serialiseData-memory-arguments-slope"],
        v2["sha2_256-cpu-arguments-intercept"],
        v2["sha2_256-cpu-arguments-slope"],
        v2["sha2_256-memory-arguments"],
        v2["sha3_256-cpu-arguments-intercept"],
        v2["sha3_256-cpu-arguments-slope"],
        v2["sha3_256-memory-arguments"],
        v2["sliceByteString-cpu-arguments-intercept"],
        v2["sliceByteString-cpu-arguments-slope"],
        v2["sliceByteString-memory-arguments-intercept"],
        v2["sliceByteString-memory-arguments-slope"],
        v2["sndPair-cpu-arguments"],
        v2["sndPair-memory-arguments"],
        v2["subtractInteger-cpu-arguments-intercept"],
        v2["subtractInteger-cpu-arguments-slope"],
        v2["subtractInteger-memory-arguments-intercept"],
        v2["subtractInteger-memory-arguments-slope"],
        v2["tailList-cpu-arguments"],
        v2["tailList-memory-arguments"],
        v2["trace-cpu-arguments"],
        v2["trace-memory-arguments"],
        v2["unBData-cpu-arguments"],
        v2["unBData-memory-arguments"],
        v2["unConstrData-cpu-arguments"],
        v2["unConstrData-memory-arguments"],
        v2["unIData-cpu-arguments"],
        v2["unIData-memory-arguments"],
        v2["unListData-cpu-arguments"],
        v2["unListData-memory-arguments"],
        v2["unMapData-cpu-arguments"],
        v2["unMapData-memory-arguments"],
        v2["verifyEcdsaSecp256k1Signature-cpu-arguments"],
        v2["verifyEcdsaSecp256k1Signature-memory-arguments"],
        v2["verifyEd25519Signature-cpu-arguments-intercept"],
        v2["verifyEd25519Signature-cpu-arguments-slope"],
        v2["verifyEd25519Signature-memory-arguments"],
        v2["verifySchnorrSecp256k1Signature-cpu-arguments-intercept"],
        v2["verifySchnorrSecp256k1Signature-cpu-arguments-slope"],
        v2["verifySchnorrSecp256k1Signature-memory-arguments"]
    ]) as any;
}

export function toCostModelArrV3( v3: AnyV3CostModel ): CostModelPlutusV3Array
{
    if( Array.isArray( v3 ) ) return v3;

    return Object.freeze([
        v3["addInteger-cpu-arguments-intercept"],
        v3["addInteger-cpu-arguments-slope"],
        v3["addInteger-memory-arguments-intercept"],
        v3["addInteger-memory-arguments-slope"],
        v3["appendByteString-cpu-arguments-intercept"],
        v3["appendByteString-cpu-arguments-slope"],
        v3["appendByteString-memory-arguments-intercept"],
        v3["appendByteString-memory-arguments-slope"],
        v3["appendString-cpu-arguments-intercept"],
        v3["appendString-cpu-arguments-slope"],
        v3["appendString-memory-arguments-intercept"],
        v3["appendString-memory-arguments-slope"],
        v3["bData-cpu-arguments"],
        v3["bData-memory-arguments"],
        v3["blake2b_256-cpu-arguments-intercept"],
        v3["blake2b_256-cpu-arguments-slope"],
        v3["blake2b_256-memory-arguments"],
        v3["cekApplyCost-exBudgetCPU"],
        v3["cekApplyCost-exBudgetMemory"],
        v3["cekBuiltinCost-exBudgetCPU"],
        v3["cekBuiltinCost-exBudgetMemory"],
        v3["cekConstCost-exBudgetCPU"],
        v3["cekConstCost-exBudgetMemory"],
        v3["cekDelayCost-exBudgetCPU"],
        v3["cekDelayCost-exBudgetMemory"],
        v3["cekForceCost-exBudgetCPU"],
        v3["cekForceCost-exBudgetMemory"],
        v3["cekLamCost-exBudgetCPU"],
        v3["cekLamCost-exBudgetMemory"],
        v3["cekStartupCost-exBudgetCPU"],
        v3["cekStartupCost-exBudgetMemory"],
        v3["cekVarCost-exBudgetCPU"],
        v3["cekVarCost-exBudgetMemory"],
        v3["chooseData-cpu-arguments"],
        v3["chooseData-memory-arguments"],
        v3["chooseList-cpu-arguments"],
        v3["chooseList-memory-arguments"],
        v3["chooseUnit-cpu-arguments"],
        v3["chooseUnit-memory-arguments"],
        v3["consByteString-cpu-arguments-intercept"],
        v3["consByteString-cpu-arguments-slope"],
        v3["consByteString-memory-arguments-intercept"],
        v3["consByteString-memory-arguments-slope"],
        v3["constrData-cpu-arguments"],
        v3["constrData-memory-arguments"],
        v3["decodeUtf8-cpu-arguments-intercept"],
        v3["decodeUtf8-cpu-arguments-slope"],
        v3["decodeUtf8-memory-arguments-intercept"],
        v3["decodeUtf8-memory-arguments-slope"],
        v3["divideInteger-cpu-arguments-constant"],
        v3["divideInteger-cpu-arguments-model-arguments-c00"],
        v3["divideInteger-cpu-arguments-model-arguments-c01"],
        v3["divideInteger-cpu-arguments-model-arguments-c02"],
        v3["divideInteger-cpu-arguments-model-arguments-c10"],
        v3["divideInteger-cpu-arguments-model-arguments-c11"],
        v3["divideInteger-cpu-arguments-model-arguments-c20"],
        v3["divideInteger-cpu-arguments-model-arguments-minimum"],
        v3["divideInteger-memory-arguments-intercept"],
        v3["divideInteger-memory-arguments-minimum"],
        v3["divideInteger-memory-arguments-slope"],
        v3["encodeUtf8-cpu-arguments-intercept"],
        v3["encodeUtf8-cpu-arguments-slope"],
        v3["encodeUtf8-memory-arguments-intercept"],
        v3["encodeUtf8-memory-arguments-slope"],
        v3["equalsByteString-cpu-arguments-constant"],
        v3["equalsByteString-cpu-arguments-intercept"],
        v3["equalsByteString-cpu-arguments-slope"],
        v3["equalsByteString-memory-arguments"],
        v3["equalsData-cpu-arguments-intercept"],
        v3["equalsData-cpu-arguments-slope"],
        v3["equalsData-memory-arguments"],
        v3["equalsInteger-cpu-arguments-intercept"],
        v3["equalsInteger-cpu-arguments-slope"],
        v3["equalsInteger-memory-arguments"],
        v3["equalsString-cpu-arguments-constant"],
        v3["equalsString-cpu-arguments-intercept"],
        v3["equalsString-cpu-arguments-slope"],
        v3["equalsString-memory-arguments"],
        v3["fstPair-cpu-arguments"],
        v3["fstPair-memory-arguments"],
        v3["headList-cpu-arguments"],
        v3["headList-memory-arguments"],
        v3["iData-cpu-arguments"],
        v3["iData-memory-arguments"],
        v3["ifThenElse-cpu-arguments"],
        v3["ifThenElse-memory-arguments"],
        v3["indexByteString-cpu-arguments"],
        v3["indexByteString-memory-arguments"],
        v3["lengthOfByteString-cpu-arguments"],
        v3["lengthOfByteString-memory-arguments"],
        v3["lessThanByteString-cpu-arguments-intercept"],
        v3["lessThanByteString-cpu-arguments-slope"],
        v3["lessThanByteString-memory-arguments"],
        v3["lessThanEqualsByteString-cpu-arguments-intercept"],
        v3["lessThanEqualsByteString-cpu-arguments-slope"],
        v3["lessThanEqualsByteString-memory-arguments"],
        v3["lessThanEqualsInteger-cpu-arguments-intercept"],
        v3["lessThanEqualsInteger-cpu-arguments-slope"],
        v3["lessThanEqualsInteger-memory-arguments"],
        v3["lessThanInteger-cpu-arguments-intercept"],
        v3["lessThanInteger-cpu-arguments-slope"],
        v3["lessThanInteger-memory-arguments"],
        v3["listData-cpu-arguments"],
        v3["listData-memory-arguments"],
        v3["mapData-cpu-arguments"],
        v3["mapData-memory-arguments"],
        v3["mkCons-cpu-arguments"],
        v3["mkCons-memory-arguments"],
        v3["mkNilData-cpu-arguments"],
        v3["mkNilData-memory-arguments"],
        v3["mkNilPairData-cpu-arguments"],
        v3["mkNilPairData-memory-arguments"],
        v3["mkPairData-cpu-arguments"],
        v3["mkPairData-memory-arguments"],
        v3["modInteger-cpu-arguments-constant"],
        v3["modInteger-cpu-arguments-model-arguments-c00"],
        v3["modInteger-cpu-arguments-model-arguments-c01"],
        v3["modInteger-cpu-arguments-model-arguments-c02"],
        v3["modInteger-cpu-arguments-model-arguments-c10"],
        v3["modInteger-cpu-arguments-model-arguments-c11"],
        v3["modInteger-cpu-arguments-model-arguments-c20"],
        v3["modInteger-cpu-arguments-model-arguments-minimum"],
        v3["modInteger-memory-arguments-intercept"],
        v3["modInteger-memory-arguments-slope"],
        v3["multiplyInteger-cpu-arguments-intercept"],
        v3["multiplyInteger-cpu-arguments-slope"],
        v3["multiplyInteger-memory-arguments-intercept"],
        v3["multiplyInteger-memory-arguments-slope"],
        v3["nullList-cpu-arguments"],
        v3["nullList-memory-arguments"],
        v3["quotientInteger-cpu-arguments-constant"],
        v3["quotientInteger-cpu-arguments-model-arguments-c00"],
        v3["quotientInteger-cpu-arguments-model-arguments-c01"],
        v3["quotientInteger-cpu-arguments-model-arguments-c02"],
        v3["quotientInteger-cpu-arguments-model-arguments-c10"],
        v3["quotientInteger-cpu-arguments-model-arguments-c11"],
        v3["quotientInteger-cpu-arguments-model-arguments-c20"],
        v3["quotientInteger-cpu-arguments-model-arguments-minimum"],
        v3["quotientInteger-memory-arguments-intercept"],
        v3["quotientInteger-memory-arguments-minimum"],
        v3["quotientInteger-memory-arguments-slope"],
        v3["remainderInteger-cpu-arguments-constant"],
        v3["remainderInteger-cpu-arguments-model-arguments-c00"],
        v3["remainderInteger-cpu-arguments-model-arguments-c01"],
        v3["remainderInteger-cpu-arguments-model-arguments-c02"],
        v3["remainderInteger-cpu-arguments-model-arguments-c10"],
        v3["remainderInteger-cpu-arguments-model-arguments-c11"],
        v3["remainderInteger-cpu-arguments-model-arguments-c20"],
        v3["remainderInteger-cpu-arguments-model-arguments-minimum"],
        v3["remainderInteger-memory-arguments-intercept"],
        v3["remainderInteger-memory-arguments-slope"],
        v3["serialiseData-cpu-arguments-intercept"],
        v3["serialiseData-cpu-arguments-slope"],
        v3["serialiseData-memory-arguments-intercept"],
        v3["serialiseData-memory-arguments-slope"],
        v3["sha2_256-cpu-arguments-intercept"],
        v3["sha2_256-cpu-arguments-slope"],
        v3["sha2_256-memory-arguments"],
        v3["sha3_256-cpu-arguments-intercept"],
        v3["sha3_256-cpu-arguments-slope"],
        v3["sha3_256-memory-arguments"],
        v3["sliceByteString-cpu-arguments-intercept"],
        v3["sliceByteString-cpu-arguments-slope"],
        v3["sliceByteString-memory-arguments-intercept"],
        v3["sliceByteString-memory-arguments-slope"],
        v3["sndPair-cpu-arguments"],
        v3["sndPair-memory-arguments"],
        v3["subtractInteger-cpu-arguments-intercept"],
        v3["subtractInteger-cpu-arguments-slope"],
        v3["subtractInteger-memory-arguments-intercept"],
        v3["subtractInteger-memory-arguments-slope"],
        v3["tailList-cpu-arguments"],
        v3["tailList-memory-arguments"],
        v3["trace-cpu-arguments"],
        v3["trace-memory-arguments"],
        v3["unBData-cpu-arguments"],
        v3["unBData-memory-arguments"],
        v3["unConstrData-cpu-arguments"],
        v3["unConstrData-memory-arguments"],
        v3["unIData-cpu-arguments"],
        v3["unIData-memory-arguments"],
        v3["unListData-cpu-arguments"],
        v3["unListData-memory-arguments"],
        v3["unMapData-cpu-arguments"],
        v3["unMapData-memory-arguments"],
        v3["verifyEcdsaSecp256k1Signature-cpu-arguments"],
        v3["verifyEcdsaSecp256k1Signature-memory-arguments"],
        v3["verifyEd25519Signature-cpu-arguments-intercept"],
        v3["verifyEd25519Signature-cpu-arguments-slope"],
        v3["verifyEd25519Signature-memory-arguments"],
        v3["verifySchnorrSecp256k1Signature-cpu-arguments-intercept"],
        v3["verifySchnorrSecp256k1Signature-cpu-arguments-slope"],
        v3["verifySchnorrSecp256k1Signature-memory-arguments"],
        v3["cekConstrCost-exBudgetCPU"],
        v3["cekConstrCost-exBudgetMemory"],
        v3["cekCaseCost-exBudgetCPU"],
        v3["cekCaseCost-exBudgetMemory"],
        v3["bls12_381_G1_add-cpu-arguments"],
        v3["bls12_381_G1_add-memory-arguments"],
        v3["bls12_381_G1_compress-cpu-arguments"],
        v3["bls12_381_G1_compress-memory-arguments"],
        v3["bls12_381_G1_equal-cpu-arguments"],
        v3["bls12_381_G1_equal-memory-arguments"],
        v3["bls12_381_G1_hashToGroup-cpu-arguments-intercept"],
        v3["bls12_381_G1_hashToGroup-cpu-arguments-slope"],
        v3["bls12_381_G1_hashToGroup-memory-arguments"],
        v3["bls12_381_G1_neg-cpu-arguments"],
        v3["bls12_381_G1_neg-memory-arguments"],
        v3["bls12_381_G1_scalarMul-cpu-arguments-intercept"],
        v3["bls12_381_G1_scalarMul-cpu-arguments-slope"],
        v3["bls12_381_G1_scalarMul-memory-arguments"],
        v3["bls12_381_G1_uncompress-cpu-arguments"],
        v3["bls12_381_G1_uncompress-memory-arguments"],
        v3["bls12_381_G2_add-cpu-arguments"],
        v3["bls12_381_G2_add-memory-arguments"],
        v3["bls12_381_G2_compress-cpu-arguments"],
        v3["bls12_381_G2_compress-memory-arguments"],
        v3["bls12_381_G2_equal-cpu-arguments"],
        v3["bls12_381_G2_equal-memory-arguments"],
        v3["bls12_381_G2_hashToGroup-cpu-arguments-intercept"],
        v3["bls12_381_G2_hashToGroup-cpu-arguments-slope"],
        v3["bls12_381_G2_hashToGroup-memory-arguments"],
        v3["bls12_381_G2_neg-cpu-arguments"],
        v3["bls12_381_G2_neg-memory-arguments"],
        v3["bls12_381_G2_scalarMul-cpu-arguments-intercept"],
        v3["bls12_381_G2_scalarMul-cpu-arguments-slope"],
        v3["bls12_381_G2_scalarMul-memory-arguments"],
        v3["bls12_381_G2_uncompress-cpu-arguments"],
        v3["bls12_381_G2_uncompress-memory-arguments"],
        v3["bls12_381_finalVerify-cpu-arguments"],
        v3["bls12_381_finalVerify-memory-arguments"],
        v3["bls12_381_millerLoop-cpu-arguments"],
        v3["bls12_381_millerLoop-memory-arguments"],
        v3["bls12_381_mulMlResult-cpu-arguments"],
        v3["bls12_381_mulMlResult-memory-arguments"],
        v3["keccak_256-cpu-arguments-intercept"],
        v3["keccak_256-cpu-arguments-slope"],
        v3["keccak_256-memory-arguments"],
        v3["blake2b_224-cpu-arguments-intercept"],
        v3["blake2b_224-cpu-arguments-slope"],
        v3["blake2b_224-memory-arguments"],
        v3["integerToByteString-cpu-arguments-c0"],
        v3["integerToByteString-cpu-arguments-c1"],
        v3["integerToByteString-cpu-arguments-c2"],
        v3["integerToByteString-memory-arguments-intercept"],
        v3["integerToByteString-memory-arguments-slope"],
        v3["byteStringToInteger-cpu-arguments-c0"],
        v3["byteStringToInteger-cpu-arguments-c1"],
        v3["byteStringToInteger-cpu-arguments-c2"],
        v3["byteStringToInteger-memory-arguments-intercept"],
        v3["byteStringToInteger-memory-arguments-slope"]
    ]) as any;
}

export interface CostModelPlutusV1 {
    "addInteger-cpu-arguments-intercept": CanBeUInteger,
    "addInteger-cpu-arguments-slope": CanBeUInteger,
    "addInteger-memory-arguments-intercept": CanBeUInteger,
    "addInteger-memory-arguments-slope": CanBeUInteger,
    "appendByteString-cpu-arguments-intercept": CanBeUInteger,
    "appendByteString-cpu-arguments-slope": CanBeUInteger,
    "appendByteString-memory-arguments-intercept": CanBeUInteger,
    "appendByteString-memory-arguments-slope": CanBeUInteger,
    "appendString-cpu-arguments-intercept": CanBeUInteger,
    "appendString-cpu-arguments-slope": CanBeUInteger,
    "appendString-memory-arguments-intercept": CanBeUInteger,
    "appendString-memory-arguments-slope": CanBeUInteger,
    "bData-cpu-arguments": CanBeUInteger,
    "bData-memory-arguments": CanBeUInteger,
    "blake2b_256-cpu-arguments-intercept": CanBeUInteger,
    "blake2b_256-cpu-arguments-slope": CanBeUInteger,
    "blake2b_256-memory-arguments": CanBeUInteger,
    "cekApplyCost-exBudgetCPU": CanBeUInteger,
    "cekApplyCost-exBudgetMemory": CanBeUInteger,
    "cekBuiltinCost-exBudgetCPU": CanBeUInteger,
    "cekBuiltinCost-exBudgetMemory": CanBeUInteger,
    "cekStartupCost-exBudgetCPU": CanBeUInteger,
    "cekStartupCost-exBudgetMemory": CanBeUInteger,
    "cekVarCost-exBudgetCPU": CanBeUInteger,
    "cekVarCost-exBudgetMemory": CanBeUInteger,
    "cekConstCost-exBudgetCPU": CanBeUInteger,
    "cekConstCost-exBudgetMemory": CanBeUInteger,
    "cekDelayCost-exBudgetCPU": CanBeUInteger,
    "cekDelayCost-exBudgetMemory": CanBeUInteger,
    "cekForceCost-exBudgetCPU": CanBeUInteger,
    "cekForceCost-exBudgetMemory": CanBeUInteger,
    "cekLamCost-exBudgetCPU": CanBeUInteger,
    "cekLamCost-exBudgetMemory": CanBeUInteger,
    "chooseData-cpu-arguments": CanBeUInteger,
    "chooseData-memory-arguments": CanBeUInteger,
    "chooseList-cpu-arguments": CanBeUInteger,
    "chooseList-memory-arguments": CanBeUInteger,
    "chooseUnit-cpu-arguments": CanBeUInteger,
    "chooseUnit-memory-arguments": CanBeUInteger,
    "consByteString-cpu-arguments-intercept": CanBeUInteger,
    "consByteString-cpu-arguments-slope": CanBeUInteger,
    "consByteString-memory-arguments-intercept": CanBeUInteger,
    "consByteString-memory-arguments-slope": CanBeUInteger,
    "constrData-cpu-arguments": CanBeUInteger,
    "constrData-memory-arguments": CanBeUInteger,
    "decodeUtf8-cpu-arguments-intercept": CanBeUInteger,
    "decodeUtf8-cpu-arguments-slope": CanBeUInteger,
    "decodeUtf8-memory-arguments-intercept": CanBeUInteger,
    "decodeUtf8-memory-arguments-slope": CanBeUInteger,
    "divideInteger-cpu-arguments-constant": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-intercept": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-slope": CanBeUInteger,
    "divideInteger-memory-arguments-intercept": CanBeUInteger,
    "divideInteger-memory-arguments-minimum": CanBeUInteger,
    "divideInteger-memory-arguments-slope": CanBeUInteger,
    "encodeUtf8-cpu-arguments-intercept": CanBeUInteger,
    "encodeUtf8-cpu-arguments-slope": CanBeUInteger,
    "encodeUtf8-memory-arguments-intercept": CanBeUInteger,
    "encodeUtf8-memory-arguments-slope": CanBeUInteger,
    "equalsByteString-cpu-arguments-constant": CanBeUInteger,
    "equalsByteString-cpu-arguments-intercept": CanBeUInteger,
    "equalsByteString-cpu-arguments-slope": CanBeUInteger,
    "equalsByteString-memory-arguments": CanBeUInteger,
    "equalsData-cpu-arguments-intercept": CanBeUInteger,
    "equalsData-cpu-arguments-slope": CanBeUInteger,
    "equalsData-memory-arguments": CanBeUInteger,
    "equalsInteger-cpu-arguments-intercept": CanBeUInteger,
    "equalsInteger-cpu-arguments-slope": CanBeUInteger,
    "equalsInteger-memory-arguments": CanBeUInteger,
    "equalsString-cpu-arguments-constant": CanBeUInteger,
    "equalsString-cpu-arguments-intercept": CanBeUInteger,
    "equalsString-cpu-arguments-slope": CanBeUInteger,
    "equalsString-memory-arguments": CanBeUInteger,
    "fstPair-cpu-arguments": CanBeUInteger,
    "fstPair-memory-arguments": CanBeUInteger,
    "headList-cpu-arguments": CanBeUInteger,
    "headList-memory-arguments": CanBeUInteger,
    "iData-cpu-arguments": CanBeUInteger,
    "iData-memory-arguments": CanBeUInteger,
    "ifThenElse-cpu-arguments": CanBeUInteger,
    "ifThenElse-memory-arguments": CanBeUInteger,
    "indexByteString-cpu-arguments": CanBeUInteger,
    "indexByteString-memory-arguments": CanBeUInteger,
    "lengthOfByteString-cpu-arguments": CanBeUInteger,
    "lengthOfByteString-memory-arguments": CanBeUInteger,
    "lessThanByteString-cpu-arguments-intercept": CanBeUInteger,
    "lessThanByteString-cpu-arguments-slope": CanBeUInteger,
    "lessThanByteString-memory-arguments": CanBeUInteger,
    "lessThanEqualsByteString-cpu-arguments-intercept": CanBeUInteger,
    "lessThanEqualsByteString-cpu-arguments-slope": CanBeUInteger,
    "lessThanEqualsByteString-memory-arguments": CanBeUInteger,
    "lessThanEqualsInteger-cpu-arguments-intercept": CanBeUInteger,
    "lessThanEqualsInteger-cpu-arguments-slope": CanBeUInteger,
    "lessThanEqualsInteger-memory-arguments": CanBeUInteger,
    "lessThanInteger-cpu-arguments-intercept": CanBeUInteger,
    "lessThanInteger-cpu-arguments-slope": CanBeUInteger,
    "lessThanInteger-memory-arguments": CanBeUInteger,
    "listData-cpu-arguments": CanBeUInteger,
    "listData-memory-arguments": CanBeUInteger,
    "mapData-cpu-arguments": CanBeUInteger,
    "mapData-memory-arguments": CanBeUInteger,
    "mkCons-cpu-arguments": CanBeUInteger,
    "mkCons-memory-arguments": CanBeUInteger,
    "mkNilData-cpu-arguments": CanBeUInteger,
    "mkNilData-memory-arguments": CanBeUInteger,
    "mkNilPairData-cpu-arguments": CanBeUInteger,
    "mkNilPairData-memory-arguments": CanBeUInteger,
    "mkPairData-cpu-arguments": CanBeUInteger,
    "mkPairData-memory-arguments": CanBeUInteger,
    "modInteger-cpu-arguments-constant": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-intercept": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-slope": CanBeUInteger,
    "modInteger-memory-arguments-intercept": CanBeUInteger,
    "modInteger-memory-arguments-minimum": CanBeUInteger,
    "modInteger-memory-arguments-slope": CanBeUInteger,
    "multiplyInteger-cpu-arguments-intercept": CanBeUInteger,
    "multiplyInteger-cpu-arguments-slope": CanBeUInteger,
    "multiplyInteger-memory-arguments-intercept": CanBeUInteger,
    "multiplyInteger-memory-arguments-slope": CanBeUInteger,
    "nullList-cpu-arguments": CanBeUInteger,
    "nullList-memory-arguments": CanBeUInteger,
    "quotientInteger-cpu-arguments-constant": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-intercept": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-slope": CanBeUInteger,
    "quotientInteger-memory-arguments-intercept": CanBeUInteger,
    "quotientInteger-memory-arguments-minimum": CanBeUInteger,
    "quotientInteger-memory-arguments-slope": CanBeUInteger,
    "remainderInteger-cpu-arguments-constant": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-intercept": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-slope": CanBeUInteger,
    "remainderInteger-memory-arguments-intercept": CanBeUInteger,
    "remainderInteger-memory-arguments-minimum": CanBeUInteger,
    "remainderInteger-memory-arguments-slope": CanBeUInteger,
    "sha2_256-cpu-arguments-intercept": CanBeUInteger,
    "sha2_256-cpu-arguments-slope": CanBeUInteger,
    "sha2_256-memory-arguments": CanBeUInteger,
    "sha3_256-cpu-arguments-intercept": CanBeUInteger,
    "sha3_256-cpu-arguments-slope": CanBeUInteger,
    "sha3_256-memory-arguments": CanBeUInteger,
    "sliceByteString-cpu-arguments-intercept": CanBeUInteger,
    "sliceByteString-cpu-arguments-slope": CanBeUInteger,
    "sliceByteString-memory-arguments-intercept": CanBeUInteger,
    "sliceByteString-memory-arguments-slope": CanBeUInteger,
    "sndPair-cpu-arguments": CanBeUInteger,
    "sndPair-memory-arguments": CanBeUInteger,
    "subtractInteger-cpu-arguments-intercept": CanBeUInteger,
    "subtractInteger-cpu-arguments-slope": CanBeUInteger,
    "subtractInteger-memory-arguments-intercept": CanBeUInteger,
    "subtractInteger-memory-arguments-slope": CanBeUInteger,
    "tailList-cpu-arguments": CanBeUInteger,
    "tailList-memory-arguments": CanBeUInteger,
    "trace-cpu-arguments": CanBeUInteger,
    "trace-memory-arguments": CanBeUInteger,
    "unBData-cpu-arguments": CanBeUInteger,
    "unBData-memory-arguments": CanBeUInteger,
    "unConstrData-cpu-arguments": CanBeUInteger,
    "unConstrData-memory-arguments": CanBeUInteger,
    "unIData-cpu-arguments": CanBeUInteger,
    "unIData-memory-arguments": CanBeUInteger,
    "unListData-cpu-arguments": CanBeUInteger,
    "unListData-memory-arguments": CanBeUInteger,
    "unMapData-cpu-arguments": CanBeUInteger,
    "unMapData-memory-arguments": CanBeUInteger,
    "verifyEd25519Signature-cpu-arguments-intercept": CanBeUInteger,
    "verifyEd25519Signature-cpu-arguments-slope": CanBeUInteger,
    "verifyEd25519Signature-memory-arguments": CanBeUInteger
};

// CAN NOT extend CostModelPlutusV1 because ORDER CAHNGES
export interface CostModelPlutusV2 {
    "addInteger-cpu-arguments-intercept": CanBeUInteger,
    "addInteger-cpu-arguments-slope": CanBeUInteger,
    "addInteger-memory-arguments-intercept": CanBeUInteger,
    "addInteger-memory-arguments-slope": CanBeUInteger,
    "appendByteString-cpu-arguments-intercept": CanBeUInteger,
    "appendByteString-cpu-arguments-slope": CanBeUInteger,
    "appendByteString-memory-arguments-intercept": CanBeUInteger,
    "appendByteString-memory-arguments-slope": CanBeUInteger,
    "appendString-cpu-arguments-intercept": CanBeUInteger,
    "appendString-cpu-arguments-slope": CanBeUInteger,
    "appendString-memory-arguments-intercept": CanBeUInteger,
    "appendString-memory-arguments-slope": CanBeUInteger,
    "bData-cpu-arguments": CanBeUInteger,
    "bData-memory-arguments": CanBeUInteger,
    "blake2b_256-cpu-arguments-intercept": CanBeUInteger,
    "blake2b_256-cpu-arguments-slope": CanBeUInteger,
    "blake2b_256-memory-arguments": CanBeUInteger,
    "cekApplyCost-exBudgetCPU": CanBeUInteger,
    "cekApplyCost-exBudgetMemory": CanBeUInteger,
    "cekBuiltinCost-exBudgetCPU": CanBeUInteger,
    "cekBuiltinCost-exBudgetMemory": CanBeUInteger,
    "cekConstCost-exBudgetCPU": CanBeUInteger,
    "cekConstCost-exBudgetMemory": CanBeUInteger,
    "cekDelayCost-exBudgetCPU": CanBeUInteger,
    "cekDelayCost-exBudgetMemory": CanBeUInteger,
    "cekForceCost-exBudgetCPU": CanBeUInteger,
    "cekForceCost-exBudgetMemory": CanBeUInteger,
    "cekLamCost-exBudgetCPU": CanBeUInteger,
    "cekLamCost-exBudgetMemory": CanBeUInteger,
    "cekStartupCost-exBudgetCPU": CanBeUInteger,
    "cekStartupCost-exBudgetMemory": CanBeUInteger,
    "cekVarCost-exBudgetCPU": CanBeUInteger,
    "cekVarCost-exBudgetMemory": CanBeUInteger,
    "chooseData-cpu-arguments": CanBeUInteger,
    "chooseData-memory-arguments": CanBeUInteger,
    "chooseList-cpu-arguments": CanBeUInteger,
    "chooseList-memory-arguments": CanBeUInteger,
    "chooseUnit-cpu-arguments": CanBeUInteger,
    "chooseUnit-memory-arguments": CanBeUInteger,
    "consByteString-cpu-arguments-intercept": CanBeUInteger,
    "consByteString-cpu-arguments-slope": CanBeUInteger,
    "consByteString-memory-arguments-intercept": CanBeUInteger,
    "consByteString-memory-arguments-slope": CanBeUInteger,
    "constrData-cpu-arguments": CanBeUInteger,
    "constrData-memory-arguments": CanBeUInteger,
    "decodeUtf8-cpu-arguments-intercept": CanBeUInteger,
    "decodeUtf8-cpu-arguments-slope": CanBeUInteger,
    "decodeUtf8-memory-arguments-intercept": CanBeUInteger,
    "decodeUtf8-memory-arguments-slope": CanBeUInteger,
    "divideInteger-cpu-arguments-constant": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-intercept": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-slope": CanBeUInteger,
    "divideInteger-memory-arguments-intercept": CanBeUInteger,
    "divideInteger-memory-arguments-minimum": CanBeUInteger,
    "divideInteger-memory-arguments-slope": CanBeUInteger,
    "encodeUtf8-cpu-arguments-intercept": CanBeUInteger,
    "encodeUtf8-cpu-arguments-slope": CanBeUInteger,
    "encodeUtf8-memory-arguments-intercept": CanBeUInteger,
    "encodeUtf8-memory-arguments-slope": CanBeUInteger,
    "equalsByteString-cpu-arguments-constant": CanBeUInteger,
    "equalsByteString-cpu-arguments-intercept": CanBeUInteger,
    "equalsByteString-cpu-arguments-slope": CanBeUInteger,
    "equalsByteString-memory-arguments": CanBeUInteger,
    "equalsData-cpu-arguments-intercept": CanBeUInteger,
    "equalsData-cpu-arguments-slope": CanBeUInteger,
    "equalsData-memory-arguments": CanBeUInteger,
    "equalsInteger-cpu-arguments-intercept": CanBeUInteger,
    "equalsInteger-cpu-arguments-slope": CanBeUInteger,
    "equalsInteger-memory-arguments": CanBeUInteger,
    "equalsString-cpu-arguments-constant": CanBeUInteger,
    "equalsString-cpu-arguments-intercept": CanBeUInteger,
    "equalsString-cpu-arguments-slope": CanBeUInteger,
    "equalsString-memory-arguments": CanBeUInteger,
    "fstPair-cpu-arguments": CanBeUInteger,
    "fstPair-memory-arguments": CanBeUInteger,
    "headList-cpu-arguments": CanBeUInteger,
    "headList-memory-arguments": CanBeUInteger,
    "iData-cpu-arguments": CanBeUInteger,
    "iData-memory-arguments": CanBeUInteger,
    "ifThenElse-cpu-arguments": CanBeUInteger,
    "ifThenElse-memory-arguments": CanBeUInteger,
    "indexByteString-cpu-arguments": CanBeUInteger,
    "indexByteString-memory-arguments": CanBeUInteger,
    "lengthOfByteString-cpu-arguments": CanBeUInteger,
    "lengthOfByteString-memory-arguments": CanBeUInteger,
    "lessThanByteString-cpu-arguments-intercept": CanBeUInteger,
    "lessThanByteString-cpu-arguments-slope": CanBeUInteger,
    "lessThanByteString-memory-arguments": CanBeUInteger,
    "lessThanEqualsByteString-cpu-arguments-intercept": CanBeUInteger,
    "lessThanEqualsByteString-cpu-arguments-slope": CanBeUInteger,
    "lessThanEqualsByteString-memory-arguments": CanBeUInteger,
    "lessThanEqualsInteger-cpu-arguments-intercept": CanBeUInteger,
    "lessThanEqualsInteger-cpu-arguments-slope": CanBeUInteger,
    "lessThanEqualsInteger-memory-arguments": CanBeUInteger,
    "lessThanInteger-cpu-arguments-intercept": CanBeUInteger,
    "lessThanInteger-cpu-arguments-slope": CanBeUInteger,
    "lessThanInteger-memory-arguments": CanBeUInteger,
    "listData-cpu-arguments": CanBeUInteger,
    "listData-memory-arguments": CanBeUInteger,
    "mapData-cpu-arguments": CanBeUInteger,
    "mapData-memory-arguments": CanBeUInteger,
    "mkCons-cpu-arguments": CanBeUInteger,
    "mkCons-memory-arguments": CanBeUInteger,
    "mkNilData-cpu-arguments": CanBeUInteger,
    "mkNilData-memory-arguments": CanBeUInteger,
    "mkNilPairData-cpu-arguments": CanBeUInteger,
    "mkNilPairData-memory-arguments": CanBeUInteger,
    "mkPairData-cpu-arguments": CanBeUInteger,
    "mkPairData-memory-arguments": CanBeUInteger,
    "modInteger-cpu-arguments-constant": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-intercept": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-slope": CanBeUInteger,
    "modInteger-memory-arguments-intercept": CanBeUInteger,
    "modInteger-memory-arguments-minimum": CanBeUInteger,
    "modInteger-memory-arguments-slope": CanBeUInteger,
    "multiplyInteger-cpu-arguments-intercept": CanBeUInteger,
    "multiplyInteger-cpu-arguments-slope": CanBeUInteger,
    "multiplyInteger-memory-arguments-intercept": CanBeUInteger,
    "multiplyInteger-memory-arguments-slope": CanBeUInteger,
    "nullList-cpu-arguments": CanBeUInteger,
    "nullList-memory-arguments": CanBeUInteger,
    "quotientInteger-cpu-arguments-constant": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-intercept": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-slope": CanBeUInteger,
    "quotientInteger-memory-arguments-intercept": CanBeUInteger,
    "quotientInteger-memory-arguments-minimum": CanBeUInteger,
    "quotientInteger-memory-arguments-slope": CanBeUInteger,
    "remainderInteger-cpu-arguments-constant": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-intercept": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-slope": CanBeUInteger,
    "remainderInteger-memory-arguments-intercept": CanBeUInteger,
    "remainderInteger-memory-arguments-minimum": CanBeUInteger,
    "remainderInteger-memory-arguments-slope": CanBeUInteger,
    "serialiseData-cpu-arguments-intercept": CanBeUInteger,
    "serialiseData-cpu-arguments-slope": CanBeUInteger,
    "serialiseData-memory-arguments-intercept": CanBeUInteger,
    "serialiseData-memory-arguments-slope": CanBeUInteger,
    "sha2_256-cpu-arguments-intercept": CanBeUInteger,
    "sha2_256-cpu-arguments-slope": CanBeUInteger,
    "sha2_256-memory-arguments": CanBeUInteger,
    "sha3_256-cpu-arguments-intercept": CanBeUInteger,
    "sha3_256-cpu-arguments-slope": CanBeUInteger,
    "sha3_256-memory-arguments": CanBeUInteger,
    "sliceByteString-cpu-arguments-intercept": CanBeUInteger,
    "sliceByteString-cpu-arguments-slope": CanBeUInteger,
    "sliceByteString-memory-arguments-intercept": CanBeUInteger,
    "sliceByteString-memory-arguments-slope": CanBeUInteger,
    "sndPair-cpu-arguments": CanBeUInteger,
    "sndPair-memory-arguments": CanBeUInteger,
    "subtractInteger-cpu-arguments-intercept": CanBeUInteger,
    "subtractInteger-cpu-arguments-slope": CanBeUInteger,
    "subtractInteger-memory-arguments-intercept": CanBeUInteger,
    "subtractInteger-memory-arguments-slope": CanBeUInteger,
    "tailList-cpu-arguments": CanBeUInteger,
    "tailList-memory-arguments": CanBeUInteger,
    "trace-cpu-arguments": CanBeUInteger,
    "trace-memory-arguments": CanBeUInteger,
    "unBData-cpu-arguments": CanBeUInteger,
    "unBData-memory-arguments": CanBeUInteger,
    "unConstrData-cpu-arguments": CanBeUInteger,
    "unConstrData-memory-arguments": CanBeUInteger,
    "unIData-cpu-arguments": CanBeUInteger,
    "unIData-memory-arguments": CanBeUInteger,
    "unListData-cpu-arguments": CanBeUInteger,
    "unListData-memory-arguments": CanBeUInteger,
    "unMapData-cpu-arguments": CanBeUInteger,
    "unMapData-memory-arguments": CanBeUInteger,
    "verifyEcdsaSecp256k1Signature-cpu-arguments": CanBeUInteger,
    "verifyEcdsaSecp256k1Signature-memory-arguments": CanBeUInteger,
    "verifyEd25519Signature-cpu-arguments-intercept": CanBeUInteger,
    "verifyEd25519Signature-cpu-arguments-slope": CanBeUInteger,
    "verifyEd25519Signature-memory-arguments": CanBeUInteger,
    "verifySchnorrSecp256k1Signature-cpu-arguments-intercept": CanBeUInteger,
    "verifySchnorrSecp256k1Signature-cpu-arguments-slope": CanBeUInteger,
    "verifySchnorrSecp256k1Signature-memory-arguments": CanBeUInteger
}

// CAN NOT extend CostModelPlutusV2 because ORDER CHANGES
export interface CostModelPlutusV3 {
    "addInteger-cpu-arguments-intercept": CanBeUInteger,
    "addInteger-cpu-arguments-slope": CanBeUInteger,
    "addInteger-memory-arguments-intercept": CanBeUInteger,
    "addInteger-memory-arguments-slope": CanBeUInteger,
    "appendByteString-cpu-arguments-intercept": CanBeUInteger,
    "appendByteString-cpu-arguments-slope": CanBeUInteger,
    "appendByteString-memory-arguments-intercept": CanBeUInteger,
    "appendByteString-memory-arguments-slope": CanBeUInteger,
    "appendString-cpu-arguments-intercept": CanBeUInteger,
    "appendString-cpu-arguments-slope": CanBeUInteger,
    "appendString-memory-arguments-intercept": CanBeUInteger,
    "appendString-memory-arguments-slope": CanBeUInteger,
    "bData-cpu-arguments": CanBeUInteger,
    "bData-memory-arguments": CanBeUInteger,
    "blake2b_256-cpu-arguments-intercept": CanBeUInteger,
    "blake2b_256-cpu-arguments-slope": CanBeUInteger,
    "blake2b_256-memory-arguments": CanBeUInteger,
    "cekApplyCost-exBudgetCPU": CanBeUInteger,
    "cekApplyCost-exBudgetMemory": CanBeUInteger,
    "cekBuiltinCost-exBudgetCPU": CanBeUInteger,
    "cekBuiltinCost-exBudgetMemory": CanBeUInteger,
    "cekConstCost-exBudgetCPU": CanBeUInteger,
    "cekConstCost-exBudgetMemory": CanBeUInteger,
    "cekDelayCost-exBudgetCPU": CanBeUInteger,
    "cekDelayCost-exBudgetMemory": CanBeUInteger,
    "cekForceCost-exBudgetCPU": CanBeUInteger,
    "cekForceCost-exBudgetMemory": CanBeUInteger,
    "cekLamCost-exBudgetCPU": CanBeUInteger,
    "cekLamCost-exBudgetMemory": CanBeUInteger,
    "cekStartupCost-exBudgetCPU": CanBeUInteger,
    "cekStartupCost-exBudgetMemory": CanBeUInteger,
    "cekVarCost-exBudgetCPU": CanBeUInteger,
    "cekVarCost-exBudgetMemory": CanBeUInteger,
    "chooseData-cpu-arguments": CanBeUInteger,
    "chooseData-memory-arguments": CanBeUInteger,
    "chooseList-cpu-arguments": CanBeUInteger,
    "chooseList-memory-arguments": CanBeUInteger,
    "chooseUnit-cpu-arguments": CanBeUInteger,
    "chooseUnit-memory-arguments": CanBeUInteger,
    "consByteString-cpu-arguments-intercept": CanBeUInteger,
    "consByteString-cpu-arguments-slope": CanBeUInteger,
    "consByteString-memory-arguments-intercept": CanBeUInteger,
    "consByteString-memory-arguments-slope": CanBeUInteger,
    "constrData-cpu-arguments": CanBeUInteger,
    "constrData-memory-arguments": CanBeUInteger,
    "decodeUtf8-cpu-arguments-intercept": CanBeUInteger,
    "decodeUtf8-cpu-arguments-slope": CanBeUInteger,
    "decodeUtf8-memory-arguments-intercept": CanBeUInteger,
    "decodeUtf8-memory-arguments-slope": CanBeUInteger,
    "divideInteger-cpu-arguments-constant": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-c00": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-c01": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-c02": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-c10": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-c11": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-c20": CanBeUInteger,
    "divideInteger-cpu-arguments-model-arguments-minimum": CanBeUInteger,
    "divideInteger-memory-arguments-intercept": CanBeUInteger,
    "divideInteger-memory-arguments-minimum": CanBeUInteger,
    "divideInteger-memory-arguments-slope": CanBeUInteger,
    "encodeUtf8-cpu-arguments-intercept": CanBeUInteger,
    "encodeUtf8-cpu-arguments-slope": CanBeUInteger,
    "encodeUtf8-memory-arguments-intercept": CanBeUInteger,
    "encodeUtf8-memory-arguments-slope": CanBeUInteger,
    "equalsByteString-cpu-arguments-constant": CanBeUInteger,
    "equalsByteString-cpu-arguments-intercept": CanBeUInteger,
    "equalsByteString-cpu-arguments-slope": CanBeUInteger,
    "equalsByteString-memory-arguments": CanBeUInteger,
    "equalsData-cpu-arguments-intercept": CanBeUInteger,
    "equalsData-cpu-arguments-slope": CanBeUInteger,
    "equalsData-memory-arguments": CanBeUInteger,
    "equalsInteger-cpu-arguments-intercept": CanBeUInteger,
    "equalsInteger-cpu-arguments-slope": CanBeUInteger,
    "equalsInteger-memory-arguments": CanBeUInteger,
    "equalsString-cpu-arguments-constant": CanBeUInteger,
    "equalsString-cpu-arguments-intercept": CanBeUInteger,
    "equalsString-cpu-arguments-slope": CanBeUInteger,
    "equalsString-memory-arguments": CanBeUInteger,
    "fstPair-cpu-arguments": CanBeUInteger,
    "fstPair-memory-arguments": CanBeUInteger,
    "headList-cpu-arguments": CanBeUInteger,
    "headList-memory-arguments": CanBeUInteger,
    "iData-cpu-arguments": CanBeUInteger,
    "iData-memory-arguments": CanBeUInteger,
    "ifThenElse-cpu-arguments": CanBeUInteger,
    "ifThenElse-memory-arguments": CanBeUInteger,
    "indexByteString-cpu-arguments": CanBeUInteger,
    "indexByteString-memory-arguments": CanBeUInteger,
    "lengthOfByteString-cpu-arguments": CanBeUInteger,
    "lengthOfByteString-memory-arguments": CanBeUInteger,
    "lessThanByteString-cpu-arguments-intercept": CanBeUInteger,
    "lessThanByteString-cpu-arguments-slope": CanBeUInteger,
    "lessThanByteString-memory-arguments": CanBeUInteger,
    "lessThanEqualsByteString-cpu-arguments-intercept": CanBeUInteger,
    "lessThanEqualsByteString-cpu-arguments-slope": CanBeUInteger,
    "lessThanEqualsByteString-memory-arguments": CanBeUInteger,
    "lessThanEqualsInteger-cpu-arguments-intercept": CanBeUInteger,
    "lessThanEqualsInteger-cpu-arguments-slope": CanBeUInteger,
    "lessThanEqualsInteger-memory-arguments": CanBeUInteger,
    "lessThanInteger-cpu-arguments-intercept": CanBeUInteger,
    "lessThanInteger-cpu-arguments-slope": CanBeUInteger,
    "lessThanInteger-memory-arguments": CanBeUInteger,
    "listData-cpu-arguments": CanBeUInteger,
    "listData-memory-arguments": CanBeUInteger,
    "mapData-cpu-arguments": CanBeUInteger,
    "mapData-memory-arguments": CanBeUInteger,
    "mkCons-cpu-arguments": CanBeUInteger,
    "mkCons-memory-arguments": CanBeUInteger,
    "mkNilData-cpu-arguments": CanBeUInteger,
    "mkNilData-memory-arguments": CanBeUInteger,
    "mkNilPairData-cpu-arguments": CanBeUInteger,
    "mkNilPairData-memory-arguments": CanBeUInteger,
    "mkPairData-cpu-arguments": CanBeUInteger,
    "mkPairData-memory-arguments": CanBeUInteger,
    "modInteger-cpu-arguments-constant": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-c00": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-c01": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-c02": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-c10": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-c11": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-c20": CanBeUInteger,
    "modInteger-cpu-arguments-model-arguments-minimum": CanBeUInteger,
    "modInteger-memory-arguments-intercept": CanBeUInteger,
    "modInteger-memory-arguments-slope": CanBeUInteger,
    "multiplyInteger-cpu-arguments-intercept": CanBeUInteger,
    "multiplyInteger-cpu-arguments-slope": CanBeUInteger,
    "multiplyInteger-memory-arguments-intercept": CanBeUInteger,
    "multiplyInteger-memory-arguments-slope": CanBeUInteger,
    "nullList-cpu-arguments": CanBeUInteger,
    "nullList-memory-arguments": CanBeUInteger,
    "quotientInteger-cpu-arguments-constant": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-c00": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-c01": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-c02": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-c10": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-c11": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-c20": CanBeUInteger,
    "quotientInteger-cpu-arguments-model-arguments-minimum": CanBeUInteger,
    "quotientInteger-memory-arguments-intercept": CanBeUInteger,
    "quotientInteger-memory-arguments-minimum": CanBeUInteger,
    "quotientInteger-memory-arguments-slope": CanBeUInteger,
    "remainderInteger-cpu-arguments-constant": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-c00": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-c01": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-c02": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-c10": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-c11": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-c20": CanBeUInteger,
    "remainderInteger-cpu-arguments-model-arguments-minimum": CanBeUInteger,
    "remainderInteger-memory-arguments-intercept": CanBeUInteger,
    "remainderInteger-memory-arguments-slope": CanBeUInteger,
    "serialiseData-cpu-arguments-intercept": CanBeUInteger,
    "serialiseData-cpu-arguments-slope": CanBeUInteger,
    "serialiseData-memory-arguments-intercept": CanBeUInteger,
    "serialiseData-memory-arguments-slope": CanBeUInteger,
    "sha2_256-cpu-arguments-intercept": CanBeUInteger,
    "sha2_256-cpu-arguments-slope": CanBeUInteger,
    "sha2_256-memory-arguments": CanBeUInteger,
    "sha3_256-cpu-arguments-intercept": CanBeUInteger,
    "sha3_256-cpu-arguments-slope": CanBeUInteger,
    "sha3_256-memory-arguments": CanBeUInteger,
    "sliceByteString-cpu-arguments-intercept": CanBeUInteger,
    "sliceByteString-cpu-arguments-slope": CanBeUInteger,
    "sliceByteString-memory-arguments-intercept": CanBeUInteger,
    "sliceByteString-memory-arguments-slope": CanBeUInteger,
    "sndPair-cpu-arguments": CanBeUInteger,
    "sndPair-memory-arguments": CanBeUInteger,
    "subtractInteger-cpu-arguments-intercept": CanBeUInteger,
    "subtractInteger-cpu-arguments-slope": CanBeUInteger,
    "subtractInteger-memory-arguments-intercept": CanBeUInteger,
    "subtractInteger-memory-arguments-slope": CanBeUInteger,
    "tailList-cpu-arguments": CanBeUInteger,
    "tailList-memory-arguments": CanBeUInteger,
    "trace-cpu-arguments": CanBeUInteger,
    "trace-memory-arguments": CanBeUInteger,
    "unBData-cpu-arguments": CanBeUInteger,
    "unBData-memory-arguments": CanBeUInteger,
    "unConstrData-cpu-arguments": CanBeUInteger,
    "unConstrData-memory-arguments": CanBeUInteger,
    "unIData-cpu-arguments": CanBeUInteger,
    "unIData-memory-arguments": CanBeUInteger,
    "unListData-cpu-arguments": CanBeUInteger,
    "unListData-memory-arguments": CanBeUInteger,
    "unMapData-cpu-arguments": CanBeUInteger,
    "unMapData-memory-arguments": CanBeUInteger,
    "verifyEcdsaSecp256k1Signature-cpu-arguments": CanBeUInteger,
    "verifyEcdsaSecp256k1Signature-memory-arguments": CanBeUInteger,
    "verifyEd25519Signature-cpu-arguments-intercept": CanBeUInteger,
    "verifyEd25519Signature-cpu-arguments-slope": CanBeUInteger,
    "verifyEd25519Signature-memory-arguments": CanBeUInteger,
    "verifySchnorrSecp256k1Signature-cpu-arguments-intercept": CanBeUInteger,
    "verifySchnorrSecp256k1Signature-cpu-arguments-slope": CanBeUInteger,
    "verifySchnorrSecp256k1Signature-memory-arguments": CanBeUInteger,
    "cekConstrCost-exBudgetCPU": CanBeUInteger,
    "cekConstrCost-exBudgetMemory": CanBeUInteger,
    "cekCaseCost-exBudgetCPU": CanBeUInteger,
    "cekCaseCost-exBudgetMemory": CanBeUInteger,
    "bls12_381_G1_add-cpu-arguments": CanBeUInteger,
    "bls12_381_G1_add-memory-arguments": CanBeUInteger,
    "bls12_381_G1_compress-cpu-arguments": CanBeUInteger,
    "bls12_381_G1_compress-memory-arguments": CanBeUInteger,
    "bls12_381_G1_equal-cpu-arguments": CanBeUInteger,
    "bls12_381_G1_equal-memory-arguments": CanBeUInteger,
    "bls12_381_G1_hashToGroup-cpu-arguments-intercept": CanBeUInteger,
    "bls12_381_G1_hashToGroup-cpu-arguments-slope": CanBeUInteger,
    "bls12_381_G1_hashToGroup-memory-arguments": CanBeUInteger,
    "bls12_381_G1_neg-cpu-arguments": CanBeUInteger,
    "bls12_381_G1_neg-memory-arguments": CanBeUInteger,
    "bls12_381_G1_scalarMul-cpu-arguments-intercept": CanBeUInteger,
    "bls12_381_G1_scalarMul-cpu-arguments-slope": CanBeUInteger,
    "bls12_381_G1_scalarMul-memory-arguments": CanBeUInteger,
    "bls12_381_G1_uncompress-cpu-arguments": CanBeUInteger,
    "bls12_381_G1_uncompress-memory-arguments": CanBeUInteger,
    "bls12_381_G2_add-cpu-arguments": CanBeUInteger,
    "bls12_381_G2_add-memory-arguments": CanBeUInteger,
    "bls12_381_G2_compress-cpu-arguments": CanBeUInteger,
    "bls12_381_G2_compress-memory-arguments": CanBeUInteger,
    "bls12_381_G2_equal-cpu-arguments": CanBeUInteger,
    "bls12_381_G2_equal-memory-arguments": CanBeUInteger,
    "bls12_381_G2_hashToGroup-cpu-arguments-intercept": CanBeUInteger,
    "bls12_381_G2_hashToGroup-cpu-arguments-slope": CanBeUInteger,
    "bls12_381_G2_hashToGroup-memory-arguments": CanBeUInteger,
    "bls12_381_G2_neg-cpu-arguments": CanBeUInteger,
    "bls12_381_G2_neg-memory-arguments": CanBeUInteger,
    "bls12_381_G2_scalarMul-cpu-arguments-intercept": CanBeUInteger,
    "bls12_381_G2_scalarMul-cpu-arguments-slope": CanBeUInteger,
    "bls12_381_G2_scalarMul-memory-arguments": CanBeUInteger,
    "bls12_381_G2_uncompress-cpu-arguments": CanBeUInteger,
    "bls12_381_G2_uncompress-memory-arguments": CanBeUInteger,
    "bls12_381_finalVerify-cpu-arguments": CanBeUInteger,
    "bls12_381_finalVerify-memory-arguments": CanBeUInteger,
    "bls12_381_millerLoop-cpu-arguments": CanBeUInteger,
    "bls12_381_millerLoop-memory-arguments": CanBeUInteger,
    "bls12_381_mulMlResult-cpu-arguments": CanBeUInteger,
    "bls12_381_mulMlResult-memory-arguments": CanBeUInteger,
    "keccak_256-cpu-arguments-intercept": CanBeUInteger,
    "keccak_256-cpu-arguments-slope": CanBeUInteger,
    "keccak_256-memory-arguments": CanBeUInteger,
    "blake2b_224-cpu-arguments-intercept": CanBeUInteger,
    "blake2b_224-cpu-arguments-slope": CanBeUInteger,
    "blake2b_224-memory-arguments": CanBeUInteger,
    "integerToByteString-cpu-arguments-c0": CanBeUInteger,
    "integerToByteString-cpu-arguments-c1": CanBeUInteger,
    "integerToByteString-cpu-arguments-c2": CanBeUInteger,
    "integerToByteString-memory-arguments-intercept": CanBeUInteger,
    "integerToByteString-memory-arguments-slope": CanBeUInteger,
    "byteStringToInteger-cpu-arguments-c0": CanBeUInteger,
    "byteStringToInteger-cpu-arguments-c1": CanBeUInteger,
    "byteStringToInteger-cpu-arguments-c2": CanBeUInteger,
    "byteStringToInteger-memory-arguments-intercept": CanBeUInteger,
    "byteStringToInteger-memory-arguments-slope": CanBeUInteger
}