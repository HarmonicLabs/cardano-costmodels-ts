import { canBeInteger } from "../utils/ints";
import { AnyV3CostModel } from "./AnyV3CostModel";
import { CostModelPlutusV3 } from "./CostModelPlutusV3";
import { CostModelPlutusV3Array } from "./CostModelPlutusV3Array";
import { costModelV3Keys } from "./costModelV3Keys";
import { defaultV3Costs } from "./defaultV3Costs";

export function toCostModelArrV3( v3: AnyV3CostModel ): CostModelPlutusV3Array
{
    if( Array.isArray( v3 ) ) return v3;

    return Object.freeze(
        costModelV3Keys.map( k => getV3Key( v3, k ) ) as CostModelPlutusV3Array
    );
}

function getV3Key( obj: CostModelPlutusV3, key: keyof CostModelPlutusV3 ): number
{
    const value = obj[key];
    if( !canBeInteger( value ) ) return Number( defaultV3Costs[key] );
    return Number( value )
}