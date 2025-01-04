import { isArrayish, forceArrayish } from "../utils/isArrayish";
import { AnyV2CostModel } from "./AnyV2CostModel";
import { CostModelPlutusV2 } from "./CostModelPlutusV2";
import { costModelV2Keys } from "./costModelV2Keys";
import { defaultV2Costs } from "./defaultV2Costs";
import { N_COST_MODEL_PLUTUS_V2 } from "./N_COST_MODEL_PLUTUS_V2";

export function toCostModelV2( v2: AnyV2CostModel ): CostModelPlutusV2
{
    if( isArrayish( v2 ) ) v2 = forceArrayish( v2 ) as any;
    if( !Array.isArray( v2 ) ) return {
        ...defaultV2Costs,
        ...v2
    };

    const result = { ...defaultV2Costs };

    if( v2.length < N_COST_MODEL_PLUTUS_V2 )
    throw new Error(
        "impossible to convert cost model v2 array to object; not enough arguments; arguments found in total: " + v2.length.toString()
    );
    
    for( let i = 0; i < N_COST_MODEL_PLUTUS_V2; i++ )
    {
        result[costModelV2Keys[i]] = BigInt( v2[i] );
    }

    return result as any;
}