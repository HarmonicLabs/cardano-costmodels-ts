import { isArrayish, forceArrayish } from "../utils/isArrayish";
import { canBeInteger } from "../utils/ints";
import { AnyV4CostModel } from "./AnyV4CostModel";
import { CostModelPlutusV4 } from "./CostModelPlutusV4";
import { costModelV4Keys } from "./costModelV4Keys";
import { defaultV4Costs } from "./defaultV4Costs";
import { N_COST_MODEL_PLUTUS_V4 } from "./N_COST_MODEL_PLUTUS_V4";
import { N_COST_MODEL_PLUTUS_V3 } from "../v3/N_COST_MODEL_PLUTUS_V3";
import { toCostModelArrV4 } from "./toCostModelArrV4";

export function toCostModelV4( v4: AnyV4CostModel ): CostModelPlutusV4
{
    if( isArrayish( v4 ) ) v4 = forceArrayish( v4 ) as any;
    if( !Array.isArray( v4 ) ) return {
        ...defaultV4Costs,
        ...v4
    };

    const result = { ...defaultV4Costs } as CostModelPlutusV4;

    if( v4.length < N_COST_MODEL_PLUTUS_V3 )
    throw new Error(
        "impossible to convert cost model v4 array to object; not enough arguments; arguments found in total: "
        + v4.length.toString()
    );

    if( v4.length < N_COST_MODEL_PLUTUS_V4 ) v4 = toCostModelArrV4( v4 );

    for( let i = 0; i < N_COST_MODEL_PLUTUS_V4; i++ )
    {
        const value = v4[i];
        result[costModelV4Keys[i]] = Number(
            canBeInteger( value ) ? value :
            defaultV4Costs[costModelV4Keys[i]]
        );
    }

    return result;
}
