import { cborNumber } from "./utils/ints";
import { defineReadOnlyProperty, hasOwn, isObject } from "@harmoniclabs/obj-utils";
import { CanBeCborString, Cbor, CborArray, CborBytes, CborMap, CborMapEntry, CborNegInt, CborObj, CborUInt, forceCborString } from "@harmoniclabs/cbor";
import { canBeInteger } from "./utils/ints";
import { N_COST_MODEL_PLUTUS_V1 } from "./v1/N_COST_MODEL_PLUTUS_V1";
import { N_COST_MODEL_PLUTUS_V2 } from "./v2/N_COST_MODEL_PLUTUS_V2";
import { N_COST_MODEL_PLUTUS_V3 } from "./v3/N_COST_MODEL_PLUTUS_V3";
import { AnyV1CostModel, isCostModelsV1, toCostModelArrV1, toCostModelV1, CostModelPlutusV1 } from "./v1";
import { AnyV2CostModel, isCostModelsV2, toCostModelArrV2, toCostModelV2, CostModelPlutusV2 } from "./v2";
import { AnyV3CostModel } from "./v3/AnyV3CostModel";
import { CostModelPlutusV3 } from "./v3/CostModelPlutusV3";
import { isCostModelsV3 } from "./v3/isCostModelsV3";
import { toCostModelArrV3 } from "./v3/toCostModelArrV3";
import { toCostModelV3 } from "./v3/toCostModelV3";
// V4 plumbing intentionally absent — see src/v4/index.ts for the deprecation
// rationale. The 350-entry shape is what the chain currently emits as V3.

/**
 * The raw parameter list of one language, as on the wire
 * (`cost_models = { ? 0 : [* int64], ? 1 : [* int64], ? 2 : [* int64], * 3 .. 255 => [* int64] }`).
 */
export type RawCostModel = bigint[];

export interface CostModels {
    PlutusScriptV1?: AnyV1CostModel,
    PlutusScriptV2?: AnyV2CostModel,
    PlutusScriptV3?: AnyV3CostModel,
    /**
     * cost models of languages 3 .. 255, by language id, kept as raw lists
     * the way cardano-ledger keeps them (`costModelsUnknown`), so that a
     * decoded value re-encodes unchanged
     */
    unknownLanguages?: { [language: number]: RawCostModel },
}

function isRawCostModel( something: any ): something is RawCostModel
{
    return Array.isArray( something ) && something.every( canBeInteger );
}

function isUnknownLanguages( something: any ): boolean
{
    if(!isObject( something )) return false;
    return Object.keys( something ).every( k =>
        /^\d+$/.test( k ) && Number( k ) >= 3 && Number( k ) <= 255 &&
        isRawCostModel( something[k] )
    );
}

export function isCostModels( something: any ): something is CostModels
{
    if(!isObject( something )) return false;

    let hasV1, hasV2, hasV3;
    hasV1 = hasV2 = hasV3 = false;

    // a decoded cost model the keyed form cannot hold losslessly is kept as
    // its raw list (any length; see `costModelsFromCborObj`)
    if( hasOwn<object,"PlutusScriptV1">( something, "PlutusScriptV1" ) )
    {
        hasV1 = true;
        if( !( isCostModelsV1( something.PlutusScriptV1 ) || isRawCostModel( something.PlutusScriptV1 ) ) ) return false;
    }

    if( hasOwn<object,"PlutusScriptV2">( something, "PlutusScriptV2" ) )
    {
        hasV2 = true;
        if( !( isCostModelsV2( something.PlutusScriptV2 ) || isRawCostModel( something.PlutusScriptV2 ) ) ) return false;
    }

    if( hasOwn<object,"PlutusScriptV3">( something, "PlutusScriptV3" ) )
    {
        hasV3 = true;
        if( !( isCostModelsV3( something.PlutusScriptV3 ) || isRawCostModel( something.PlutusScriptV3 ) ) ) return false;
    }

    let hasUnknown = false;
    if( hasOwn<object,"unknownLanguages">( something, "unknownLanguages" ) && something.unknownLanguages !== undefined )
    {
        if( !isUnknownLanguages( something.unknownLanguages ) ) return false;
        hasUnknown = Object.keys( something.unknownLanguages ).length > 0;
    }

    return ( hasV1 || hasV2 || hasV3 || hasUnknown );
};

/**
 * `cost_models` map, keys in ascending order (as cardano-ledger writes its
 * `Map Word8 [Int64]`). A cost model given as a list is written as given
 * (the decoded form of a list the keyed form cannot hold); a keyed one is
 * written in the canonical parameter order.
 */
export function costModelsToCborObj( costmdls: CostModels ): CborMap
{
    const {
        PlutusScriptV1,
        PlutusScriptV2,
        PlutusScriptV3,
        unknownLanguages,
    } = costmdls;

    const entries: CborMapEntry[] = [];
    const list = ( ns: ArrayLike<number | bigint> ) => new CborArray( Array.prototype.map.call( ns, cborNumber ) as CborObj[] );

    if( PlutusScriptV1 !== undefined ) entries.push({
        k: new CborUInt( 0 ),
        v: list( Array.isArray( PlutusScriptV1 ) ? PlutusScriptV1 : toCostModelArrV1( PlutusScriptV1 ) )
    });
    if( PlutusScriptV2 !== undefined ) entries.push({
        k: new CborUInt( 1 ),
        v: list( Array.isArray( PlutusScriptV2 ) ? PlutusScriptV2 : toCostModelArrV2( PlutusScriptV2 ) )
    });
    if( PlutusScriptV3 !== undefined ) entries.push({
        k: new CborUInt( 2 ),
        v: list( Array.isArray( PlutusScriptV3 ) ? PlutusScriptV3 : toCostModelArrV3( PlutusScriptV3 ) )
    });
    if( unknownLanguages !== undefined )
    {
        const langs = Object.keys( unknownLanguages ).map( Number ).sort( ( a, b ) => a - b );
        for( const lang of langs )
        {
            if(!( Number.isSafeInteger( lang ) && 3 <= lang && lang <= 255 ))
            throw new Error( "invalid cost model language: " + lang );
            entries.push({
                k: new CborUInt( lang ),
                v: list( unknownLanguages[lang] )
            });
        }
    }

    return new CborMap( entries );
}

export function costModelsFromCbor( cStr: CanBeCborString ): CostModels
{
    return costModelsFromCborObj( Cbor.parse( forceCborString( cStr ) ) );
}
const MIN_INT64 = -( BigInt( 1 ) << BigInt( 63 ) );
const MAX_INT64 = ( BigInt( 1 ) << BigInt( 63 ) ) - BigInt( 1 );

// duck-typed checks: the CborObj may come from another copy of
// @harmoniclabs/cbor than the one this library resolves (`instanceof` fails
// across copies); every 2.x copy has the same shapes
function isMapLike( o: any ): o is CborMap
{
    return o instanceof CborMap || ( typeof o === "object" && o !== null && Array.isArray( o.map ) && o.constructor?.name === "CborMap" );
}
function isArrayLike( o: any ): o is CborArray
{
    return o instanceof CborArray || ( typeof o === "object" && o !== null && Array.isArray( o.array ) && o.constructor?.name === "CborArray" );
}
function isUIntLike( o: any ): o is CborUInt
{
    return o instanceof CborUInt || ( typeof o === "object" && o !== null && typeof o.num === "bigint" && o.constructor?.name === "CborUInt" );
}
function isNegIntLike( o: any ): o is CborNegInt
{
    return o instanceof CborNegInt || ( typeof o === "object" && o !== null && typeof o.num === "bigint" && o.constructor?.name === "CborNegInt" );
}
/** `#6.2` / `#6.3` bignum (cardano-ledger's integer decoders take no tags) */
function isBigNumLike( o: any ): boolean
{
    return o.bigNumEncoding !== undefined && o.bigNumEncoding !== null;
}

function int64FromCborObj( n: CborObj, lang: number, idx: number ): bigint
{
    if(!(
        ( isUIntLike( n ) || isNegIntLike( n ) ) &&
        !isBigNumLike( n )
    )) throw new Error( `invalid cost model ${lang}: parameter ${idx} is not an int64` );
    const v = n.num;
    if( v < MIN_INT64 || v > MAX_INT64 )
    throw new Error( `invalid cost model ${lang}: parameter ${idx} is out of the int64 range` );
    return v;
}

/**
 * keyed form of a known language when it holds the list losslessly
 * (exactly the expected number of parameters, values the keyed form can
 * represent); the raw list otherwise
 */
function knownLanguageModel( lang: 0 | 1 | 2, raw: RawCostModel ): any
{
    try {
        if( lang === 0 && raw.length === N_COST_MODEL_PLUTUS_V1 ) return toCostModelV1( raw as any );
        if( lang === 1 && raw.length === N_COST_MODEL_PLUTUS_V2 ) return toCostModelV2( raw as any );
        // `toCostModelV3` stores numbers
        if(
            lang === 2 && raw.length === N_COST_MODEL_PLUTUS_V3 &&
            raw.every( v => Number.isSafeInteger( Number( v ) ) )
        ) return toCostModelV3( raw.map( Number ) as any );
    }
    catch {}
    return raw;
}

export function costModelsFromCborObj( cObj: CborObj | undefined ): CostModels
{
    if( cObj === undefined ) return {};
    if( !isMapLike( cObj ) ) throw new Error( "invalid cost models: expected a map" );

    const costs: CostModels = {};
    const unknown: { [language: number]: RawCostModel } = {};
    const seen = new Set<number>();

    cObj.map.forEach( ({ k, v }) => {

        if(!(
            isUIntLike( k ) && !isBigNumLike( k ) && k.num <= BigInt( 255 )
        )) throw new Error( "invalid cost models: language must be an integer in 0 .. 255" );

        const lang = Number( k.num );
        if( seen.has( lang ) ) throw new Error( "invalid cost models: duplicate language " + lang );
        seen.add( lang );

        if( !isArrayLike( v ) ) throw new Error( `invalid cost model ${lang}: expected a list` );

        const raw: RawCostModel = v.array.map( ( n, i ) => int64FromCborObj( n, lang, i ) );

        if( lang === 0 ) defineReadOnlyProperty( costs, "PlutusScriptV1", knownLanguageModel( 0, raw ) );
        else if( lang === 1 ) defineReadOnlyProperty( costs, "PlutusScriptV2", knownLanguageModel( 1, raw ) );
        else if( lang === 2 ) defineReadOnlyProperty( costs, "PlutusScriptV3", knownLanguageModel( 2, raw ) );
        // 3 (PlutusV4 in recent cardano-ledger) and above: kept raw, see src/v4/index.ts
        else unknown[lang] = raw;
    });

    if( Object.keys( unknown ).length > 0 ) defineReadOnlyProperty( costs, "unknownLanguages", unknown );

    return costs;
}

export interface CostModelsToLanguageViewCborOpts {
    mustHaveV1?: boolean,
    mustHaveV2?: boolean,
    mustHaveV3?: boolean,
}

export function costModelsToLanguageViewCbor( costmdls: CostModels, opts: CostModelsToLanguageViewCborOpts ): Uint8Array
{
    const {
        PlutusScriptV1,
        PlutusScriptV2,
        PlutusScriptV3,
    } = costmdls;

    if( opts.mustHaveV1 === true && PlutusScriptV1 === undefined )
    throw new Error("missing required PlutusScriptV1");

    if( opts.mustHaveV2 === true && PlutusScriptV2 === undefined )
    throw new Error("missing required PlutusScriptV2");

    if( opts.mustHaveV3 === true && PlutusScriptV3 === undefined )
    throw new Error("missing required PlutusScriptV3");

    return Cbor.encode(
        new CborMap([
            opts.mustHaveV1 ?
            {
                // k: new CborUInt(0); but as bytes (...)
                //
                // The language ID tag is also encoded twice. first as a uint then as
                // a bytestring. (our apologies)
                // Concretely, this means that the language version for V1 is encoded as
                // 4100 in hex.
                k: new CborBytes(Uint8Array.from([0])),

                /// plutus v1 language view is messed up, not my fault
                //
                // the value of costmdls map at key 0 (in other words, the script_integrity_data)
                // is encoded as an indefinite length list and the result is encoded as a bytestring.
                // (our apologies)
                v: new CborBytes(
                    Cbor.encode(
                        new CborArray(
                            toCostModelArrV1( PlutusScriptV1 as any )
                            .map( cborNumber ),
                            { indefinite: true }
                        )
                    )
                )
            } : undefined,
            opts.mustHaveV2 ?
            {
                k: new CborUInt(1),
                v: new CborArray( toCostModelArrV2( PlutusScriptV2 as any ).map( cborNumber ) )
            } : undefined,
            opts.mustHaveV3 ?
            {
                k: new CborUInt(2),
                v: new CborArray( toCostModelArrV3( PlutusScriptV3 as any ).map( cborNumber ) )
            } : undefined,
        ].filter( elem => elem !== undefined ) as CborMapEntry[])
    )
}

/** a raw list the keyed form cannot hold is written as a list of decimal strings */
function rawJson( something: any, expected: number ): string[] | undefined
{
    if( !Array.isArray( something ) || something.length === expected ) return undefined;
    return something.map( n => BigInt( n ).toString() );
}

export function costModelsToJson( costmdls: CostModels )
{
    const rawV1 = rawJson( costmdls.PlutusScriptV1, N_COST_MODEL_PLUTUS_V1 );
    const rawV2 = rawJson( costmdls.PlutusScriptV2, N_COST_MODEL_PLUTUS_V2 );
    const rawV3 = rawJson( costmdls.PlutusScriptV3, N_COST_MODEL_PLUTUS_V3 );
    const _pv1 = costmdls.PlutusScriptV1 === undefined || rawV1 ? undefined : toCostModelV1( costmdls.PlutusScriptV1 );
    const _pv2 = costmdls.PlutusScriptV2 === undefined || rawV2 ? undefined : toCostModelV2( costmdls.PlutusScriptV2 );
    const _pv3 = costmdls.PlutusScriptV3 === undefined || rawV3 ? undefined : toCostModelV3( costmdls.PlutusScriptV3 );

    const pv1 = {};
    if( _pv1 !== undefined )
    {
        const ks = Object.keys( _pv1 ) as (keyof CostModelPlutusV1)[];
        const n = ks.length;
        for(let i = 0; i < n; i++)
        {
            defineReadOnlyProperty(
                pv1, ks[i], BigInt( _pv1[ks[i]] ).toString()
            )
        }
    }

    const pv2 = {};
    if( _pv2 !== undefined )
    {
        const ks = Object.keys( _pv2 ) as (keyof CostModelPlutusV2)[];
        const n = ks.length;
        for(let i = 0; i < n; i++)
        {
            defineReadOnlyProperty(
                pv2, ks[i], BigInt( _pv2[ks[i]] ).toString()
            )
        }
    }

    const pv3 = {};
    if( _pv3 !== undefined )
    {
        const ks = Object.keys( _pv3 ) as (keyof CostModelPlutusV3)[];
        const n = ks.length;
        for(let i = 0; i < n; i++)
        {
            const k = ks[i];
            defineReadOnlyProperty(
                pv3, k, BigInt( _pv3[k] ).toString()
            )
        }
    }

    const json: {
        PlutusScriptV1: object | string[],
        PlutusScriptV2: object | string[],
        PlutusScriptV3: object | string[],
        unknownLanguages?: { [language: string]: string[] },
    } = {
        PlutusScriptV1: rawV1 ?? pv1,
        PlutusScriptV2: rawV2 ?? pv2,
        PlutusScriptV3: rawV3 ?? pv3,
    };
    const unknown = costmdls.unknownLanguages;
    if( unknown !== undefined && Object.keys( unknown ).length > 0 )
    {
        json.unknownLanguages = {};
        for( const k of Object.keys( unknown ) )
            json.unknownLanguages[k] = unknown[Number( k )].map( n => BigInt( n ).toString() );
    }
    return json;
}
