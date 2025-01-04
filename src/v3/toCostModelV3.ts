import { defineNormalProperty } from "@harmoniclabs/obj-utils";
import { isArrayish, forceArrayish } from "../utils/isArrayish";
import { AnyV3CostModel } from "./AnyV3CostModel";
import { CostModelPlutusV3 } from "./CostModelPlutusV3";
import { costModelV3Keys } from "./costModelV3Keys";
import { defaultV3Costs } from "./defaultV3Costs";
import { N_COST_MODEL_PLUTUS_V3, N_COST_MODEL_PLUTUS_V3_CHANG_1 } from "./N_COST_MODEL_PLUTUS_V3";
import { canBeInteger } from "../utils/ints";
import { toCostModelArrV3 } from "./toCostModelArrV3";

export function toCostModelV3( v3: AnyV3CostModel ): CostModelPlutusV3
{
    if( isArrayish( v3 ) ) v3 = forceArrayish( v3 ) as any;
    if( !Array.isArray( v3 ) ) return {
        ...defaultV3Costs,
        ...v3
    };

    const result = { ...defaultV3Costs } as CostModelPlutusV3;

    if( v3.length < N_COST_MODEL_PLUTUS_V3_CHANG_1 )
    throw new Error(
        "impossible to convert cost model v3 array to object; not enough arguments; arguments found in total: "
        + v3.length.toString()
    );

    if( v3.length < N_COST_MODEL_PLUTUS_V3 ) v3 = toCostModelArrV3( v3 );
    
    for( let i = 0; i < N_COST_MODEL_PLUTUS_V3; i++ )
    {
        const value = v3[i];
        result[costModelV3Keys[i]] = Number(
            canBeInteger( value ) ? value :
            defaultV3Costs[costModelV3Keys[i]]
        );
    }

    return result;
}