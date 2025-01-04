import { AnyV1CostModel } from "../v1/AnyV1CostModel";
import { toCostModelV1 } from "../v1/toCostModelV1";
import { costModelV1ToFakeV2 } from "../v2";
import { CostModelPlutusV3 } from "./CostModelPlutusV3";
import { costModelV2ToFakeV3 } from "./costModelV2ToFakeV3";

export function costModelV1ToFakeV3( costmdlsV1: AnyV1CostModel ): CostModelPlutusV3
{
    const costs = toCostModelV1( costmdlsV1 );
    return costModelV2ToFakeV3( costModelV1ToFakeV2( costs ) );
}