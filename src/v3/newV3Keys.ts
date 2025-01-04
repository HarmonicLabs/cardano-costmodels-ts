import { costModelV2Keys } from "../v2";
import { CostModelPlutusV3 } from "./CostModelPlutusV3";
import { costModelV3Keys } from "./costModelV3Keys";

export const newV3Keys: (keyof CostModelPlutusV3)[] = Object.freeze(
    costModelV3Keys
    .filter( k => !costModelV2Keys.includes( k as any ) )
) as any;