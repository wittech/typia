import typia from "../../../../src";
import { _test_isParse } from "../../../internal/_test_isParse";
import { DynamicUnion } from "../../../structures/DynamicUnion";

export const test_isParse_DynamicUnion = _test_isParse(
    "DynamicUnion",
    DynamicUnion.generate,
    (input) =>
        ((input: any): typia.Primitive<DynamicUnion> => {
            const is = (input: any): input is DynamicUnion => {
                const $join = (typia.isParse as any).join;
                const $io0 = (input: any): boolean =>
                    Object.keys(input).every((key: any) => {
                        const value = input[key];
                        if (undefined === value) return true;
                        if (RegExp(/^-?\d+\.?\d*$/).test(key))
                            return "string" === typeof value;
                        if (RegExp(/^(prefix_(.*))/).test(key))
                            return "string" === typeof value;
                        if (RegExp(/((.*)_postfix)$/).test(key))
                            return "string" === typeof value;
                        if (
                            RegExp(
                                /^(value_between_-?\d+\.?\d*_and_-?\d+\.?\d*)$/,
                            ).test(key)
                        )
                            return (
                                "number" === typeof value &&
                                Number.isFinite(value)
                            );
                        return true;
                    });
                return (
                    "object" === typeof input &&
                    null !== input &&
                    false === Array.isArray(input) &&
                    $io0(input)
                );
            };
            input = JSON.parse(input);
            return is(input) ? (input as any) : null;
        })(input),
    DynamicUnion.SPOILERS,
);
