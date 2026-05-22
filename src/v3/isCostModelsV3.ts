import { canBeInteger } from "../utils/ints";
import { AnyV3CostModel } from "./AnyV3CostModel";
import { costModelChangV3Keys, costModelV3Keys } from "./costModelV3Keys";
import { N_COST_MODEL_PLUTUS_V3, N_COST_MODEL_PLUTUS_V3_CHANG_1, N_COST_MODEL_PLUTUS_V3_CHANG_2 } from "./N_COST_MODEL_PLUTUS_V3";

export function isCostModelsV3( something: any ): something is AnyV3CostModel
{
    if(!( typeof something === "object" && something !== null )) return false;

    if( Array.isArray( something ) )
    {
        // Accept any array of canBeInteger entries at or above the Chang-1 floor.
        // Length up to N_COST_MODEL_PLUTUS_V3 (350) is the current chain shape;
        // older 297 (Chang-2) and 251 (Chang-1) lengths are still recognized.
        return something.length >= N_COST_MODEL_PLUTUS_V3_CHANG_1 && something.every( canBeInteger );
    }

    const keys = Object.keys( something );
    if( keys.length < N_COST_MODEL_PLUTUS_V3_CHANG_1 ) return false;

    // Each higher tier is a strict prefix-extension of the lower one (keys
    // appended at the end, never reordered within the prior range), so slicing
    // the full key list yields the canonical name set for each tier.
    const tierKeys: (keyof AnyV3CostModel)[] =
        keys.length >= N_COST_MODEL_PLUTUS_V3 ? costModelV3Keys :
        keys.length >= N_COST_MODEL_PLUTUS_V3_CHANG_2 ? (costModelV3Keys.slice( 0, N_COST_MODEL_PLUTUS_V3_CHANG_2 ) as any) :
        costModelChangV3Keys;

    return tierKeys.every( k => {
        const val = (something as any)[k];
        return val !== undefined && canBeInteger( val );
    });
}
