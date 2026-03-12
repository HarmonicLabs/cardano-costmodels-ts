import { canBeInteger } from "../utils/ints";
import { AnyV4CostModel } from "./AnyV4CostModel";
import { N_COST_MODEL_PLUTUS_V4 } from "./N_COST_MODEL_PLUTUS_V4";
import { N_COST_MODEL_PLUTUS_V3 } from "../v3/N_COST_MODEL_PLUTUS_V3";
import { costModelV4Keys } from "./costModelV4Keys";

export function isCostModelsV4( something: any ): something is AnyV4CostModel
{
    if(!( typeof something === "object" && something !== null )) return false;

    if( Array.isArray( something ) )
    {
        return something.length >= N_COST_MODEL_PLUTUS_V4 &&
        something.every( canBeInteger );
    }

    const keys = Object.keys( something );

    if( keys.length < N_COST_MODEL_PLUTUS_V4 ) return false;

    return costModelV4Keys.every( k => {
        const val = something[k];
        return val !== undefined && canBeInteger( val );
    });
}
