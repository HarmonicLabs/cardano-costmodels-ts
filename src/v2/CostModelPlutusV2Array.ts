import { CanBeUInteger } from "../utils/ints";
import { N_COST_MODEL_PLUTUS_V2 } from "./N_COST_MODEL_PLUTUS_V2";

export type CostModelPlutusV2Array = CanBeUInteger[] & { length: typeof N_COST_MODEL_PLUTUS_V2 };