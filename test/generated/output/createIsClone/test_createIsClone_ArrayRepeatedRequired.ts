import typia from "../../../../src";
import { _test_isClone } from "../../../internal/_test_isClone";
import { ArrayRepeatedRequired } from "../../../structures/ArrayRepeatedRequired";

export const test_createIsClone_ArrayRepeatedRequired = _test_isClone(
    "ArrayRepeatedRequired",
    ArrayRepeatedRequired.generate,
    (input: any): typia.Primitive<ArrayRepeatedRequired> | null => {
        const is = (input: any): input is ArrayRepeatedRequired => {
            const $ia0 = (input: any): any =>
                input.every(
                    (elem: any) =>
                        null !== elem &&
                        undefined !== elem &&
                        ("string" === typeof elem ||
                            ("number" === typeof elem &&
                                Number.isFinite(elem)) ||
                            (Array.isArray(elem) && ($ia0(elem) || false))),
                );
            return (
                null !== input &&
                undefined !== input &&
                ("string" === typeof input ||
                    ("number" === typeof input && Number.isFinite(input)) ||
                    (Array.isArray(input) && ($ia0(input) || false)))
            );
        };
        const clone = (
            input: ArrayRepeatedRequired,
        ): typia.Primitive<ArrayRepeatedRequired> => {
            const $ia0 = (input: any): any =>
                input.every(
                    (elem: any) =>
                        null !== elem &&
                        undefined !== elem &&
                        ("string" === typeof elem ||
                            "number" === typeof elem ||
                            (Array.isArray(elem) && ($ia0(elem) || false))),
                );
            const $cp0 = (input: any) => $ca0(input);
            const $ca0 = (input: any): any =>
                input.map((elem: any) =>
                    Array.isArray(elem) ? $cp0(elem) : (elem as any),
                );
            return Array.isArray(input) ? $cp0(input) : (input as any);
        };
        if (!is(input)) return null;
        const output = clone(input);
        return output;
    },
    ArrayRepeatedRequired.SPOILERS,
);
