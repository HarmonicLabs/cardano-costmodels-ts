import { isArrayish } from "../utils/isArrayish";

describe("isArrayish", () => {

    function testArrayish( value: any, result: boolean ): void
    {
        test(`${JSON.stringify(value)} => ${result}`, () => {
            expect(isArrayish(value)).toBe(result);
        });
    }

    testArrayish([], false);
    testArrayish({}, true);
    testArrayish({ length: 0 }, false);
    testArrayish({ 0: "a" }, true);
    testArrayish({ 0: "a", 1: "b" }, true);
    testArrayish({ 0: "a", 2: "b" }, false);
    testArrayish({ 0: "a", 1: "b", length: 2 }, false);
    testArrayish({ 0: "a", 1: "b", length: 0 }, false);
    testArrayish({ 0: "a", 1: "b" }, true);
    testArrayish({ 0: "a", 1: "b", 2: "c" }, true);
    testArrayish({ 0: "a", 1: "b", 2: "c", length: 3 }, false);

});