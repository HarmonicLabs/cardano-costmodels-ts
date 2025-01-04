import { canBeInteger } from "../utils/ints";
import { AnyV3CostModel } from "./AnyV3CostModel";
import { costModelV3Keys } from "./costModelV3Keys";
import { N_COST_MODEL_PLUTUS_V3 } from "./N_COST_MODEL_PLUTUS_V3";

export function isCostModelsV3( something: any ): something is AnyV3CostModel
{
    if(!( typeof something === "object" && something !== null )) return false;

    return (
        Array.isArray( something ) ?

        // CostModelPlutusV3Array
        something.length >= N_COST_MODEL_PLUTUS_V3 && something.every( canBeInteger ) :

        // CostModelPlutusV3
        costModelV3Keys.every( k => {
            const val = something[k];
            return val !== undefined && canBeInteger( val ) 
        })
    );
}