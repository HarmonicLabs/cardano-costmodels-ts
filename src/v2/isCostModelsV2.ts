import { canBeInteger } from "../utils/ints";
import { AnyV2CostModel } from "./AnyV2CostModel";
import { costModelV2Keys } from "./costModelV2Keys";
import { N_COST_MODEL_PLUTUS_V2 } from "./N_COST_MODEL_PLUTUS_V2";

export function isCostModelsV2( something: any ): something is AnyV2CostModel
{
    if(!( typeof something === "object" && something !== null )) return false;

    return (
        Array.isArray( something ) ?

        // CostModelPlutusV2Array
        something.length >= N_COST_MODEL_PLUTUS_V2 && something.every( canBeInteger ) :

        // CostModelPlutusV2
        costModelV2Keys.every( k => {
            const val = something[k];
            return val !== undefined && canBeInteger( val ) 
        })
    )
}