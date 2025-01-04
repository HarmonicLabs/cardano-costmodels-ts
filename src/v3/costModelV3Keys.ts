import { CostModelPlutusV3 } from "./CostModelPlutusV3";
import { defaultV3Costs } from "./defaultV3Costs";
import { N_COST_MODEL_PLUTUS_V3_CHANG_1 } from "./N_COST_MODEL_PLUTUS_V3";

export const costModelV3Keys: (keyof CostModelPlutusV3)[] = Object.freeze( Object.keys( defaultV3Costs ) ) as any;
export const costModelChangV3Keys: (keyof CostModelPlutusV3)[] = Object.freeze( costModelV3Keys.slice( 0, N_COST_MODEL_PLUTUS_V3_CHANG_1 ) ) as any;