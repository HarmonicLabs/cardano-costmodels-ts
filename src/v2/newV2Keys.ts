import { costModelV1Keys } from "../v1/costModelV1Keys";
import { CostModelPlutusV2 } from "./CostModelPlutusV2";
import { costModelV2Keys } from "./costModelV2Keys";

export const newV2Keys: (keyof CostModelPlutusV2)[] = Object.freeze(
    costModelV2Keys
    .filter( k => !costModelV1Keys.includes( k as any ) )
) as any;