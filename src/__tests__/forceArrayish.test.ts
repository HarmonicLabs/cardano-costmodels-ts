import { forceArrayish } from "../utils/isArrayish";

describe("forceArrayish", () => {

    function testArrayish( value: any, result: any[] ): void
    {
        test(`${JSON.stringify(value)} => ${JSON.stringify(result)}`, () => {
            expect(forceArrayish(value)).toEqual(result);
        });
    }

    testArrayish({}, []);
    testArrayish({ 0: "a" }, ["a"]);
    testArrayish({ 0: "a", 1: "b" }, ["a", "b"]);
    testArrayish({ 0: "a", 1: "b", 2: "c" }, ["a", "b", "c"]);
    testArrayish({ 2: "a", 1: "b", 0: "c" }, ["c", "b", "a"]);

    // invalid Arrayish
    testArrayish({ 0: "a", 1: "b", 3: "c" }, ["a", "b", undefined]);
    testArrayish({ 10: "a", 6: "b", 3: "c" }, [undefined, undefined, undefined]);

});