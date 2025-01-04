import { canBeInteger } from "../utils/ints";
import { AnyV3CostModel } from "./AnyV3CostModel";
import { costModelChangV3Keys, costModelV3Keys } from "./costModelV3Keys";
import { N_COST_MODEL_PLUTUS_V3, N_COST_MODEL_PLUTUS_V3_CHANG_1 } from "./N_COST_MODEL_PLUTUS_V3";

export function isCostModelsV3( something: any ): something is AnyV3CostModel
{
    if(!( typeof something === "object" && something !== null )) return false;

    if( Array.isArray( something ) )
    {
        // CostModelPlutusV3Array
        return (something.length >= N_COST_MODEL_PLUTUS_V3 || something.length >= N_COST_MODEL_PLUTUS_V3_CHANG_1) &&
        something.every( canBeInteger )
    }

    const keys = Object.keys( something );

    if( keys.length < N_COST_MODEL_PLUTUS_V3_CHANG_1 ) return false;

    if( keys.length < N_COST_MODEL_PLUTUS_V3 )
    {
        // CostModelPlutusV3Array ( chang )
        return costModelChangV3Keys.every( k => {
            const val = something[k];
            return val !== undefined && canBeInteger( val ) 
        });
    }

    return (
        // CostModelPlutusV3
        costModelV3Keys.every( k => {
            const val = something[k];
            return val !== undefined && canBeInteger( val ) 
        })
    );
}