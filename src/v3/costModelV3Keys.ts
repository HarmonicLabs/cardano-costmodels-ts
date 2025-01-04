import { CostModelPlutusV3 } from "./CostModelPlutusV3";
import { defaultV3Costs } from "./defaultV3Costs";

export const costModelV3Keys: (keyof CostModelPlutusV3)[] = Object.freeze( Object.keys( defaultV3Costs ) ) as any;