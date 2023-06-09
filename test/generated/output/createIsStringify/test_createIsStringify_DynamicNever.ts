import typia from "../../../../src";
import { _test_isStringify } from "../../../internal/_test_isStringify";
import { DynamicNever } from "../../../structures/DynamicNever";

export const test_createIsStringify_DynamicNever = _test_isStringify(
    "DynamicNever",
    DynamicNever.generate,
    (input: DynamicNever): string | null => {
        const is = (input: any): input is DynamicNever => {
            const $join = (typia.createIsStringify as any).join;
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
        };
        const stringify = (input: DynamicNever): string => {
            const $join = (typia.createIsStringify as any).join;
            const $so0 = (input: any): any =>
                `{${Object.entries(input)
                    .map(([key, value]: [string, any]) => {
                        if (undefined === value) return "";
                        return `${JSON.stringify(key)}:${undefined}`;
                    })
                    .filter((str: any) => "" !== str)
                    .join(",")}}`;
            return $so0(input);
        };
        return is(input) ? stringify(input) : null;
    },
    DynamicNever.SPOILERS,
);
