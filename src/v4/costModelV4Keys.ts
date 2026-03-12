import { CostModelPlutusV4 } from "./CostModelPlutusV4";
import { defaultV4Costs } from "./defaultV4Costs";
import { N_COST_MODEL_PLUTUS_V4, N_COST_MODEL_PLUTUS_V4_ONLY } from "./N_COST_MODEL_PLUTUS_V4";
import { N_COST_MODEL_PLUTUS_V3 } from "../v3/N_COST_MODEL_PLUTUS_V3";

export const costModelV4Keys: (keyof CostModelPlutusV4)[] = Object.freeze( Object.keys( defaultV4Costs ) ) as any;
export const costModelV4OnlyKeys: (keyof CostModelPlutusV4)[] = Object.freeze( costModelV4Keys.slice( N_COST_MODEL_PLUTUS_V3 ) ) as any;
