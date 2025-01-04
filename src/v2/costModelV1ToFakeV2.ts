import { defineReadOnlyProperty } from "@harmoniclabs/obj-utils";
import { a_lot } from "../common/a_lot";
import { AnyV1CostModel } from "../v1/AnyV1CostModel";
import { toCostModelV1 } from "../v1/toCostModelV1";
import { CostModelPlutusV2 } from "./CostModelPlutusV2";
import { newV2Keys } from "./newV2Keys";

export function costModelV1ToFakeV2( costmdlsV1: AnyV1CostModel ): CostModelPlutusV2
{    
    const costs = { ...toCostModelV1( costmdlsV1 ) };

    for( const key of newV2Keys )
    {
        defineReadOnlyProperty( costs, key, a_lot );
    }

    // makeItALot( "serialiseData-cpu-arguments-intercept" );
    // makeItALot( "serialiseData-cpu-arguments-slope" );
    // makeItALot( "serialiseData-memory-arguments-intercept" );
    // makeItALot( "serialiseData-memory-arguments-slope" );
    // makeItALot( "verifyEcdsaSecp256k1Signature-cpu-arguments" );
    // makeItALot( "verifyEcdsaSecp256k1Signature-memory-arguments" );
    // makeItALot( "verifySchnorrSecp256k1Signature-cpu-arguments-intercept" );
    // makeItALot( "verifySchnorrSecp256k1Signature-cpu-arguments-slope" );
    // makeItALot( "verifySchnorrSecp256k1Signature-memory-arguments" );

    return costs as any;
}