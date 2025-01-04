import { canBeInteger } from "../utils/ints";
import { AnyV2CostModel } from "./AnyV2CostModel";
import { CostModelPlutusV2 } from "./CostModelPlutusV2";
import { CostModelPlutusV2Array } from "./CostModelPlutusV2Array";
import { costModelV2Keys } from "./costModelV2Keys";
import { defaultV2Costs } from "./defaultV2Costs";
import { N_COST_MODEL_PLUTUS_V2 } from "./N_COST_MODEL_PLUTUS_V2";

export function toCostModelArrV2( v2: AnyV2CostModel ): CostModelPlutusV2Array
{
    if( Array.isArray( v2 ) ) return fillV2ArrCosts( v2 );

    // order matters; cant do `Object.keys`
    return Object.freeze([
        getV2Key( v2, "addInteger-cpu-arguments-intercept" ),
        getV2Key( v2, "addInteger-cpu-arguments-slope" ),
        getV2Key( v2, "addInteger-memory-arguments-intercept" ),
        getV2Key( v2, "addInteger-memory-arguments-slope" ),
        getV2Key( v2, "appendByteString-cpu-arguments-intercept" ),
        getV2Key( v2, "appendByteString-cpu-arguments-slope" ),
        getV2Key( v2, "appendByteString-memory-arguments-intercept" ),
        getV2Key( v2, "appendByteString-memory-arguments-slope" ),
        getV2Key( v2, "appendString-cpu-arguments-intercept" ),
        getV2Key( v2, "appendString-cpu-arguments-slope" ),
        getV2Key( v2, "appendString-memory-arguments-intercept" ),
        getV2Key( v2, "appendString-memory-arguments-slope" ),
        getV2Key( v2, "bData-cpu-arguments" ),
        getV2Key( v2, "bData-memory-arguments" ),
        getV2Key( v2, "blake2b_256-cpu-arguments-intercept" ),
        getV2Key( v2, "blake2b_256-cpu-arguments-slope" ),
        getV2Key( v2, "blake2b_256-memory-arguments" ),
        getV2Key( v2, "cekApplyCost-exBudgetCPU" ),
        getV2Key( v2, "cekApplyCost-exBudgetMemory" ),
        getV2Key( v2, "cekBuiltinCost-exBudgetCPU" ),
        getV2Key( v2, "cekBuiltinCost-exBudgetMemory" ),
        getV2Key( v2, "cekConstCost-exBudgetCPU" ),
        getV2Key( v2, "cekConstCost-exBudgetMemory" ),
        getV2Key( v2, "cekDelayCost-exBudgetCPU" ),
        getV2Key( v2, "cekDelayCost-exBudgetMemory" ),
        getV2Key( v2, "cekForceCost-exBudgetCPU" ),
        getV2Key( v2, "cekForceCost-exBudgetMemory" ),
        getV2Key( v2, "cekLamCost-exBudgetCPU" ),
        getV2Key( v2, "cekLamCost-exBudgetMemory" ),
        getV2Key( v2, "cekStartupCost-exBudgetCPU" ),
        getV2Key( v2, "cekStartupCost-exBudgetMemory" ),
        getV2Key( v2, "cekVarCost-exBudgetCPU" ),
        getV2Key( v2, "cekVarCost-exBudgetMemory" ),
        getV2Key( v2, "chooseData-cpu-arguments" ),
        getV2Key( v2, "chooseData-memory-arguments" ),
        getV2Key( v2, "chooseList-cpu-arguments" ),
        getV2Key( v2, "chooseList-memory-arguments" ),
        getV2Key( v2, "chooseUnit-cpu-arguments" ),
        getV2Key( v2, "chooseUnit-memory-arguments" ),
        getV2Key( v2, "consByteString-cpu-arguments-intercept" ),
        getV2Key( v2, "consByteString-cpu-arguments-slope" ),
        getV2Key( v2, "consByteString-memory-arguments-intercept" ),
        getV2Key( v2, "consByteString-memory-arguments-slope" ),
        getV2Key( v2, "constrData-cpu-arguments" ),
        getV2Key( v2, "constrData-memory-arguments" ),
        getV2Key( v2, "decodeUtf8-cpu-arguments-intercept" ),
        getV2Key( v2, "decodeUtf8-cpu-arguments-slope" ),
        getV2Key( v2, "decodeUtf8-memory-arguments-intercept" ),
        getV2Key( v2, "decodeUtf8-memory-arguments-slope" ),
        getV2Key( v2, "divideInteger-cpu-arguments-constant" ),
        getV2Key( v2, "divideInteger-cpu-arguments-model-arguments-intercept" ),
        getV2Key( v2, "divideInteger-cpu-arguments-model-arguments-slope" ),
        getV2Key( v2, "divideInteger-memory-arguments-intercept" ),
        getV2Key( v2, "divideInteger-memory-arguments-minimum" ),
        getV2Key( v2, "divideInteger-memory-arguments-slope" ),
        getV2Key( v2, "encodeUtf8-cpu-arguments-intercept" ),
        getV2Key( v2, "encodeUtf8-cpu-arguments-slope" ),
        getV2Key( v2, "encodeUtf8-memory-arguments-intercept" ),
        getV2Key( v2, "encodeUtf8-memory-arguments-slope" ),
        getV2Key( v2, "equalsByteString-cpu-arguments-constant" ),
        getV2Key( v2, "equalsByteString-cpu-arguments-intercept" ),
        getV2Key( v2, "equalsByteString-cpu-arguments-slope" ),
        getV2Key( v2, "equalsByteString-memory-arguments" ),
        getV2Key( v2, "equalsData-cpu-arguments-intercept" ),
        getV2Key( v2, "equalsData-cpu-arguments-slope" ),
        getV2Key( v2, "equalsData-memory-arguments" ),
        getV2Key( v2, "equalsInteger-cpu-arguments-intercept" ),
        getV2Key( v2, "equalsInteger-cpu-arguments-slope" ),
        getV2Key( v2, "equalsInteger-memory-arguments" ),
        getV2Key( v2, "equalsString-cpu-arguments-constant" ),
        getV2Key( v2, "equalsString-cpu-arguments-intercept" ),
        getV2Key( v2, "equalsString-cpu-arguments-slope" ),
        getV2Key( v2, "equalsString-memory-arguments" ),
        getV2Key( v2, "fstPair-cpu-arguments" ),
        getV2Key( v2, "fstPair-memory-arguments" ),
        getV2Key( v2, "headList-cpu-arguments" ),
        getV2Key( v2, "headList-memory-arguments" ),
        getV2Key( v2, "iData-cpu-arguments" ),
        getV2Key( v2, "iData-memory-arguments" ),
        getV2Key( v2, "ifThenElse-cpu-arguments" ),
        getV2Key( v2, "ifThenElse-memory-arguments" ),
        getV2Key( v2, "indexByteString-cpu-arguments" ),
        getV2Key( v2, "indexByteString-memory-arguments" ),
        getV2Key( v2, "lengthOfByteString-cpu-arguments" ),
        getV2Key( v2, "lengthOfByteString-memory-arguments" ),
        getV2Key( v2, "lessThanByteString-cpu-arguments-intercept" ),
        getV2Key( v2, "lessThanByteString-cpu-arguments-slope" ),
        getV2Key( v2, "lessThanByteString-memory-arguments" ),
        getV2Key( v2, "lessThanEqualsByteString-cpu-arguments-intercept" ),
        getV2Key( v2, "lessThanEqualsByteString-cpu-arguments-slope" ),
        getV2Key( v2, "lessThanEqualsByteString-memory-arguments" ),
        getV2Key( v2, "lessThanEqualsInteger-cpu-arguments-intercept" ),
        getV2Key( v2, "lessThanEqualsInteger-cpu-arguments-slope" ),
        getV2Key( v2, "lessThanEqualsInteger-memory-arguments" ),
        getV2Key( v2, "lessThanInteger-cpu-arguments-intercept" ),
        getV2Key( v2, "lessThanInteger-cpu-arguments-slope" ),
        getV2Key( v2, "lessThanInteger-memory-arguments" ),
        getV2Key( v2, "listData-cpu-arguments" ),
        getV2Key( v2, "listData-memory-arguments" ),
        getV2Key( v2, "mapData-cpu-arguments" ),
        getV2Key( v2, "mapData-memory-arguments" ),
        getV2Key( v2, "mkCons-cpu-arguments" ),
        getV2Key( v2, "mkCons-memory-arguments" ),
        getV2Key( v2, "mkNilData-cpu-arguments" ),
        getV2Key( v2, "mkNilData-memory-arguments" ),
        getV2Key( v2, "mkNilPairData-cpu-arguments" ),
        getV2Key( v2, "mkNilPairData-memory-arguments" ),
        getV2Key( v2, "mkPairData-cpu-arguments" ),
        getV2Key( v2, "mkPairData-memory-arguments" ),
        getV2Key( v2, "modInteger-cpu-arguments-constant" ),
        getV2Key( v2, "modInteger-cpu-arguments-model-arguments-intercept" ),
        getV2Key( v2, "modInteger-cpu-arguments-model-arguments-slope" ),
        getV2Key( v2, "modInteger-memory-arguments-intercept" ),
        getV2Key( v2, "modInteger-memory-arguments-minimum" ),
        getV2Key( v2, "modInteger-memory-arguments-slope" ),
        getV2Key( v2, "multiplyInteger-cpu-arguments-intercept" ),
        getV2Key( v2, "multiplyInteger-cpu-arguments-slope" ),
        getV2Key( v2, "multiplyInteger-memory-arguments-intercept" ),
        getV2Key( v2, "multiplyInteger-memory-arguments-slope" ),
        getV2Key( v2, "nullList-cpu-arguments" ),
        getV2Key( v2, "nullList-memory-arguments" ),
        getV2Key( v2, "quotientInteger-cpu-arguments-constant" ),
        getV2Key( v2, "quotientInteger-cpu-arguments-model-arguments-intercept" ),
        getV2Key( v2, "quotientInteger-cpu-arguments-model-arguments-slope" ),
        getV2Key( v2, "quotientInteger-memory-arguments-intercept" ),
        getV2Key( v2, "quotientInteger-memory-arguments-minimum" ),
        getV2Key( v2, "quotientInteger-memory-arguments-slope" ),
        getV2Key( v2, "remainderInteger-cpu-arguments-constant" ),
        getV2Key( v2, "remainderInteger-cpu-arguments-model-arguments-intercept" ),
        getV2Key( v2, "remainderInteger-cpu-arguments-model-arguments-slope" ),
        getV2Key( v2, "remainderInteger-memory-arguments-intercept" ),
        getV2Key( v2, "remainderInteger-memory-arguments-minimum" ),
        getV2Key( v2, "remainderInteger-memory-arguments-slope" ),
        getV2Key( v2, "serialiseData-cpu-arguments-intercept" ),
        getV2Key( v2, "serialiseData-cpu-arguments-slope" ),
        getV2Key( v2, "serialiseData-memory-arguments-intercept" ),
        getV2Key( v2, "serialiseData-memory-arguments-slope" ),
        getV2Key( v2, "sha2_256-cpu-arguments-intercept" ),
        getV2Key( v2, "sha2_256-cpu-arguments-slope" ),
        getV2Key( v2, "sha2_256-memory-arguments" ),
        getV2Key( v2, "sha3_256-cpu-arguments-intercept" ),
        getV2Key( v2, "sha3_256-cpu-arguments-slope" ),
        getV2Key( v2, "sha3_256-memory-arguments" ),
        getV2Key( v2, "sliceByteString-cpu-arguments-intercept" ),
        getV2Key( v2, "sliceByteString-cpu-arguments-slope" ),
        getV2Key( v2, "sliceByteString-memory-arguments-intercept" ),
        getV2Key( v2, "sliceByteString-memory-arguments-slope" ),
        getV2Key( v2, "sndPair-cpu-arguments" ),
        getV2Key( v2, "sndPair-memory-arguments" ),
        getV2Key( v2, "subtractInteger-cpu-arguments-intercept" ),
        getV2Key( v2, "subtractInteger-cpu-arguments-slope" ),
        getV2Key( v2, "subtractInteger-memory-arguments-intercept" ),
        getV2Key( v2, "subtractInteger-memory-arguments-slope" ),
        getV2Key( v2, "tailList-cpu-arguments" ),
        getV2Key( v2, "tailList-memory-arguments" ),
        getV2Key( v2, "trace-cpu-arguments" ),
        getV2Key( v2, "trace-memory-arguments" ),
        getV2Key( v2, "unBData-cpu-arguments" ),
        getV2Key( v2, "unBData-memory-arguments" ),
        getV2Key( v2, "unConstrData-cpu-arguments" ),
        getV2Key( v2, "unConstrData-memory-arguments" ),
        getV2Key( v2, "unIData-cpu-arguments" ),
        getV2Key( v2, "unIData-memory-arguments" ),
        getV2Key( v2, "unListData-cpu-arguments" ),
        getV2Key( v2, "unListData-memory-arguments" ),
        getV2Key( v2, "unMapData-cpu-arguments" ),
        getV2Key( v2, "unMapData-memory-arguments" ),
        getV2Key( v2, "verifyEcdsaSecp256k1Signature-cpu-arguments" ),
        getV2Key( v2, "verifyEcdsaSecp256k1Signature-memory-arguments" ),
        getV2Key( v2, "verifyEd25519Signature-cpu-arguments-intercept" ),
        getV2Key( v2, "verifyEd25519Signature-cpu-arguments-slope" ),
        getV2Key( v2, "verifyEd25519Signature-memory-arguments" ),
        getV2Key( v2, "verifySchnorrSecp256k1Signature-cpu-arguments-intercept" ),
        getV2Key( v2, "verifySchnorrSecp256k1Signature-cpu-arguments-slope" ),
        getV2Key( v2, "verifySchnorrSecp256k1Signature-memory-arguments" ),
    ]) as any;
}

function fillV2ArrCosts( arr: CostModelPlutusV2Array ): CostModelPlutusV2Array
{
    const reuslt = new Array<number>( N_COST_MODEL_PLUTUS_V2 ) as CostModelPlutusV2Array;

    let i = 0;
    for( ; i < arr.length || i < N_COST_MODEL_PLUTUS_V2; i++ )
    {
        let value = arr[i];
        reuslt[i] = Number(
            canBeInteger( value ) ? value :
            defaultV2Costs[costModelV2Keys[i]]
        );
    }
    for( ; i < N_COST_MODEL_PLUTUS_V2; i++ )
    {
        reuslt[i] = Number(
            defaultV2Costs[costModelV2Keys[i]]
        );
    }

    return reuslt;
}

function getV2Key( obj: CostModelPlutusV2, key: keyof CostModelPlutusV2 ): number
{
    const value = obj[key];
    if( !canBeInteger( value ) ) return Number( defaultV2Costs[key] );
    return Number( value )
}