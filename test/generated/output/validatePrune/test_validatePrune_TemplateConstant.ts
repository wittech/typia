import typia from "../../../../src";
import { _test_validatePrune } from "../../../internal/_test_validatePrune";
import { TemplateConstant } from "../../../structures/TemplateConstant";

export const test_validatePrune_TemplateConstant = _test_validatePrune(
    "TemplateConstant",
    TemplateConstant.generate,
    (input) =>
        ((input: any): typia.IValidation<Array<TemplateConstant.Type>> => {
            const validate = (
                input: any,
            ): typia.IValidation<Array<TemplateConstant.Type>> => {
                const errors = [] as any[];
                const $report = (typia.validatePrune as any).report(errors);
                const __is = (
                    input: any,
                ): input is Array<TemplateConstant.Type> => {
                    const $io0 = (input: any): boolean =>
                        ("prefix_A" === input.prefix ||
                            "prefix_B" === input.prefix ||
                            "prefix_C" === input.prefix) &&
                        ("1_postfix" === input.postfix ||
                            "3_postfix" === input.postfix ||
                            "2_postfix" === input.postfix) &&
                        ("the_1_value_with_label_A" === input.combined ||
                            "the_1_value_with_label_B" === input.combined ||
                            "the_1_value_with_label_C" === input.combined ||
                            "the_3_value_with_label_A" === input.combined ||
                            "the_3_value_with_label_B" === input.combined ||
                            "the_3_value_with_label_C" === input.combined ||
                            "the_2_value_with_label_A" === input.combined ||
                            "the_2_value_with_label_B" === input.combined ||
                            "the_2_value_with_label_C" === input.combined);
                    return (
                        Array.isArray(input) &&
                        input.every(
                            (elem: any) =>
                                "object" === typeof elem &&
                                null !== elem &&
                                $io0(elem),
                        )
                    );
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is Array<TemplateConstant.Type> => {
                        const $vo0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): boolean =>
                            [
                                "prefix_A" === input.prefix ||
                                    "prefix_B" === input.prefix ||
                                    "prefix_C" === input.prefix ||
                                    $report(_exceptionable, {
                                        path: _path + ".prefix",
                                        expected:
                                            '("prefix_A" | "prefix_B" | "prefix_C")',
                                        value: input.prefix,
                                    }),
                                "1_postfix" === input.postfix ||
                                    "3_postfix" === input.postfix ||
                                    "2_postfix" === input.postfix ||
                                    $report(_exceptionable, {
                                        path: _path + ".postfix",
                                        expected:
                                            '("1_postfix" | "2_postfix" | "3_postfix")',
                                        value: input.postfix,
                                    }),
                                "the_1_value_with_label_A" === input.combined ||
                                    "the_1_value_with_label_B" ===
                                        input.combined ||
                                    "the_1_value_with_label_C" ===
                                        input.combined ||
                                    "the_3_value_with_label_A" ===
                                        input.combined ||
                                    "the_3_value_with_label_B" ===
                                        input.combined ||
                                    "the_3_value_with_label_C" ===
                                        input.combined ||
                                    "the_2_value_with_label_A" ===
                                        input.combined ||
                                    "the_2_value_with_label_B" ===
                                        input.combined ||
                                    "the_2_value_with_label_C" ===
                                        input.combined ||
                                    $report(_exceptionable, {
                                        path: _path + ".combined",
                                        expected:
                                            '("the_1_value_with_label_A" | "the_1_value_with_label_B" | "the_1_value_with_label_C" | "the_2_value_with_label_A" | "the_2_value_with_label_B" | "the_2_value_with_label_C" | "the_3_value_with_label_A" | "the_3_value_with_label_B" | "the_3_value_with_label_C")',
                                        value: input.combined,
                                    }),
                            ].every((flag: boolean) => flag);
                        return (
                            ((Array.isArray(input) ||
                                $report(true, {
                                    path: _path + "",
                                    expected: "Array<TemplateConstant.Type>",
                                    value: input,
                                })) &&
                                input
                                    .map(
                                        (elem: any, _index1: number) =>
                                            ((("object" === typeof elem &&
                                                null !== elem) ||
                                                $report(true, {
                                                    path:
                                                        _path +
                                                        "[" +
                                                        _index1 +
                                                        "]",
                                                    expected:
                                                        "TemplateConstant.Type",
                                                    value: elem,
                                                })) &&
                                                $vo0(
                                                    elem,
                                                    _path + "[" + _index1 + "]",
                                                    true,
                                                )) ||
                                            $report(true, {
                                                path:
                                                    _path + "[" + _index1 + "]",
                                                expected:
                                                    "TemplateConstant.Type",
                                                value: elem,
                                            }),
                                    )
                                    .every((flag: boolean) => flag)) ||
                            $report(true, {
                                path: _path + "",
                                expected: "Array<TemplateConstant.Type>",
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
            const prune = (input: Array<TemplateConstant.Type>): void => {
                const $pp0 = (input: any) =>
                    input.forEach((elem: any) => {
                        if ("object" === typeof elem && null !== elem)
                            $po0(elem);
                    });
                const $po0 = (input: any): any => {
                    for (const key of Object.keys(input)) {
                        if (
                            "prefix" === key ||
                            "postfix" === key ||
                            "combined" === key
                        )
                            continue;
                        delete input[key];
                    }
                };
                if (Array.isArray(input)) $pp0(input);
            };
            const output = validate(input);
            if (output.success) prune(input);
            return output;
        })(input),
    TemplateConstant.SPOILERS,
);
