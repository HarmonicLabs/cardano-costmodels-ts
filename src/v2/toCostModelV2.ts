import { defineNormalProperty } from "@harmoniclabs/obj-utils";
import { isArrayish, forceArrayish } from "../utils/isArrayish";
import { AnyV2CostModel } from "./AnyV2CostModel";
import { CostModelPlutusV2 } from "./CostModelPlutusV2";
import { costModelV2Keys } from "./costModelV2Keys";
import { defaultV2Costs } from "./defaultV2Costs";

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