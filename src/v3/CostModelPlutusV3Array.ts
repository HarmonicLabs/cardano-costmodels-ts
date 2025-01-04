import { CanBeUInteger } from "../utils/ints";
import { N_COST_MODEL_PLUTUS_V3 } from "./N_COST_MODEL_PLUTUS_V3";

export type CostModelPlutusV3Array = CanBeUInteger[] & { length: typeof N_COST_MODEL_PLUTUS_V3 };