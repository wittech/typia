import typia from "../../../../src";
import { _test_validateStringify } from "../../../internal/_test_validateStringify";
import { ConstantEnumeration } from "../../../structures/ConstantEnumeration";

export const test_validateStringify_ConstantEnumeration =
    _test_validateStringify(
        "ConstantEnumeration",
        ConstantEnumeration.generate,
        (input) =>
            ((
                input: Array<ConstantEnumeration.Enumeration>,
            ): typia.IValidation<string> => {
                const validate = (
                    input: any,
                ): typia.IValidation<
                    Array<ConstantEnumeration.Enumeration>
                > => {
                    const errors = [] as any[];
                    const $report = (typia.validateStringify as any).report(
                        errors,
                    );
                    const __is = (
                        input: any,
                    ): input is Array<ConstantEnumeration.Enumeration> => {
                        return (
                            Array.isArray(input) &&
                            input.every(
                                (elem: any) =>
                                    0 === elem ||
                                    1 === elem ||
                                    2 === elem ||
                                    "Three" === elem ||
                                    "Four" === elem,
                            )
                        );
                    };
                    if (false === __is(input))
                        ((
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): input is Array<ConstantEnumeration.Enumeration> => {
                            return (
                                ((Array.isArray(input) ||
                                    $report(true, {
                                        path: _path + "",
                                        expected: "ConstantEnumeration",
                                        value: input,
                                    })) &&
                                    input
                                        .map(
                                            (elem: any, _index1: number) =>
                                                0 === elem ||
                                                1 === elem ||
                                                2 === elem ||
                                                "Three" === elem ||
                                                "Four" === elem ||
                                                $report(true, {
                                                    path:
                                                        _path +
                                                        "[" +
                                                        _index1 +
                                                        "]",
                                                    expected:
                                                        '("Four" | "Three" | 0 | 1 | 2)',
                                                    value: elem,
                                                }),
                                        )
                                        .every((flag: boolean) => flag)) ||
                                $report(true, {
                                    path: _path + "",
                                    expected: "ConstantEnumeration",
                                    value: input,
                                })
                            );
                        })(input, "$input", true);
                    const success = 0 === errors.length;
                    return {
                        success,
                        errors,
                        data: success ? input : undefined,
                    } as any;
                };
                const stringify = (
                    input: Array<ConstantEnumeration.Enumeration>,
                ): string => {
                    const $string = (typia.validateStringify as any).string;
                    const $number = (typia.validateStringify as any).number;
                    const $throws = (typia.validateStringify as any).throws;
                    return `[${input
                        .map((elem: any) =>
                            (() => {
                                if ("string" === typeof elem)
                                    return $string(elem);
                                if ("number" === typeof elem)
                                    return $number(elem);
                                if ("string" === typeof elem)
                                    return '"' + elem + '"';
                                $throws({
                                    expected: '("Four" | "Three" | 0 | 1 | 2)',
                                    value: elem,
                                });
                            })(),
                        )
                        .join(",")}]`;
                };
                const output = validate(input) as any;
                if (output.success) output.data = stringify(input);
                return output;
            })(input),
        ConstantEnumeration.SPOILERS,
    );
