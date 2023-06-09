import typia from "../../../../src";
import { _test_validateClone } from "../../../internal/_test_validateClone";
import { ArrayRepeatedNullable } from "../../../structures/ArrayRepeatedNullable";

export const test_validateClone_ArrayRepeatedNullable = _test_validateClone(
    "ArrayRepeatedNullable",
    ArrayRepeatedNullable.generate,
    (input) =>
        ((
            input: any,
        ): typia.IValidation<
            typia.Primitive<
                string | number | Array<ArrayRepeatedNullable> | null
            >
        > => {
            const validate = (
                input: any,
            ): typia.IValidation<
                string | number | Array<ArrayRepeatedNullable> | null
            > => {
                const errors = [] as any[];
                const $report = (typia.validateClone as any).report(errors);
                const __is = (
                    input: any,
                ): input is
                    | string
                    | number
                    | Array<ArrayRepeatedNullable>
                    | null => {
                    const $ia0 = (input: any): any =>
                        input.every(
                            (elem: any) =>
                                undefined !== elem &&
                                (null === elem ||
                                    "string" === typeof elem ||
                                    ("number" === typeof elem &&
                                        Number.isFinite(elem)) ||
                                    (Array.isArray(elem) &&
                                        ($ia0(elem) || false))),
                        );
                    return (
                        undefined !== input &&
                        (null === input ||
                            "string" === typeof input ||
                            ("number" === typeof input &&
                                Number.isFinite(input)) ||
                            (Array.isArray(input) && ($ia0(input) || false)))
                    );
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is
                        | string
                        | number
                        | Array<ArrayRepeatedNullable>
                        | null => {
                        const $va0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): any =>
                            input
                                .map(
                                    (elem: any, _index1: number) =>
                                        (undefined !== elem ||
                                            $report(_exceptionable, {
                                                path:
                                                    _path + "[" + _index1 + "]",
                                                expected:
                                                    "(Array<ArrayRepeatedNullable> | null | number | string)",
                                                value: elem,
                                            })) &&
                                        (null === elem ||
                                            "string" === typeof elem ||
                                            ("number" === typeof elem &&
                                                Number.isFinite(elem)) ||
                                            ((Array.isArray(elem) ||
                                                $report(_exceptionable, {
                                                    path:
                                                        _path +
                                                        "[" +
                                                        _index1 +
                                                        "]",
                                                    expected:
                                                        "(Array<ArrayRepeatedNullable> | null | number | string)",
                                                    value: elem,
                                                })) &&
                                                ($va0(
                                                    elem,
                                                    _path + "[" + _index1 + "]",
                                                    true && _exceptionable,
                                                ) ||
                                                    $report(_exceptionable, {
                                                        path:
                                                            _path +
                                                            "[" +
                                                            _index1 +
                                                            "]",
                                                        expected:
                                                            "Array<ArrayRepeatedNullable>",
                                                        value: elem,
                                                    }))) ||
                                            $report(_exceptionable, {
                                                path:
                                                    _path + "[" + _index1 + "]",
                                                expected:
                                                    "(Array<ArrayRepeatedNullable> | null | number | string)",
                                                value: elem,
                                            })),
                                )
                                .every((flag: boolean) => flag);
                        return (
                            (undefined !== input ||
                                $report(true, {
                                    path: _path + "",
                                    expected:
                                        "(Array<ArrayRepeatedNullable> | null | number | string)",
                                    value: input,
                                })) &&
                            (null === input ||
                                "string" === typeof input ||
                                ("number" === typeof input &&
                                    Number.isFinite(input)) ||
                                ((Array.isArray(input) ||
                                    $report(true, {
                                        path: _path + "",
                                        expected:
                                            "(Array<ArrayRepeatedNullable> | null | number | string)",
                                        value: input,
                                    })) &&
                                    ($va0(
                                        input,
                                        _path + "",
                                        true && _exceptionable,
                                    ) ||
                                        $report(_exceptionable, {
                                            path: _path + "",
                                            expected:
                                                "Array<ArrayRepeatedNullable>",
                                            value: input,
                                        }))) ||
                                $report(true, {
                                    path: _path + "",
                                    expected:
                                        "(Array<ArrayRepeatedNullable> | null | number | string)",
                                    value: input,
                                }))
                        );
                    })(input, "$input", true);
                const success = 0 === errors.length;
                return {
                    success,
                    errors,
                    data: success ? input : undefined,
                } as any;
            };
            const clone = (
                input: string | number | Array<ArrayRepeatedNullable> | null,
            ): typia.Primitive<
                string | number | Array<ArrayRepeatedNullable> | null
            > => {
                const $ia0 = (input: any): any =>
                    input.every(
                        (elem: any) =>
                            undefined !== elem &&
                            (null === elem ||
                                "string" === typeof elem ||
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
            const output = validate(input) as any;
            if (output.success) output.data = clone(input);
            return output;
        })(input),
    ArrayRepeatedNullable.SPOILERS,
);
