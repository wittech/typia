import typia from "../../../../src";
import { _test_validatePrune } from "../../../internal/_test_validatePrune";
import { TagNaN } from "../../../structures/TagNaN";

export const test_createValidatePrune_TagNaN = _test_validatePrune(
    "TagNaN",
    TagNaN.generate,
    (input: any): typia.IValidation<TagNaN> => {
        const validate = (input: any): typia.IValidation<TagNaN> => {
            const errors = [] as any[];
            const $report = (typia.createValidatePrune as any).report(errors);
            const __is = (input: any): input is TagNaN => {
                const $io0 = (input: any): boolean =>
                    "number" === typeof input.value &&
                    Number.isFinite(input.value) &&
                    "number" === typeof input.ranged &&
                    0 <= input.ranged &&
                    100 >= input.ranged &&
                    "number" === typeof input.minimum &&
                    Number.isFinite(input.minimum) &&
                    0 <= input.minimum &&
                    "number" === typeof input.maximum &&
                    Number.isFinite(input.maximum) &&
                    100 >= input.maximum &&
                    "number" === typeof input.multipleOf &&
                    0 === input.multipleOf % 3 &&
                    "number" === typeof input.typed &&
                    Number.isFinite(input.typed) &&
                    parseInt(input.typed) === input.typed;
                return (
                    "object" === typeof input && null !== input && $io0(input)
                );
            };
            if (false === __is(input))
                ((
                    input: any,
                    _path: string,
                    _exceptionable: boolean = true,
                ): input is TagNaN => {
                    const $vo0 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        [
                            ("number" === typeof input.value &&
                                Number.isFinite(input.value)) ||
                                $report(_exceptionable, {
                                    path: _path + ".value",
                                    expected: "number",
                                    value: input.value,
                                }),
                            ("number" === typeof input.ranged &&
                                (0 <= input.ranged ||
                                    $report(_exceptionable, {
                                        path: _path + ".ranged",
                                        expected: "number (@minimum 0)",
                                        value: input.ranged,
                                    })) &&
                                (100 >= input.ranged ||
                                    $report(_exceptionable, {
                                        path: _path + ".ranged",
                                        expected: "number (@maximum 100)",
                                        value: input.ranged,
                                    }))) ||
                                $report(_exceptionable, {
                                    path: _path + ".ranged",
                                    expected: "number",
                                    value: input.ranged,
                                }),
                            ("number" === typeof input.minimum &&
                                Number.isFinite(input.minimum) &&
                                (0 <= input.minimum ||
                                    $report(_exceptionable, {
                                        path: _path + ".minimum",
                                        expected: "number (@minimum 0)",
                                        value: input.minimum,
                                    }))) ||
                                $report(_exceptionable, {
                                    path: _path + ".minimum",
                                    expected: "number",
                                    value: input.minimum,
                                }),
                            ("number" === typeof input.maximum &&
                                Number.isFinite(input.maximum) &&
                                (100 >= input.maximum ||
                                    $report(_exceptionable, {
                                        path: _path + ".maximum",
                                        expected: "number (@maximum 100)",
                                        value: input.maximum,
                                    }))) ||
                                $report(_exceptionable, {
                                    path: _path + ".maximum",
                                    expected: "number",
                                    value: input.maximum,
                                }),
                            ("number" === typeof input.multipleOf &&
                                (0 === input.multipleOf % 3 ||
                                    $report(_exceptionable, {
                                        path: _path + ".multipleOf",
                                        expected: "number (@multipleOf 3)",
                                        value: input.multipleOf,
                                    }))) ||
                                $report(_exceptionable, {
                                    path: _path + ".multipleOf",
                                    expected: "number",
                                    value: input.multipleOf,
                                }),
                            ("number" === typeof input.typed &&
                                Number.isFinite(input.typed) &&
                                (parseInt(input.typed) === input.typed ||
                                    $report(_exceptionable, {
                                        path: _path + ".typed",
                                        expected: "number (@type int)",
                                        value: input.typed,
                                    }))) ||
                                $report(_exceptionable, {
                                    path: _path + ".typed",
                                    expected: "number",
                                    value: input.typed,
                                }),
                        ].every((flag: boolean) => flag);
                    return (
                        ((("object" === typeof input && null !== input) ||
                            $report(true, {
                                path: _path + "",
                                expected: "TagNaN",
                                value: input,
                            })) &&
                            $vo0(input, _path + "", true)) ||
                        $report(true, {
                            path: _path + "",
                            expected: "TagNaN",
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
        const prune = (input: TagNaN): void => {
            const $po0 = (input: any): any => {
                for (const key of Object.keys(input)) {
                    if (
                        "value" === key ||
                        "ranged" === key ||
                        "minimum" === key ||
                        "maximum" === key ||
                        "multipleOf" === key ||
                        "typed" === key
                    )
                        continue;
                    delete input[key];
                }
            };
            if ("object" === typeof input && null !== input) $po0(input);
        };
        const output = validate(input);
        if (output.success) prune(input);
        return output;
    },
    TagNaN.SPOILERS,
);
