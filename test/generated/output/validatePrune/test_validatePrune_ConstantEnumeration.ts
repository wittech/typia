import typia from "../../../../src";
import { _test_validatePrune } from "../../../internal/_test_validatePrune";
import { ConstantEnumeration } from "../../../structures/ConstantEnumeration";

export const test_validatePrune_ConstantEnumeration = _test_validatePrune(
    "ConstantEnumeration",
    ConstantEnumeration.generate,
    (input) =>
        ((
            input: any,
        ): typia.IValidation<Array<ConstantEnumeration.Enumeration>> => {
            const validate = (
                input: any,
            ): typia.IValidation<Array<ConstantEnumeration.Enumeration>> => {
                const errors = [] as any[];
                const $report = (typia.validatePrune as any).report(errors);
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
                                                    _path + "[" + _index1 + "]",
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
            const prune = (
                input: Array<ConstantEnumeration.Enumeration>,
            ): void => {};
            const output = validate(input);
            if (output.success) prune(input);
            return output;
        })(input),
    ConstantEnumeration.SPOILERS,
);
