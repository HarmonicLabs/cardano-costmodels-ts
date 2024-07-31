
// https://github.com/IntersectMBO/plutus/blob/ffe41b864ea018e188ab9e0295cf6ad7e180844a/plutus-ledger-api/src/PlutusLedgerApi/V3/ParamName.hs#L17
let haskellNames =
`AddInteger'cpu'arguments'intercept
  | AddInteger'cpu'arguments'slope
  | AddInteger'memory'arguments'intercept
  | AddInteger'memory'arguments'slope
  | AppendByteString'cpu'arguments'intercept
  | AppendByteString'cpu'arguments'slope
  | AppendByteString'memory'arguments'intercept
  | AppendByteString'memory'arguments'slope
  | AppendString'cpu'arguments'intercept
  | AppendString'cpu'arguments'slope
  | AppendString'memory'arguments'intercept
  | AppendString'memory'arguments'slope
  | BData'cpu'arguments
  | BData'memory'arguments
  | Blake2b_256'cpu'arguments'intercept
  | Blake2b_256'cpu'arguments'slope
  | Blake2b_256'memory'arguments
  | CekApplyCost'exBudgetCPU
  | CekApplyCost'exBudgetMemory
  | CekBuiltinCost'exBudgetCPU
  | CekBuiltinCost'exBudgetMemory
  | CekConstCost'exBudgetCPU
  | CekConstCost'exBudgetMemory
  | CekDelayCost'exBudgetCPU
  | CekDelayCost'exBudgetMemory
  | CekForceCost'exBudgetCPU
  | CekForceCost'exBudgetMemory
  | CekLamCost'exBudgetCPU
  | CekLamCost'exBudgetMemory
  | CekStartupCost'exBudgetCPU
  | CekStartupCost'exBudgetMemory
  | CekVarCost'exBudgetCPU
  | CekVarCost'exBudgetMemory
  | ChooseData'cpu'arguments
  | ChooseData'memory'arguments
  | ChooseList'cpu'arguments
  | ChooseList'memory'arguments
  | ChooseUnit'cpu'arguments
  | ChooseUnit'memory'arguments
  | ConsByteString'cpu'arguments'intercept
  | ConsByteString'cpu'arguments'slope
  | ConsByteString'memory'arguments'intercept
  | ConsByteString'memory'arguments'slope
  | ConstrData'cpu'arguments
  | ConstrData'memory'arguments
  | DecodeUtf8'cpu'arguments'intercept
  | DecodeUtf8'cpu'arguments'slope
  | DecodeUtf8'memory'arguments'intercept
  | DecodeUtf8'memory'arguments'slope
  | DivideInteger'cpu'arguments'constant
  | DivideInteger'cpu'arguments'model'arguments'c00
  | DivideInteger'cpu'arguments'model'arguments'c01
  | DivideInteger'cpu'arguments'model'arguments'c02
  | DivideInteger'cpu'arguments'model'arguments'c10
  | DivideInteger'cpu'arguments'model'arguments'c11
  | DivideInteger'cpu'arguments'model'arguments'c20
  | DivideInteger'cpu'arguments'model'arguments'minimum
  | DivideInteger'memory'arguments'intercept
  | DivideInteger'memory'arguments'minimum
  | DivideInteger'memory'arguments'slope
  | EncodeUtf8'cpu'arguments'intercept
  | EncodeUtf8'cpu'arguments'slope
  | EncodeUtf8'memory'arguments'intercept
  | EncodeUtf8'memory'arguments'slope
  | EqualsByteString'cpu'arguments'constant
  | EqualsByteString'cpu'arguments'intercept
  | EqualsByteString'cpu'arguments'slope
  | EqualsByteString'memory'arguments
  | EqualsData'cpu'arguments'intercept
  | EqualsData'cpu'arguments'slope
  | EqualsData'memory'arguments
  | EqualsInteger'cpu'arguments'intercept
  | EqualsInteger'cpu'arguments'slope
  | EqualsInteger'memory'arguments
  | EqualsString'cpu'arguments'constant
  | EqualsString'cpu'arguments'intercept
  | EqualsString'cpu'arguments'slope
  | EqualsString'memory'arguments
  | FstPair'cpu'arguments
  | FstPair'memory'arguments
  | HeadList'cpu'arguments
  | HeadList'memory'arguments
  | IData'cpu'arguments
  | IData'memory'arguments
  | IfThenElse'cpu'arguments
  | IfThenElse'memory'arguments
  | IndexByteString'cpu'arguments
  | IndexByteString'memory'arguments
  | LengthOfByteString'cpu'arguments
  | LengthOfByteString'memory'arguments
  | LessThanByteString'cpu'arguments'intercept
  | LessThanByteString'cpu'arguments'slope
  | LessThanByteString'memory'arguments
  | LessThanEqualsByteString'cpu'arguments'intercept
  | LessThanEqualsByteString'cpu'arguments'slope
  | LessThanEqualsByteString'memory'arguments
  | LessThanEqualsInteger'cpu'arguments'intercept
  | LessThanEqualsInteger'cpu'arguments'slope
  | LessThanEqualsInteger'memory'arguments
  | LessThanInteger'cpu'arguments'intercept
  | LessThanInteger'cpu'arguments'slope
  | LessThanInteger'memory'arguments
  | ListData'cpu'arguments
  | ListData'memory'arguments
  | MapData'cpu'arguments
  | MapData'memory'arguments
  | MkCons'cpu'arguments
  | MkCons'memory'arguments
  | MkNilData'cpu'arguments
  | MkNilData'memory'arguments
  | MkNilPairData'cpu'arguments
  | MkNilPairData'memory'arguments
  | MkPairData'cpu'arguments
  | MkPairData'memory'arguments
  | ModInteger'cpu'arguments'constant
  | ModInteger'cpu'arguments'model'arguments'c00
  | ModInteger'cpu'arguments'model'arguments'c01
  | ModInteger'cpu'arguments'model'arguments'c02
  | ModInteger'cpu'arguments'model'arguments'c10
  | ModInteger'cpu'arguments'model'arguments'c11
  | ModInteger'cpu'arguments'model'arguments'c20
  | ModInteger'cpu'arguments'model'arguments'minimum
  | ModInteger'memory'arguments'intercept
  | ModInteger'memory'arguments'slope
  | MultiplyInteger'cpu'arguments'intercept
  | MultiplyInteger'cpu'arguments'slope
  | MultiplyInteger'memory'arguments'intercept
  | MultiplyInteger'memory'arguments'slope
  | NullList'cpu'arguments
  | NullList'memory'arguments
  | QuotientInteger'cpu'arguments'constant
  | QuotientInteger'cpu'arguments'model'arguments'c00
  | QuotientInteger'cpu'arguments'model'arguments'c01
  | QuotientInteger'cpu'arguments'model'arguments'c02
  | QuotientInteger'cpu'arguments'model'arguments'c10
  | QuotientInteger'cpu'arguments'model'arguments'c11
  | QuotientInteger'cpu'arguments'model'arguments'c20
  | QuotientInteger'cpu'arguments'model'arguments'minimum
  | QuotientInteger'memory'arguments'intercept
  | QuotientInteger'memory'arguments'minimum
  | QuotientInteger'memory'arguments'slope
  | RemainderInteger'cpu'arguments'constant
  | RemainderInteger'cpu'arguments'model'arguments'c00
  | RemainderInteger'cpu'arguments'model'arguments'c01
  | RemainderInteger'cpu'arguments'model'arguments'c02
  | RemainderInteger'cpu'arguments'model'arguments'c10
  | RemainderInteger'cpu'arguments'model'arguments'c11
  | RemainderInteger'cpu'arguments'model'arguments'c20
  | RemainderInteger'cpu'arguments'model'arguments'minimum
  | RemainderInteger'memory'arguments'intercept
  | RemainderInteger'memory'arguments'slope
  | SerialiseData'cpu'arguments'intercept
  | SerialiseData'cpu'arguments'slope
  | SerialiseData'memory'arguments'intercept
  | SerialiseData'memory'arguments'slope
  | Sha2_256'cpu'arguments'intercept
  | Sha2_256'cpu'arguments'slope
  | Sha2_256'memory'arguments
  | Sha3_256'cpu'arguments'intercept
  | Sha3_256'cpu'arguments'slope
  | Sha3_256'memory'arguments
  | SliceByteString'cpu'arguments'intercept
  | SliceByteString'cpu'arguments'slope
  | SliceByteString'memory'arguments'intercept
  | SliceByteString'memory'arguments'slope
  | SndPair'cpu'arguments
  | SndPair'memory'arguments
  | SubtractInteger'cpu'arguments'intercept
  | SubtractInteger'cpu'arguments'slope
  | SubtractInteger'memory'arguments'intercept
  | SubtractInteger'memory'arguments'slope
  | TailList'cpu'arguments
  | TailList'memory'arguments
  | Trace'cpu'arguments
  | Trace'memory'arguments
  | UnBData'cpu'arguments
  | UnBData'memory'arguments
  | UnConstrData'cpu'arguments
  | UnConstrData'memory'arguments
  | UnIData'cpu'arguments
  | UnIData'memory'arguments
  | UnListData'cpu'arguments
  | UnListData'memory'arguments
  | UnMapData'cpu'arguments
  | UnMapData'memory'arguments
  | VerifyEcdsaSecp256k1Signature'cpu'arguments
  | VerifyEcdsaSecp256k1Signature'memory'arguments
  | VerifyEd25519Signature'cpu'arguments'intercept
  | VerifyEd25519Signature'cpu'arguments'slope
  | VerifyEd25519Signature'memory'arguments
  | VerifySchnorrSecp256k1Signature'cpu'arguments'intercept
  | VerifySchnorrSecp256k1Signature'cpu'arguments'slope
  | VerifySchnorrSecp256k1Signature'memory'arguments
  | CekConstrCost'exBudgetCPU
  | CekConstrCost'exBudgetMemory
  | CekCaseCost'exBudgetCPU
  | CekCaseCost'exBudgetMemory
  | Bls12_381_G1_add'cpu'arguments
  | Bls12_381_G1_add'memory'arguments
  | Bls12_381_G1_compress'cpu'arguments
  | Bls12_381_G1_compress'memory'arguments
  | Bls12_381_G1_equal'cpu'arguments
  | Bls12_381_G1_equal'memory'arguments
  | Bls12_381_G1_hashToGroup'cpu'arguments'intercept
  | Bls12_381_G1_hashToGroup'cpu'arguments'slope
  | Bls12_381_G1_hashToGroup'memory'arguments
  | Bls12_381_G1_neg'cpu'arguments
  | Bls12_381_G1_neg'memory'arguments
  | Bls12_381_G1_scalarMul'cpu'arguments'intercept
  | Bls12_381_G1_scalarMul'cpu'arguments'slope
  | Bls12_381_G1_scalarMul'memory'arguments
  | Bls12_381_G1_uncompress'cpu'arguments
  | Bls12_381_G1_uncompress'memory'arguments
  | Bls12_381_G2_add'cpu'arguments
  | Bls12_381_G2_add'memory'arguments
  | Bls12_381_G2_compress'cpu'arguments
  | Bls12_381_G2_compress'memory'arguments
  | Bls12_381_G2_equal'cpu'arguments
  | Bls12_381_G2_equal'memory'arguments
  | Bls12_381_G2_hashToGroup'cpu'arguments'intercept
  | Bls12_381_G2_hashToGroup'cpu'arguments'slope
  | Bls12_381_G2_hashToGroup'memory'arguments
  | Bls12_381_G2_neg'cpu'arguments
  | Bls12_381_G2_neg'memory'arguments
  | Bls12_381_G2_scalarMul'cpu'arguments'intercept
  | Bls12_381_G2_scalarMul'cpu'arguments'slope
  | Bls12_381_G2_scalarMul'memory'arguments
  | Bls12_381_G2_uncompress'cpu'arguments
  | Bls12_381_G2_uncompress'memory'arguments
  | Bls12_381_finalVerify'cpu'arguments
  | Bls12_381_finalVerify'memory'arguments
  | Bls12_381_millerLoop'cpu'arguments
  | Bls12_381_millerLoop'memory'arguments
  | Bls12_381_mulMlResult'cpu'arguments
  | Bls12_381_mulMlResult'memory'arguments
  | Keccak_256'cpu'arguments'intercept
  | Keccak_256'cpu'arguments'slope
  | Keccak_256'memory'arguments
  | Blake2b_224'cpu'arguments'intercept
  | Blake2b_224'cpu'arguments'slope
  | Blake2b_224'memory'arguments
  | IntegerToByteString'cpu'arguments'c0
  | IntegerToByteString'cpu'arguments'c1
  | IntegerToByteString'cpu'arguments'c2
  | IntegerToByteString'memory'arguments'intercept
  | IntegerToByteString'memory'arguments'slope
  | ByteStringToInteger'cpu'arguments'c0
  | ByteStringToInteger'cpu'arguments'c1
  | ByteStringToInteger'cpu'arguments'c2
  | ByteStringToInteger'memory'arguments'intercept
  | ByteStringToInteger'memory'arguments'slope`
  .replace(/'/g, "-")
  .split("|");

haskellNames = haskellNames.map( n => n.trim() );
haskellNames = haskellNames.map( n => n[0].toLowerCase() + n.slice(1) );

function CostModelDef( v = 3, indent = 4 )
{
    const def = `export interface CostModelPlutusV` + v.toString() + " ";

    let interf = {};

    for( const n of haskellNames )
    {
        interf[n] = "CanBeUInteger";
    }

    const interfStr = JSON.stringify( interf, undefined, indent )
    .replace(/"CanBeUInteger"/g, "CanBeUInteger");

    return def + interfStr
}

function toCostArr( v = 3, indent_n = 4 )
{
    const indent = " ".repeat( indent_n );
    const init =
`export function toCostModelArrV${v}( v${v}: AnyV${v}CostModel ): CostModelPlutusV${v}Array
{
${indent}if( Array.isArray( v${v} ) ) return v${v};

${indent}return Object.freeze(`;

    const arr =`[\n${indent}${indent}` +
    haskellNames
    .map( n => `v${v}["${n}"],`)
    .join(`\n${indent}${indent}`) +
    `${indent}]`;

    return init + arr + ");\n}";
}

export const defaultV3Costs = Object.freeze({
    "addInteger-cpu-arguments-intercept": 100788,
    "addInteger-cpu-arguments-slope": 420,
    "addInteger-memory-arguments-intercept": 1,
    "addInteger-memory-arguments-slope": 1,
    "appendByteString-cpu-arguments-intercept": 1000,
    "appendByteString-cpu-arguments-slope": 173,
    "appendByteString-memory-arguments-intercept": 0,
    "appendByteString-memory-arguments-slope": 1,
    "appendString-cpu-arguments-intercept": 1000,
    "appendString-cpu-arguments-slope": 59957,
    "appendString-memory-arguments-intercept": 4,
    "appendString-memory-arguments-slope": 1,
    "bData-cpu-arguments": 11183,
    "bData-memory-arguments": 32,
    "blake2b_224-cpu-arguments-intercept": 201305,
    "blake2b_224-cpu-arguments-slope": 8356,
    "blake2b_224-memory-arguments": 4,
    "blake2b_256-cpu-arguments-intercept": 201305,
    "blake2b_256-cpu-arguments-slope": 8356,
    "blake2b_256-memory-arguments": 4,
    "cekVarCost-exBudgetCPU": 16000,
    "cekVarCost-exBudgetMemory": 100,
    "cekConstCost-exBudgetCPU": 16000,
    "cekConstCost-exBudgetMemory": 100,
    "cekLamCost-exBudgetCPU": 16000,
    "cekLamCost-exBudgetMemory": 100,
    "cekDelayCost-exBudgetCPU": 16000,
    "cekDelayCost-exBudgetMemory": 100,
    "cekForceCost-exBudgetCPU": 16000,
    "cekForceCost-exBudgetMemory": 100,
    "cekApplyCost-exBudgetCPU": 16000,
    "cekApplyCost-exBudgetMemory": 100,
    "cekBuiltinCost-exBudgetCPU": 16000,
    "cekBuiltinCost-exBudgetMemory": 100,
    "cekConstrCost-exBudgetCPU": 16000,
    "cekConstrCost-exBudgetMemory": 100,
    "cekStartupCost-exBudgetCPU": 100,
    "cekStartupCost-exBudgetMemory": 100,
    "cekCaseCost-exBudgetCPU": 16000,
    "cekCaseCost-exBudgetMemory": 100,
    "bls12_381_G1_add-cpu-arguments": 962335 ,
    "bls12_381_G1_add-memory-arguments": 18,
    "bls12_381_G1_compress-cpu-arguments": 2780678,
    "bls12_381_G1_compress-memory-arguments": 6,
    "bls12_381_G1_equal-cpu-arguments": 442008,
    "bls12_381_G1_equal-memory-arguments": 1,
    "bls12_381_G1_hashToGroup-cpu-arguments-intercept": 52538055,
    "bls12_381_G1_hashToGroup-cpu-arguments-slope": 3756,
    "bls12_381_G1_hashToGroup-memory-arguments": 18,
    "bls12_381_G1_neg-cpu-arguments": 267929,
    "bls12_381_G1_neg-memory-arguments": 18,
    "bls12_381_G1_scalarMul-cpu-arguments-intercept": 76433006,
    "bls12_381_G1_scalarMul-cpu-arguments-slope": 8868,
    "bls12_381_G1_scalarMul-memory-arguments": 18,
    "bls12_381_G1_uncompress-cpu-arguments": 52948122,
    "bls12_381_G1_uncompress-memory-arguments": 18,
    "bls12_381_G2_add-cpu-arguments": 1995836,
    "bls12_381_G2_add-memory-arguments": 36,
    "bls12_381_G2_compress-cpu-arguments": 3227919,
    "bls12_381_G2_compress-memory-arguments": 12,
    "bls12_381_G2_equal-cpu-arguments": 901022,
    "bls12_381_G2_equal-memory-arguments": 1,
    "bls12_381_G2_hashToGroup-cpu-arguments-intercept": 166917843,
    "bls12_381_G2_hashToGroup-cpu-arguments-slope": 4307,
    "bls12_381_G2_hashToGroup-memory-arguments": 36,
    "bls12_381_G2_neg-cpu-arguments": 284546,
    "bls12_381_G2_neg-memory-arguments": 36,
    "bls12_381_G2_scalarMul-cpu-arguments-intercept": 158221314,
    "bls12_381_G2_scalarMul-cpu-arguments-slope": 26549,
    "bls12_381_G2_scalarMul-memory-arguments": 36,
    "bls12_381_G2_uncompress-cpu-arguments": 74698472,
    "bls12_381_G2_uncompress-memory-arguments": 36,
    "bls12_381_finalVerify-cpu-arguments": 333849714,
    "bls12_381_finalVerify-memory-arguments": 1,
    "bls12_381_millerLoop-cpu-arguments": 254006273,
    "bls12_381_millerLoop-memory-arguments": 72,
    "bls12_381_mulMlResult-cpu-arguments": 2174038,
    "bls12_381_mulMlResult-memory-arguments": 72,
    "byteStringToInteger-cpu-arguments-c0": 1006041,
    "byteStringToInteger-cpu-arguments-c1": 43623,
    "byteStringToInteger-cpu-arguments-c2": 251,
    "byteStringToInteger-memory-arguments-intercept": 0,
    "byteStringToInteger-memory-arguments-slope": 1,
    "chooseData-cpu-arguments": 94375,
    "chooseData-memory-arguments": 32,
    "chooseList-cpu-arguments": 132994,
    "chooseList-memory-arguments": 32,
    "chooseUnit-cpu-arguments": 61462,
    "chooseUnit-memory-arguments": 4,
    "consByteString-cpu-arguments-intercept": 72010,
    "consByteString-cpu-arguments-slope": 178,
    "consByteString-memory-arguments-intercept": 0,
    "consByteString-memory-arguments-slope": 1,
    "constrData-cpu-arguments": 22151,
    "constrData-memory-arguments": 32,
    "decodeUtf8-cpu-arguments-intercept": 91189,
    "decodeUtf8-cpu-arguments-slope": 769,
    "decodeUtf8-memory-arguments-intercept": 4,
    "decodeUtf8-memory-arguments-slope": 2,
    "divideInteger-cpu-arguments-constant": 85848,
    "divideInteger-cpu-arguments-model-arguments-c00": 123203,
    "divideInteger-cpu-arguments-model-arguments-c01": 7305,
    "divideInteger-cpu-arguments-model-arguments-c02": -900,
    "divideInteger-cpu-arguments-model-arguments-c10": 1716,
    "divideInteger-cpu-arguments-model-arguments-c11": 549,
    "divideInteger-cpu-arguments-model-arguments-c20": 57,
    "divideInteger-cpu-arguments-model-arguments-minimum": 453240,
    "divideInteger-memory-arguments-intercept": 0,
    "divideInteger-memory-arguments-minimum": 1,
    "divideInteger-memory-arguments-slope": 1,
    "encodeUtf8-cpu-arguments-intercept": 1000,
    "encodeUtf8-cpu-arguments-slope": 42921,
    "encodeUtf8-memory-arguments-intercept": 4,
    "encodeUtf8-memory-arguments-slope": 2,
    "equalsByteString-cpu-arguments-constant": 24548,
    "equalsByteString-cpu-arguments-intercept": 29498,
    "equalsByteString-cpu-arguments-slope": 38,
    "equalsByteString-memory-arguments": 1,
    "equalsData-cpu-arguments-intercept": 898148,
    "equalsData-cpu-arguments-slope": 27279,
    "equalsData-memory-arguments": 1,
    "equalsInteger-cpu-arguments-intercept": 51775,
    "equalsInteger-cpu-arguments-slope": 558,
    "equalsInteger-memory-arguments": 1,
    "equalsString-cpu-arguments-constant": 39184,
    "equalsString-cpu-arguments-intercept": 1000,
    "equalsString-cpu-arguments-slope": 60594,
    "equalsString-memory-arguments": 1,
    "fstPair-cpu-arguments": 141895,
    "fstPair-memory-arguments": 32,
    "headList-cpu-arguments": 83150,
    "headList-memory-arguments": 32,
    "iData-cpu-arguments": 15299,
    "iData-memory-arguments": 32,
    "ifThenElse-cpu-arguments": 76049,
    "ifThenElse-memory-arguments": 1,
    "indexByteString-cpu-arguments": 13169,
    "indexByteString-memory-arguments": 4,
    "integerToByteString-cpu-arguments-c0": 1293828,
    "integerToByteString-cpu-arguments-c1": 28716,
    "integerToByteString-cpu-arguments-c2": 63,
    "integerToByteString-memory-arguments-intercept": 0,
    "integerToByteString-memory-arguments-slope": 1,
    "keccak_256-cpu-arguments-intercept": 2261318,
    "keccak_256-cpu-arguments-slope": 64571,
    "keccak_256-memory-arguments": 4,
    "lengthOfByteString-cpu-arguments": 22100,
    "lengthOfByteString-memory-arguments": 10,
    "lessThanByteString-cpu-arguments-intercept": 28999,
    "lessThanByteString-cpu-arguments-slope": 74,
    "lessThanByteString-memory-arguments": 1,
    "lessThanEqualsByteString-cpu-arguments-intercept": 28999,
    "lessThanEqualsByteString-cpu-arguments-slope": 74,
    "lessThanEqualsByteString-memory-arguments": 1,
    "lessThanEqualsInteger-cpu-arguments-intercept": 43285,
    "lessThanEqualsInteger-cpu-arguments-slope": 552,
    "lessThanEqualsInteger-memory-arguments": 1,
    "lessThanInteger-cpu-arguments-intercept": 44749,
    "lessThanInteger-cpu-arguments-slope": 541,
    "lessThanInteger-memory-arguments": 1,
    "listData-cpu-arguments": 33852,
    "listData-memory-arguments": 32,
    "mapData-cpu-arguments": 68246,
    "mapData-memory-arguments": 32,
    "mkCons-cpu-arguments": 72362,
    "mkCons-memory-arguments": 32,
    "mkNilData-cpu-arguments": 7243,
    "mkNilData-memory-arguments": 32,
    "mkNilPairData-cpu-arguments": 7391,
    "mkNilPairData-memory-arguments": 32,
    "mkPairData-cpu-arguments": 11546,
    "mkPairData-memory-arguments": 32,
    "modInteger-cpu-arguments-constant": 85848,
    "modInteger-cpu-arguments-model-arguments-c00": 123203,
    "modInteger-cpu-arguments-model-arguments-c01": 7305,
    "modInteger-cpu-arguments-model-arguments-c02": -900,
    "modInteger-cpu-arguments-model-arguments-c10": 1716,
    "modInteger-cpu-arguments-model-arguments-c11": 549,
    "modInteger-cpu-arguments-model-arguments-c20": 57,
    "modInteger-cpu-arguments-model-arguments-minimum": 85848,
    "modInteger-memory-arguments-intercept": 0,
    "modInteger-memory-arguments-slope": 1,
    "multiplyInteger-cpu-arguments-intercept": 90434,
    "multiplyInteger-cpu-arguments-slope": 519,
    "multiplyInteger-memory-arguments-intercept": 0,
    "multiplyInteger-memory-arguments-slope": 1,
    "nullList-cpu-arguments": 74433,
    "nullList-memory-arguments": 32,
    "quotientInteger-cpu-arguments-constant": 85848,
    "quotientInteger-cpu-arguments-model-arguments-c00": 123203,
    "quotientInteger-cpu-arguments-model-arguments-c01": 7305,
    "quotientInteger-cpu-arguments-model-arguments-c02": -900,
    "quotientInteger-cpu-arguments-model-arguments-c10": 1716,
    "quotientInteger-cpu-arguments-model-arguments-c11": 549,
    "quotientInteger-cpu-arguments-model-arguments-c20": 57,
    "quotientInteger-cpu-arguments-model-arguments-minimum": 85848,
    "quotientInteger-memory-arguments-intercept": 0,
    "quotientInteger-memory-arguments-minimum": 1,
    "quotientInteger-memory-arguments-slope": 1,
    "remainderInteger-cpu-arguments-constant": 85848,
    "remainderInteger-cpu-arguments-model-arguments-c00": 123203,
    "remainderInteger-cpu-arguments-model-arguments-c01": 7305,
    "remainderInteger-cpu-arguments-model-arguments-c02": -900,
    "remainderInteger-cpu-arguments-model-arguments-c10": 1716,
    "remainderInteger-cpu-arguments-model-arguments-c11": 549,
    "remainderInteger-cpu-arguments-model-arguments-c20": 57,
    "remainderInteger-cpu-arguments-model-arguments-minimum": 85848,
    "remainderInteger-memory-arguments-intercept": 0,
    "remainderInteger-memory-arguments-slope": 1,
    "serialiseData-cpu-arguments-intercept": 955506,
    "serialiseData-cpu-arguments-slope": 213312,
    "serialiseData-memory-arguments-intercept": 0,
    "serialiseData-memory-arguments-slope": 2,
    "sha2_256-cpu-arguments-intercept": 270652,
    "sha2_256-cpu-arguments-slope": 22588,
    "sha2_256-memory-arguments": 4,
    "sha3_256-cpu-arguments-intercept": 1457325,
    "sha3_256-cpu-arguments-slope": 64566,
    "sha3_256-memory-arguments": 4,
    "sliceByteString-cpu-arguments-intercept": 20467,
    "sliceByteString-cpu-arguments-slope": 1,
    "sliceByteString-memory-arguments-intercept": 4,
    "sliceByteString-memory-arguments-slope": 0,
    "sndPair-cpu-arguments": 141992,
    "sndPair-memory-arguments": 32,
    "subtractInteger-cpu-arguments-intercept": 100788,
    "subtractInteger-cpu-arguments-slope": 420,
    "subtractInteger-memory-arguments-intercept": 1,
    "subtractInteger-memory-arguments-slope": 1,
    "tailList-cpu-arguments": 81663,
    "tailList-memory-arguments": 32,
    "trace-cpu-arguments": 59498,
    "trace-memory-arguments": 32,
    "unBData-cpu-arguments": 20142,
    "unBData-memory-arguments": 32,
    "unConstrData-cpu-arguments": 24588,
    "unConstrData-memory-arguments": 32,
    "unIData-cpu-arguments": 20744,
    "unIData-memory-arguments": 32,
    "unListData-cpu-arguments": 25933,
    "unListData-memory-arguments": 32,
    "unMapData-cpu-arguments": 24623,
    "unMapData-memory-arguments": 32,
    "verifyEcdsaSecp256k1Signature-cpu-arguments": 43053543,
    "verifyEcdsaSecp256k1Signature-memory-arguments": 10,
    "verifyEd25519Signature-cpu-arguments-intercept": 53384111,
    "verifyEd25519Signature-cpu-arguments-slope": 14333,
    "verifyEd25519Signature-memory-arguments": 10,
    "verifySchnorrSecp256k1Signature-cpu-arguments-intercept": 43574283,
    "verifySchnorrSecp256k1Signature-cpu-arguments-slope": 26308,
    "verifySchnorrSecp256k1Signature-memory-arguments": 10
});

function defaultCostModelDef( v = 3, indent = 4 )
{
    const type = "CostModelPlutusV" + v.toString();
    const def = `export const defaultV${v}Costs: ${type} = Object.freeze(`;

    let interf = {};

    for( const n of haskellNames )
    {
        interf[n] = Number( defaultV3Costs[n] );
    }

    const interfStr = JSON.stringify( interf, undefined, indent )

    return def + interfStr + ` as ${type});`
}

console.log( defaultCostModelDef() );