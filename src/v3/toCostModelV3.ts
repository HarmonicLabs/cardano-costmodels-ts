import { defineNormalProperty } from "@harmoniclabs/obj-utils";
import { isArrayish, forceArrayish } from "../utils/isArrayish";
import { AnyV3CostModel } from "./AnyV3CostModel";
import { CostModelPlutusV3 } from "./CostModelPlutusV3";
import { costModelV3Keys } from "./costModelV3Keys";
import { defaultV3Costs } from "./defaultV3Costs";
import { N_COST_MODEL_PLUTUS_V3 } from "./N_COST_MODEL_PLUTUS_V3";

export function toCostModelV3( v3: AnyV3CostModel ): CostModelPlutusV3
{
    if( isArrayish( v3 ) ) v3 = forceArrayish( v3 ) as any;
    if( !Array.isArray( v3 ) ) return v3;

    const result = { ...defaultV3Costs };

    if( v3.length < N_COST_MODEL_PLUTUS_V3 )
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