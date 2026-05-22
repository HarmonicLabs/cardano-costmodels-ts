/**
 * @deprecated The V4 namespace is reserved for a *future* on-chain Plutus V4
 * language version (language-view wire tag `CborUInt(3)`). Cardano has not
 * adopted such a language version yet. The Plomin² governance update extended
 * V3's cost model from 297 → 350 entries — that update lives in {@link "../v3"},
 * and is the shape the chain currently emits as PlutusV3 (wire tag `CborUInt(2)`).
 *
 * Using this V4 namespace today produces a `script_data_hash` the chain does
 * not compute against, which will fail phase-1 validation with
 * `PPViewHashesDontMatch`. Use the v3 exports instead.
 *
 * Files retained for reference and to make reintroduction straightforward
 * once the chain actually bumps to V4 language. **Do not import.**
 */
export * from "./AnyV4CostModel";
export * from "./CostModelPlutusV4";
export * from "./CostModelPlutusV4Array";
export * from "./N_COST_MODEL_PLUTUS_V4";
export * from "./costModelV3ToFakeV4";
export * from "./costModelV4Keys";
export * from "./defaultV4Costs";
export * from "./isCostModelsV4";
export * from "./newV4Keys";
export * from "./toCostModelArrV4";
export * from "./toCostModelV4";
