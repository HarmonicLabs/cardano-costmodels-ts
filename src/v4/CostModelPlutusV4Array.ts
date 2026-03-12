import { CanBeUInteger } from "../utils/ints";
import { N_COST_MODEL_PLUTUS_V4 } from "./N_COST_MODEL_PLUTUS_V4";

export type CostModelPlutusV4Array = CanBeUInteger[] & { length: typeof N_COST_MODEL_PLUTUS_V4 };
