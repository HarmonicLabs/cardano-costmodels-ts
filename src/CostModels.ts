import { cborNumber } from "./utils/ints";
import { defineReadOnlyProperty, hasOwn, isObject } from "@harmoniclabs/obj-utils";
import { CanBeCborString, Cbor, CborArray, CborBytes, CborMap, CborMapEntry, CborObj, CborString, CborUInt, forceCborString } from "@harmoniclabs/cbor";
import { AnyV1CostModel, isCostModelsV1, toCostModelArrV1, toCostModelV1, CostModelPlutusV1 } from "./v1";
import { AnyV2CostModel, isCostModelsV2, toCostModelArrV2, toCostModelV2, CostModelPlutusV2 } from "./v2";
import { AnyV3CostModel } from "./v3/AnyV3CostModel";
import { CostModelPlutusV3 } from "./v3/CostModelPlutusV3";
import { isCostModelsV3 } from "./v3/isCostModelsV3";
import { toCostModelArrV3 } from "./v3/toCostModelArrV3";
import { toCostModelV3 } from "./v3/toCostModelV3";

export interface CostModels {
    PlutusScriptV1?: AnyV1CostModel,
    PlutusScriptV2?: AnyV2CostModel,
    PlutusScriptV3?: AnyV3CostModel,
}

export function isCostModels( something: any ): something is CostModels
{
    if(!isObject( something )) return false;

    let hasV1, hasV2, hasV3;
    hasV1 = hasV2 = hasV3 = false;

    if( hasOwn<object,"PlutusScriptV1">( something, "PlutusScriptV1" ) )
    {
        hasV1 = true;
        if( !isCostModelsV1( something.PlutusScriptV1 ) ) return false;
    }
    
    if( hasOwn<object,"PlutusScriptV2">( something, "PlutusScriptV2" ) )
    {
        hasV2 = true;
        if( !isCostModelsV2( something.PlutusScriptV2 ) ) return false;
    }

    if( hasOwn<object,"PlutusScriptV3">( something, "PlutusScriptV3" ) )
    {
        hasV3 = true;
        if( !isCostModelsV3( something.PlutusScriptV3 ) ) return false;
    }

    if(!( hasV1 || hasV2 || hasV3 )) return false

    return true
};

export function costModelsToCborObj( costmdls: CostModels ): CborMap
{
    const {
        PlutusScriptV1,
        PlutusScriptV2,
        PlutusScriptV3,
    } = costmdls;

    return new CborMap([
        PlutusScriptV1 === undefined ? undefined :
        {
            k: new CborUInt( 0 ),
            v: new CborArray( toCostModelArrV1( PlutusScriptV1 ).map( cborNumber ) )
        },
        PlutusScriptV2 === undefined ? undefined :
        {
            k: new CborUInt( 1 ),
            v: new CborArray( toCostModelArrV2( PlutusScriptV2 ).map( cborNumber ) )
        },
        PlutusScriptV3 === undefined ? undefined :
        {
            k: new CborUInt( 2 ),
            v: new CborArray( toCostModelArrV3( PlutusScriptV3 ).map( cborNumber ) )
        }
    ].filter( elem => elem !== undefined ) as CborMapEntry[])
}

export function costModelsFromCbor( cStr: CanBeCborString ): CostModels
{
    return costModelsFromCborObj( Cbor.parse( forceCborString( cStr ) ) );
}
export function costModelsFromCborObj( cObj: CborObj | undefined ): CostModels
{
    if( cObj === undefined || !( cObj instanceof CborMap )) return {};

    const costs = {};

    cObj.map.forEach( ({ k, v }) => {

        if(!(
            k instanceof CborUInt && 
            v instanceof CborArray && 
            v.array.every( n => n instanceof CborUInt )
        )) return; // ingore entry

        const plutusIdx = Number( k.num );
        if( plutusIdx === 0 )
        {
            defineReadOnlyProperty(
                costs, "PlutusScriptV1", toCostModelV1( (v.array.map( n => (n as CborUInt).num ) ) as any )
            );
        }
        else if( plutusIdx === 1 )
        {
            defineReadOnlyProperty(
                costs, "PlutusScriptV2", toCostModelV2( (v.array.map( n => (n as CborUInt).num ) ) as any )
            );
        }
        else if( plutusIdx === 2 )
        {
            defineReadOnlyProperty(
                costs, "PlutusScriptV3", toCostModelV3( (v.array.map( n => (n as CborUInt).num ) ) as any )
            );
        }

    });

    return costs;
}

export interface CostModelsToLanguageViewCborOpts {
    mustHaveV1?: boolean,
    mustHaveV2?: boolean,
    mustHaveV3?: boolean,
}

export function costModelsToLanguageViewCbor( costmdls: CostModels, opts: CostModelsToLanguageViewCborOpts ): CborString
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
                    ).toBuffer()
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
            } : undefined
        ].filter( elem => elem !== undefined ) as CborMapEntry[])
    )
}

export function costModelsToJson( costmdls: CostModels )
{
    const _pv1 = costmdls.PlutusScriptV1 === undefined ? undefined : toCostModelV1( costmdls.PlutusScriptV1 );
    const _pv2 = costmdls.PlutusScriptV2 === undefined ? undefined : toCostModelV2( costmdls.PlutusScriptV2 );
    const _pv3 = costmdls.PlutusScriptV3 === undefined ? undefined : toCostModelV3( costmdls.PlutusScriptV3 );

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

    return {
        PlutusScriptV1: pv1,
        PlutusScriptV2: pv2,
        PlutusScriptV3: pv3,
    };
}