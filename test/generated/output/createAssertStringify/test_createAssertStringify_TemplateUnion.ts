import typia from "../../../../src";
import { _test_assertStringify } from "../../../internal/_test_assertStringify";
import { TemplateUnion } from "../../../structures/TemplateUnion";

export const test_createAssertStringify_TemplateUnion = _test_assertStringify(
    "TemplateUnion",
    TemplateUnion.generate,
    (input: any): string => {
        const assert = (input: any): TemplateUnion => {
            const __is = (input: any): input is TemplateUnion => {
                const $io0 = (input: any): boolean =>
                    "string" === typeof input.prefix &&
                    (RegExp(/^prefix_(.*)/).test(input.prefix) ||
                        RegExp(/^prefix_-?\d+\.?\d*$/).test(input.prefix)) &&
                    "string" === typeof input.postfix &&
                    (RegExp(/(.*)_postfix$/).test(input.postfix) ||
                        RegExp(/^-?\d+\.?\d*_postfix$/).test(input.postfix)) &&
                    ("the_false_value" === input.middle ||
                        "the_true_value" === input.middle ||
                        ("string" === typeof input.middle &&
                            RegExp(/^the_-?\d+\.?\d*_value$/).test(
                                input.middle,
                            ))) &&
                    null !== input.mixed &&
                    undefined !== input.mixed &&
                    ("the_A_value" === input.mixed ||
                        "the_B_value" === input.mixed ||
                        ("number" === typeof input.mixed &&
                            Number.isFinite(input.mixed)) ||
                        "boolean" === typeof input.mixed ||
                        ("string" === typeof input.mixed &&
                            RegExp(/^the_-?\d+\.?\d*_value$/).test(
                                input.mixed,
                            )) ||
                        ("object" === typeof input.mixed &&
                            null !== input.mixed &&
                            $io1(input.mixed)));
                const $io1 = (input: any): boolean =>
                    "string" === typeof input.name;
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
                ): input is TemplateUnion => {
                    const $guard = (typia.createAssertStringify as any).guard;
                    const $ao0 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        (("string" === typeof input.prefix &&
                            (RegExp(/^prefix_(.*)/).test(input.prefix) ||
                                RegExp(/^prefix_-?\d+\.?\d*$/).test(
                                    input.prefix,
                                ))) ||
                            $guard(_exceptionable, {
                                path: _path + ".prefix",
                                expected:
                                    "(`prefix_${number}` | `prefix_${string}`)",
                                value: input.prefix,
                            })) &&
                        (("string" === typeof input.postfix &&
                            (RegExp(/(.*)_postfix$/).test(input.postfix) ||
                                RegExp(/^-?\d+\.?\d*_postfix$/).test(
                                    input.postfix,
                                ))) ||
                            $guard(_exceptionable, {
                                path: _path + ".postfix",
                                expected:
                                    "(`${number}_postfix` | `${string}_postfix`)",
                                value: input.postfix,
                            })) &&
                        ("the_false_value" === input.middle ||
                            "the_true_value" === input.middle ||
                            ("string" === typeof input.middle &&
                                RegExp(/^the_-?\d+\.?\d*_value$/).test(
                                    input.middle,
                                )) ||
                            $guard(_exceptionable, {
                                path: _path + ".middle",
                                expected:
                                    '("the_false_value" | "the_true_value" | `the_${number}_value`)',
                                value: input.middle,
                            })) &&
                        (null !== input.mixed ||
                            $guard(_exceptionable, {
                                path: _path + ".mixed",
                                expected:
                                    '("the_A_value" | "the_B_value" | __type | `the_${number}_value` | boolean | number)',
                                value: input.mixed,
                            })) &&
                        (undefined !== input.mixed ||
                            $guard(_exceptionable, {
                                path: _path + ".mixed",
                                expected:
                                    '("the_A_value" | "the_B_value" | __type | `the_${number}_value` | boolean | number)',
                                value: input.mixed,
                            })) &&
                        ("the_A_value" === input.mixed ||
                            "the_B_value" === input.mixed ||
                            ("number" === typeof input.mixed &&
                                Number.isFinite(input.mixed)) ||
                            "boolean" === typeof input.mixed ||
                            ("string" === typeof input.mixed &&
                                RegExp(/^the_-?\d+\.?\d*_value$/).test(
                                    input.mixed,
                                )) ||
                            ((("object" === typeof input.mixed &&
                                null !== input.mixed) ||
                                $guard(_exceptionable, {
                                    path: _path + ".mixed",
                                    expected:
                                        '("the_A_value" | "the_B_value" | __type | `the_${number}_value` | boolean | number)',
                                    value: input.mixed,
                                })) &&
                                $ao1(
                                    input.mixed,
                                    _path + ".mixed",
                                    true && _exceptionable,
                                )) ||
                            $guard(_exceptionable, {
                                path: _path + ".mixed",
                                expected:
                                    '("the_A_value" | "the_B_value" | __type | `the_${number}_value` | boolean | number)',
                                value: input.mixed,
                            }));
                    const $ao1 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        "string" === typeof input.name ||
                        $guard(_exceptionable, {
                            path: _path + ".name",
                            expected: "string",
                            value: input.name,
                        });
                    return (
                        ((Array.isArray(input) ||
                            $guard(true, {
                                path: _path + "",
                                expected: "TemplateUnion",
                                value: input,
                            })) &&
                            input.every(
                                (elem: any, _index1: number) =>
                                    ((("object" === typeof elem &&
                                        null !== elem) ||
                                        $guard(true, {
                                            path: _path + "[" + _index1 + "]",
                                            expected: "TemplateUnion.Type",
                                            value: elem,
                                        })) &&
                                        $ao0(
                                            elem,
                                            _path + "[" + _index1 + "]",
                                            true,
                                        )) ||
                                    $guard(true, {
                                        path: _path + "[" + _index1 + "]",
                                        expected: "TemplateUnion.Type",
                                        value: elem,
                                    }),
                            )) ||
                        $guard(true, {
                            path: _path + "",
                            expected: "TemplateUnion",
                            value: input,
                        })
                    );
                })(input, "$input", true);
            return input;
        };
        const stringify = (input: TemplateUnion): string => {
            const $io1 = (input: any): boolean =>
                "string" === typeof input.name;
            const $string = (typia.createAssertStringify as any).string;
            const $number = (typia.createAssertStringify as any).number;
            const $throws = (typia.createAssertStringify as any).throws;
            const $so0 = (input: any): any =>
                `{"prefix":${$string(input.prefix)},"postfix":${$string(
                    input.postfix,
                )},"middle":${$string(input.middle)},"mixed":${(() => {
                    if ("string" === typeof input.mixed)
                        return $string(input.mixed);
                    if ("number" === typeof input.mixed)
                        return $number(input.mixed);
                    if ("boolean" === typeof input.mixed) return input.mixed;
                    if ("object" === typeof input.mixed && null !== input.mixed)
                        return `{"name":${$string((input.mixed as any).name)}}`;
                    $throws({
                        expected:
                            '("the_A_value" | "the_B_value" | __type | `the_${number}_value` | boolean | number)',
                        value: input.mixed,
                    });
                })()}}`;
            return `[${input.map((elem: any) => $so0(elem)).join(",")}]`;
        };
        return stringify(assert(input));
    },
    TemplateUnion.SPOILERS,
);
