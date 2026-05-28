import { CborNegInt, CborUInt } from "@harmoniclabs/cbor";

export type CanBeUInteger
    = bigint
    | number;

export function canBeInteger( something: any ): something is (number | bigint)
{
    return (
        (typeof something === "bigint" ) ||
        (
            typeof something === "number" &&
            Number.isSafeInteger( something ) // filters NaN, non-integers, +-Infinity, and numbers that should be bigints
        )
    );
}

export function cborNumber( n: CanBeUInteger ): CborUInt | CborNegInt
{
    if( !canBeInteger( n ) ) throw new Error("expected number");

    return n < 0 ? new CborNegInt( n ) : new CborUInt( n );
}