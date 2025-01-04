import { defineReadOnlyProperty } from "@harmoniclabs/obj-utils";
import { forceArrayish, isArrayish } from "../utils/isArrayish";
import { AnyV1CostModel } from "./AnyV1CostModel";
import { CostModelPlutusV1 } from "./CostModelPlutusV1";
import { costModelV1Keys } from "./costModelV1Keys";
import { defaultV1Costs } from "./defaultV1Costs";
import { N_COST_MODEL_PLUTUS_V1 } from "./N_COST_MODEL_PLUTUS_V1";

export function toCostModelV1( v1: AnyV1CostModel ): CostModelPlutusV1
{
    if( isArrayish( v1 ) ) v1 = forceArrayish( v1 ) as any;

    // already a CostModelPlutusV1 object
    if( !Array.isArray( v1 ) ) return v1;

    const result = { ...defaultV1Costs };

    if( v1.length < N_COST_MODEL_PLUTUS_V1 )
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