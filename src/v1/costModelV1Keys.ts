import { CostModelPlutusV1 } from "./CostModelPlutusV1";
import { defaultV1Costs } from "./defaultV1Costs";

export const costModelV1Keys: (keyof CostModelPlutusV1)[] = Object.freeze( Object.keys( defaultV1Costs ) ) as any; 