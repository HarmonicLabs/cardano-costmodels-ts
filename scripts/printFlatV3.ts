import { readFile } from "node:fs/promises"
import { haskellNames } from "./haskellNames";

void async function main () {
    const data = JSON.parse(
        await readFile("./src/v3_data.json", "utf-8")
    );
    const cek = JSON.parse(
        await readFile("./src/machineCosts_data.json", "utf-8")
    );

    // unordered
    const tmp = {
        ...flatObj(data),
        ...flatObj(cek)
    };

    const flat = {};
    
    // order
    for (const key of haskellNames) {
        flat[key] = tmp[key];
    }

    console.log(
        JSON.stringify(
            flat,
            null,
            2
        )
    );

    console.log( Object.keys(flat).length );
}()

function flatObj( obj: object, prefix = "", separator = "-" ): object
{
    return flatObjEntries(obj, prefix, separator).reduce((acc, cur) => {
        for (const key in cur) {
            acc[key] = cur[key];
        }
        return acc;
    }, {});
}

function flatObjEntries( obj: object, prefix = "", separator = "-" ): object[]
{
    let result: object[] = [];
    const thisObj = {};
    let hasThisObj = false;
    for (const key in obj)
    {
        if( key === "type" ) continue;
        // expModInteger not enabled for plomin
        if( key.includes("expModInteger") ) continue;
        const value = obj[key];
        const newKey = prefix ? `${prefix}${separator}${key}` : key;
        if(typeof value === "object" && !Array.isArray(value))
        {
            result.push(...flatObjEntries(value, newKey, separator));
        }
        else
        {
            thisObj[newKey] = value;
            hasThisObj = true;
        }
    }
    if( hasThisObj ) result.push( thisObj );
    return result;
}