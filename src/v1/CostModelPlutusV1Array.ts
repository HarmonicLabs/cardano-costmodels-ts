import { CanBeUInteger } from "../utils/ints";
import { N_COST_MODEL_PLUTUS_V1 } from "./N_COST_MODEL_PLUTUS_V1";

export type CostModelPlutusV1Array = CanBeUInteger[] & { length: typeof N_COST_MODEL_PLUTUS_V1 };