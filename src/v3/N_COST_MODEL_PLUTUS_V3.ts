// Current V3 cost-model cardinality on chain (preprod, post-Plomin² governance,
// epoch 289 boundary 2026-05-16). Bump when governance extends the cost model.
export const N_COST_MODEL_PLUTUS_V3 = 350 as const;
// Frozen pre-Plomin² V3 (Chang-2 baseline). Kept for backward-compat acceptance
// by isCostModelsV3 — older artifacts may still carry 297-entry cost models.
export const N_COST_MODEL_PLUTUS_V3_CHANG_2 = 297 as const;
// Original Chang-1 V3 baseline.
export const N_COST_MODEL_PLUTUS_V3_CHANG_1 = 251 as const;
