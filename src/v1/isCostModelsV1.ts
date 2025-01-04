import { canBeInteger } from "../utils/ints";
import { AnyV1CostModel } from "./AnyV1CostModel";
import { costModelV1Keys } from "./costModelV1Keys";
import { N_COST_MODEL_PLUTUS_V1 } from "./N_COST_MODEL_PLUTUS_V1";

export function isCostModelsV1( something: any ): something is AnyV1CostModel
{
    if(!( typeof something === "object" && something !== null )) return false;

    return (
        Array.isArray( something ) ?

        // CostModelPlutusV1Array
        something.length >= N_COST_MODEL_PLUTUS_V1 && something.every( canBeInteger ) :

        // CostModelPlutusV1
        costModelV1Keys.every( k => {
            const val = something[k];
            return val !== undefined && canBeInteger( val ) 
        })
    );
}