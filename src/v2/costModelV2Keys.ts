import { CostModelPlutusV2 } from "./CostModelPlutusV2";
import { defaultV2Costs } from "./defaultV2Costs";

export const costModelV2Keys: (keyof CostModelPlutusV2)[] = Object.freeze( Object.keys( defaultV2Costs ) ) as any;