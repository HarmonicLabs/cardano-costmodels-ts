import { canBeInteger } from "../utils/ints";
import { AnyV4CostModel } from "./AnyV4CostModel";
import { CostModelPlutusV4 } from "./CostModelPlutusV4";
import { CostModelPlutusV4Array } from "./CostModelPlutusV4Array";
import { costModelV4Keys } from "./costModelV4Keys";
import { defaultV4Costs } from "./defaultV4Costs";
import { N_COST_MODEL_PLUTUS_V4 } from "./N_COST_MODEL_PLUTUS_V4";

export function toCostModelArrV4( v4: AnyV4CostModel ): CostModelPlutusV4Array
{
    if( Array.isArray( v4 ) ) return fillV4ArrCosts( v4 );

    return Object.freeze(
        costModelV4Keys.map( k => getV4Key( v4, k ) ) as CostModelPlutusV4Array
    );
}

function fillV4ArrCosts( arr: CostModelPlutusV4Array ): CostModelPlutusV4Array
{
    const result = new Array<number>( N_COST_MODEL_PLUTUS_V4 ) as CostModelPlutusV4Array;

    let i = 0;
    for( ; i < arr.length && i < N_COST_MODEL_PLUTUS_V4; i++ )
    {
        const value = arr[i];
        result[i] = Number(
            canBeInteger( value ) ? value :
            defaultV4Costs[costModelV4Keys[i]]
        );
    }
    for( ; i < N_COST_MODEL_PLUTUS_V4; i++ )
    {
        result[i] = Number( defaultV4Costs[costModelV4Keys[i]] );
    }

    return result;
}

function getV4Key( obj: CostModelPlutusV4, key: keyof CostModelPlutusV4 ): number
{
    const value = obj[key];
    if( !canBeInteger( value ) ) return Number( defaultV4Costs[key] );
    return Number( value );
}
