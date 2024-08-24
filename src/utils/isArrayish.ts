import { isObject } from "@harmoniclabs/obj-utils";

type Arrayish = { [x: number ]: any } // no lenght

function isIntStr( str: string ): boolean {
    return /^\d+$/.test(str);
}

export function isArrayish( value: any ): value is Arrayish
{
    if(!(
        isObject( value ) &&
        value.length === undefined
    )) return false;

    const keys = Object.keys( value );
    if( keys.length === 0 ) return true;

    if( !keys.every( isIntStr ) ) return false;

    const idxsCopy = keys.map( k => parseInt( k, 10 ) );

    for( let i = 0; idxsCopy.length > 0; i++ )
    {
        const j = idxsCopy.findIndex( idx => idx === i );
        // assert every number is present up to the max
        if( j === -1 ) return false;
        // remove from copy to speed up later iterations
        void idxsCopy.splice( j, 1 );
    }

    return true;
}

export function forceArrayish( arrish: Arrayish ): any[]
{
    return new Array(
        Object.keys( arrish ).length
    )
    .fill( 0 )
    .map((_, i) => arrish[i] );
}