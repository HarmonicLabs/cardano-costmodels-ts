import { CborNegInt, CborUInt } from "@harmoniclabs/cbor";

export type CanBeUInteger
    = bigint
    | number;

export function canBeUInteger( something: any ): something is (number | bigint)
{
    return (
        (typeof something === "bigint" && something >= BigInt( 0 ) ) ||
        (typeof something === "number" && something === Math.round( Math.abs( something ) ) )
    );
}

export function cborNumber( n: CanBeUInteger ): CborUInt | CborNegInt
{
    if( !canBeUInteger( n ) ) throw new Error("expected number");

    return n < 0 ? new CborNegInt( n ) : new CborUInt( n );
}