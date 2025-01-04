import { canBeInteger } from "../utils/ints";
import { AnyV3CostModel } from "./AnyV3CostModel";
import { CostModelPlutusV3 } from "./CostModelPlutusV3";
import { CostModelPlutusV3Array } from "./CostModelPlutusV3Array";
import { costModelV3Keys } from "./costModelV3Keys";
import { defaultV3Costs } from "./defaultV3Costs";
import { N_COST_MODEL_PLUTUS_V3 } from "./N_COST_MODEL_PLUTUS_V3";

export function toCostModelArrV3( v3: AnyV3CostModel ): CostModelPlutusV3Array
{
    if( Array.isArray( v3 ) ) return fillV3ArrCosts( v3 );

    return Object.freeze(
        costModelV3Keys.map( k => getV3Key( v3, k ) ) as CostModelPlutusV3Array
    );
}

function fillV3ArrCosts( arr: CostModelPlutusV3Array ): CostModelPlutusV3Array
{
    const reuslt = new Array<number>( N_COST_MODEL_PLUTUS_V3 ) as CostModelPlutusV3Array;

    let i = 0;
    for( ; i < arr.length || i < N_COST_MODEL_PLUTUS_V3; i++ )
    {
        let value = arr[i];
        reuslt[i] = Number(
            canBeInteger( value ) ? value :
            defaultV3Costs[costModelV3Keys[i]]
        );
    }
    for( ; i < N_COST_MODEL_PLUTUS_V3; i++ )
    {
        reuslt[i] = Number(
            defaultV3Costs[costModelV3Keys[i]]
        );
    }

    return reuslt;
}

function getV3Key( obj: CostModelPlutusV3, key: keyof CostModelPlutusV3 ): number
{
    const value = obj[key];
    if( !canBeInteger( value ) ) return Number( defaultV3Costs[key] );
    return Number( value )
}