import typia from "../../../../src";
import { _test_validateEquals } from "../../../internal/_test_validateEquals";
import { TemplateUnion } from "../../../structures/TemplateUnion";

export const test_createValidateEquals_TemplateUnion = _test_validateEquals(
    "TemplateUnion",
    TemplateUnion.generate,
    (input: any): typia.IValidation<TemplateUnion> => {
        const errors = [] as any[];
        const $report = (typia.createValidateEquals as any).report(errors);
        const __is = (
            input: any,
            _exceptionable: boolean = true,
        ): input is TemplateUnion => {
            const $io0 = (
                input: any,
                _exceptionable: boolean = true,
            ): boolean =>
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
                        RegExp(/^the_-?\d+\.?\d*_value$/).test(input.mixed)) ||
                    ("object" === typeof input.mixed &&
                        null !== input.mixed &&
                        $io1(input.mixed, true && _exceptionable))) &&
                (4 === Object.keys(input).length ||
                    Object.keys(input).every((key: any) => {
                        if (
                            ["prefix", "postfix", "middle", "mixed"].some(
                                (prop: any) => key === prop,
                            )
                        )
                            return true;
                        const value = input[key];
                        if (undefined === value) return true;
                        return false;
                    }));
            const $io1 = (
                input: any,
                _exceptionable: boolean = true,
            ): boolean =>
                "string" === typeof input.name &&
                (1 === Object.keys(input).length ||
                    Object.keys(input).every((key: any) => {
                        if (["name"].some((prop: any) => key === prop))
                            return true;
                        const value = input[key];
                        if (undefined === value) return true;
                        return false;
                    }));
            return (
                Array.isArray(input) &&
                input.every(
                    (elem: any, _index1: number) =>
                        "object" === typeof elem &&
                        null !== elem &&
                        $io0(elem, true),
                )
            );
        };
        if (false === __is(input))
            ((
                input: any,
                _path: string,
                _exceptionable: boolean = true,
            ): input is TemplateUnion => {
                const $join = (typia.createValidateEquals as any).join;
                const $vo0 = (
                    input: any,
                    _path: string,
                    _exceptionable: boolean = true,
                ): boolean =>
                    [
                        ("string" === typeof input.prefix &&
                            (RegExp(/^prefix_(.*)/).test(input.prefix) ||
                                RegExp(/^prefix_-?\d+\.?\d*$/).test(
                                    input.prefix,
                                ))) ||
                            $report(_exceptionable, {
                                path: _path + ".prefix",
                                expected:
                                    "(`prefix_${number}` | `prefix_${string}`)",
                                value: input.prefix,
                            }),
                        ("string" === typeof input.postfix &&
                            (RegExp(/(.*)_postfix$/).test(input.postfix) ||
                                RegExp(/^-?\d+\.?\d*_postfix$/).test(
                                    input.postfix,
                                ))) ||
                            $report(_exceptionable, {
                                path: _path + ".postfix",
                                expected:
                                    "(`${number}_postfix` | `${string}_postfix`)",
                                value: input.postfix,
                            }),
                        "the_false_value" === input.middle ||
                            "the_true_value" === input.middle ||
                            ("string" === typeof input.middle &&
                                RegExp(/^the_-?\d+\.?\d*_value$/).test(
                                    input.middle,
                                )) ||
                            $report(_exceptionable, {
                                path: _path + ".middle",
                                expected:
                                    '("the_false_value" | "the_true_value" | `the_${number}_value`)',
                                value: input.middle,
                            }),
                        (null !== input.mixed ||
                            $report(_exceptionable, {
                                path: _path + ".mixed",
                                expected:
                                    '("the_A_value" | "the_B_value" | __type | `the_${number}_value` | boolean | number)',
                                value: input.mixed,
                            })) &&
                            (undefined !== input.mixed ||
                                $report(_exceptionable, {
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
                                    $report(_exceptionable, {
                                        path: _path + ".mixed",
                                        expected:
                                            '("the_A_value" | "the_B_value" | __type | `the_${number}_value` | boolean | number)',
                                        value: input.mixed,
                                    })) &&
                                    $vo1(
                                        input.mixed,
                                        _path + ".mixed",
                                        true && _exceptionable,
                                    )) ||
                                $report(_exceptionable, {
                                    path: _path + ".mixed",
                                    expected:
                                        '("the_A_value" | "the_B_value" | __type | `the_${number}_value` | boolean | number)',
                                    value: input.mixed,
                                })),
                        4 === Object.keys(input).length ||
                            false === _exceptionable ||
                            Object.keys(input)
                                .map((key: any) => {
                                    if (
                                        [
                                            "prefix",
                                            "postfix",
                                            "middle",
                                            "mixed",
                                        ].some((prop: any) => key === prop)
                                    )
                                        return true;
                                    const value = input[key];
                                    if (undefined === value) return true;
                                    return $report(_exceptionable, {
                                        path: _path + $join(key),
                                        expected: "undefined",
                                        value: value,
                                    });
                                })
                                .every((flag: boolean) => flag),
                    ].every((flag: boolean) => flag);
                const $vo1 = (
                    input: any,
                    _path: string,
                    _exceptionable: boolean = true,
                ): boolean =>
                    [
                        "string" === typeof input.name ||
                            $report(_exceptionable, {
                                path: _path + ".name",
                                expected: "string",
                                value: input.name,
                            }),
                        1 === Object.keys(input).length ||
                            false === _exceptionable ||
                            Object.keys(input)
                                .map((key: any) => {
                                    if (
                                        ["name"].some(
                                            (prop: any) => key === prop,
                                        )
                                    )
                                        return true;
                                    const value = input[key];
                                    if (undefined === value) return true;
                                    return $report(_exceptionable, {
                                        path: _path + $join(key),
                                        expected: "undefined",
                                        value: value,
                                    });
                                })
                                .every((flag: boolean) => flag),
                    ].every((flag: boolean) => flag);
                return (
                    ((Array.isArray(input) ||
                        $report(true, {
                            path: _path + "",
                            expected: "TemplateUnion",
                            value: input,
                        })) &&
                        input
                            .map(
                                (elem: any, _index1: number) =>
                                    ((("object" === typeof elem &&
                                        null !== elem) ||
                                        $report(true, {
                                            path: _path + "[" + _index1 + "]",
                                            expected: "TemplateUnion.Type",
                                            value: elem,
                                        })) &&
                                        $vo0(
                                            elem,
                                            _path + "[" + _index1 + "]",
                                            true,
                                        )) ||
                                    $report(true, {
                                        path: _path + "[" + _index1 + "]",
                                        expected: "TemplateUnion.Type",
                                        value: elem,
                                    }),
                            )
                            .every((flag: boolean) => flag)) ||
                    $report(true, {
                        path: _path + "",
                        expected: "TemplateUnion",
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
    },
);
