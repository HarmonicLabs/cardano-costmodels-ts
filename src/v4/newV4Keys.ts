import { costModelV3Keys } from "../v3/costModelV3Keys";
import { CostModelPlutusV4 } from "./CostModelPlutusV4";
import { costModelV4Keys } from "./costModelV4Keys";

export const newV4Keys: (keyof CostModelPlutusV4)[] = Object.freeze(
    costModelV4Keys
    .filter( k => !costModelV3Keys.includes( k as any ) )
) as any;
