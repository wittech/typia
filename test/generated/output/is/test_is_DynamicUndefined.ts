import typia from "../../../../src";
import { _test_is } from "../../../internal/_test_is";
import { DynamicUndefined } from "../../../structures/DynamicUndefined";

export const test_is_DynamicUndefined = _test_is(
    "DynamicUndefined",
    DynamicUndefined.generate,
    (input) =>
        ((input: any): input is DynamicUndefined => {
            const $join = (typia.is as any).join;
            const $io0 = (input: any): boolean =>
                Object.keys(input).every((key: any) => {
                    const value = input[key];
                    if (undefined === value) return true;
                    if (RegExp(/(.*)/).test(key))
                        return null !== value && undefined === value;
                    return true;
                });
            return (
                "object" === typeof input &&
                null !== input &&
                false === Array.isArray(input) &&
                $io0(input)
            );
        })(input),
    DynamicUndefined.SPOILERS,
);
