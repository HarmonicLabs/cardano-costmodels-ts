import { Cbor, CborMap } from "@harmoniclabs/cbor";
import { toHex } from "@harmoniclabs/uint8array-utils";
import {
    costModelsFromCbor,
    costModelsFromCborObj,
    costModelsToCborObj,
    costModelsToJson,
    defaultV1Costs,
    defaultV2Costs,
    defaultV3Costs,
    isCostModels,
    N_COST_MODEL_PLUTUS_V1,
    toCostModelArrV1,
    toCostModelArrV2,
    toCostModelArrV3,
} from "..";

/**
 * cardano-ledger decodes `cost_models` as `Map Word8 [Int64]`
 * (conway.cddl: `{ ? 0 : [* int64], ? 1 : [* int64], ? 2 : [* int64],
 * * 3 .. 255 => [* int64] }`), keeps languages it does not know as raw
 * lists, and writes the map back with keys in ascending order and definite
 * lists (node-diversity-conformance item 582).
 */

const reencode = ( hex: string ): string => toHex( Cbor.encode( costModelsToCborObj( costModelsFromCbor( hex ) ) ) );

function listHex( ns: ( number | bigint )[] ): string
{
    return toHex( Cbor.encode( costModelsToCborObj({ unknownLanguages: { 3: ns.map( BigInt ) } }) ) ).slice( 4 ); // drop "a1 03"
}

describe("costModelsFromCborObj / costModelsToCborObj", () => {

    test("short V1 list (a1 00 81 00) is kept", () => {
        const cms = costModelsFromCbor( "a1008100" );
        expect( cms.PlutusScriptV1 ).toEqual([ 0n ]);
        expect( isCostModels( cms ) ).toBe( true );
        expect( reencode( "a1008100" ) ).toEqual( "a1008100" );
    });

    test("negative parameters are accepted (int64)", () => {
        const hex = "a1" + "00" + "83" + "20" + "01" + "3b7fffffffffffffff"; // [-1, 1, -2^63]
        const cms = costModelsFromCbor( hex );
        expect( cms.PlutusScriptV1 ).toEqual([ -1n, 1n, -( 2n ** 63n ) ]);
        expect( reencode( hex ) ).toEqual( hex );
    });

    test("languages 3 .. 255 are kept as raw lists", () => {
        const hex = "a3" + "00" + "80" + "03" + "8120" + "18ff" + "820102";
        const cms = costModelsFromCbor( hex );
        expect( cms.PlutusScriptV1 ).toEqual([]);
        expect( cms.unknownLanguages ).toEqual({ 3: [ -1n ], 255: [ 1n, 2n ] });
        expect( isCostModels( cms ) ).toBe( true );
        expect( reencode( hex ) ).toEqual( hex );
        expect( isCostModels( costModelsFromCbor( "a1038100" ) ) ).toBe( true );
    });

    test("re-encoding is canonical: keys ascending, definite lists, minimal heads", () => {
        // indefinite map with keys out of order, indefinite list, non-minimal head
        const src = "bf" + "05" + "9f1800ff" + "01" + "8101" + "00" + "80" + "ff";
        expect( reencode( src ) ).toEqual( "a3" + "00" + "80" + "01" + "8101" + "05" + "8100" );
    });

    test("full-length lists keep the keyed form and round-trip", () => {
        const v1 = toCostModelArrV1( defaultV1Costs ).map( BigInt );
        const v2 = toCostModelArrV2( defaultV2Costs ).map( BigInt );
        const v3 = toCostModelArrV3( defaultV3Costs ).map( BigInt );
        const hex = "a3" + "00" + listHex( v1 ) + "01" + listHex( v2 ) + "02" + listHex( v3 );
        const cms = costModelsFromCbor( hex );
        expect( Array.isArray( cms.PlutusScriptV1 ) ).toBe( false );
        expect( Array.isArray( cms.PlutusScriptV2 ) ).toBe( false );
        expect( Array.isArray( cms.PlutusScriptV3 ) ).toBe( false );
        expect( ( cms.PlutusScriptV1 as any )["addInteger-cpu-arguments-intercept"] ).toEqual( BigInt( defaultV1Costs["addInteger-cpu-arguments-intercept"] ) );
        expect( isCostModels( cms ) ).toBe( true );
        expect( reencode( hex ) ).toEqual( hex );
    });

    test("lists the keyed form cannot hold losslessly stay raw", () => {
        // one parameter too many for V1: the keyed form would drop it
        const long = [ ...toCostModelArrV1( defaultV1Costs ).map( BigInt ), 7n ];
        expect( long.length ).toBe( N_COST_MODEL_PLUTUS_V1 + 1 );
        const hex1 = "a1" + "00" + listHex( long );
        expect( costModelsFromCbor( hex1 ).PlutusScriptV1 ).toEqual( long );
        expect( reencode( hex1 ) ).toEqual( hex1 );
        // a V3 value beyond 2^53: the keyed V3 form stores numbers
        const v3 = toCostModelArrV3( defaultV3Costs ).map( BigInt );
        v3[0] = 2n ** 62n + 1n;
        const hex3 = "a1" + "02" + listHex( v3 );
        expect( costModelsFromCbor( hex3 ).PlutusScriptV3 ).toEqual( v3 );
        expect( reencode( hex3 ) ).toEqual( hex3 );
        // 297-entry V3 (pre-Plomin² chains) is not padded
        const v3old = toCostModelArrV3( defaultV3Costs ).slice( 0, 297 ).map( BigInt );
        const hexOld = "a1" + "02" + listHex( v3old );
        expect( reencode( hexOld ) ).toEqual( hexOld );
    });

    test("JSON of raw lists and unknown languages", () => {
        const json = costModelsToJson( costModelsFromCbor( "a2" + "00" + "8220" + "01" + "03" + "8100" ) );
        expect( json.PlutusScriptV1 ).toEqual([ "-1", "1" ]);
        expect( json.unknownLanguages ).toEqual({ 3: [ "0" ] });
    });

    test("absent cost models", () => {
        expect( costModelsFromCborObj( undefined ) ).toEqual({});
        expect( costModelsFromCbor( "a0" ) ).toEqual({});
    });

    describe("rejected like cardano-ledger", () => {
        test.each([
            [ "not a map", "80" ],
            [ "bignum parameter", "a10081c24101" ],
            [ "parameter above int64", "a100811b8000000000000000" ],
            [ "parameter below int64", "a100813b8000000000000000" ],
            [ "text parameter", "a100816161" ],
            [ "float parameter", "a10081f93c00" ],
            [ "null parameter", "a10081f6" ],
            [ "non-list value", "a10000" ],
            [ "language 256", "a1190100" + "80" ],
            [ "negative language", "a12080" ],
            [ "bignum language", "a1c2410080" ],
            [ "text language", "a1616180" ],
            [ "duplicate language", "a2008000" + "80" ],
        ])( "%s", ( _, hex ) => {
            expect( () => costModelsFromCbor( hex ) ).toThrow();
        });
    });

    test("objects from another copy of @harmoniclabs/cbor are decoded", () => {
        let OtherCbor: typeof Cbor = undefined as any;
        let OtherCborMap: typeof CborMap = undefined as any;
        jest.isolateModules(() => {
            const other = require("@harmoniclabs/cbor");
            OtherCbor = other.Cbor;
            OtherCborMap = other.CborMap;
        });
        expect( OtherCborMap ).not.toBe( CborMap );
        const hex = "a2" + "00" + "8220" + "01" + "03" + "8100";
        const foreign = OtherCbor.parse( hex );
        expect( foreign instanceof CborMap ).toBe( false );
        const cms = costModelsFromCborObj( foreign as any );
        expect( cms.PlutusScriptV1 ).toEqual([ -1n, 1n ]);
        expect( cms.unknownLanguages ).toEqual({ 3: [ 0n ] });
        expect( () => costModelsFromCborObj( OtherCbor.parse( "a10081c24101" ) as any ) ).toThrow();
    });
});
