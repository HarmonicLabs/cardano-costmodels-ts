import { AnyV3CostModel, toCostModelV3 } from "../v3";
import { CostModelPlutusV4 } from "./CostModelPlutusV4";
import { defaultV4Costs } from "./defaultV4Costs";
import { newV4Keys } from "./newV4Keys";

/**
 * Converts a V3 cost model to a "fake" V4 by filling new V4 keys with defaults.
 * Useful when running V4 scripts with only V3 protocol parameters available.
 */
export function costModelV3ToFakeV4( costmdlsV3: AnyV3CostModel ): CostModelPlutusV4
{
    const v3 = toCostModelV3( costmdlsV3 );
    const result = { ...defaultV4Costs, ...v3 } as CostModelPlutusV4;

    // Ensure V4-only keys are present (use defaults if missing)
    for( const key of newV4Keys )
    {
        if( (result as any)[key] === undefined )
            (result as any)[key] = defaultV4Costs[key];
    }

    return result;
}
