import typia from "../../../../src";
import { _test_validateClone } from "../../../internal/_test_validateClone";
import { ArrayUnion } from "../../../structures/ArrayUnion";

export const test_validateClone_ArrayUnion = _test_validateClone(
    "ArrayUnion",
    ArrayUnion.generate,
    (input) =>
        ((
            input: any,
        ): typia.IValidation<typia.Primitive<Array<ArrayUnion.IUnion>>> => {
            const validate = (
                input: any,
            ): typia.IValidation<Array<ArrayUnion.IUnion>> => {
                const errors = [] as any[];
                const $report = (typia.validateClone as any).report(errors);
                const __is = (
                    input: any,
                ): input is Array<ArrayUnion.IUnion> => {
                    const $ip0 = (input: any) => {
                        const array = input;
                        const top = input[0];
                        if (0 === input.length) return true;
                        const arrayPredicators = [
                            [
                                (top: any): any => "string" === typeof top,
                                (entire: any[]): any =>
                                    entire.every(
                                        (elem: any) => "string" === typeof elem,
                                    ),
                            ],
                            [
                                (top: any): any => "boolean" === typeof top,
                                (entire: any[]): any =>
                                    entire.every(
                                        (elem: any) =>
                                            "boolean" === typeof elem,
                                    ),
                            ],
                            [
                                (top: any): any =>
                                    "number" === typeof top &&
                                    Number.isFinite(top),
                                (entire: any[]): any =>
                                    entire.every(
                                        (elem: any) =>
                                            "number" === typeof elem &&
                                            Number.isFinite(elem),
                                    ),
                            ],
                        ];
                        const passed = arrayPredicators.filter((pred: any) =>
                            pred[0](top),
                        );
                        if (1 === passed.length) return passed[0][1](array);
                        else if (1 < passed.length)
                            for (const pred of passed)
                                if (
                                    array.every(
                                        (value: any) => true === pred[0](value),
                                    )
                                )
                                    return pred[1](array);
                        return false;
                    };
                    return (
                        Array.isArray(input) &&
                        input.every(
                            (elem: any) =>
                                Array.isArray(elem) && ($ip0(elem) || false),
                        )
                    );
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is Array<ArrayUnion.IUnion> => {
                        const $vp0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ) => {
                            const array = input;
                            const top = input[0];
                            if (0 === input.length) return true;
                            const arrayPredicators = [
                                [
                                    (top: any): any => "string" === typeof top,
                                    (entire: any[]): any =>
                                        entire
                                            .map(
                                                (elem: any, _index5: number) =>
                                                    "string" === typeof elem ||
                                                    $report(_exceptionable, {
                                                        path:
                                                            _path +
                                                            "[" +
                                                            _index5 +
                                                            "]",
                                                        expected: "string",
                                                        value: elem,
                                                    }),
                                            )
                                            .every((flag: boolean) => flag),
                                ],
                                [
                                    (top: any): any => "boolean" === typeof top,
                                    (entire: any[]): any =>
                                        entire
                                            .map(
                                                (elem: any, _index6: number) =>
                                                    "boolean" === typeof elem ||
                                                    $report(_exceptionable, {
                                                        path:
                                                            _path +
                                                            "[" +
                                                            _index6 +
                                                            "]",
                                                        expected: "boolean",
                                                        value: elem,
                                                    }),
                                            )
                                            .every((flag: boolean) => flag),
                                ],
                                [
                                    (top: any): any =>
                                        "number" === typeof top &&
                                        Number.isFinite(top),
                                    (entire: any[]): any =>
                                        entire
                                            .map(
                                                (elem: any, _index7: number) =>
                                                    ("number" === typeof elem &&
                                                        Number.isFinite(
                                                            elem,
                                                        )) ||
                                                    $report(_exceptionable, {
                                                        path:
                                                            _path +
                                                            "[" +
                                                            _index7 +
                                                            "]",
                                                        expected: "number",
                                                        value: elem,
                                                    }),
                                            )
                                            .every((flag: boolean) => flag),
                                ],
                            ];
                            const passed = arrayPredicators.filter(
                                (pred: any) => pred[0](top),
                            );
                            if (1 === passed.length) return passed[0][1](array);
                            else if (1 < passed.length)
                                for (const pred of passed)
                                    if (
                                        array.every(
                                            (value: any) =>
                                                true === pred[0](value),
                                        )
                                    )
                                        return pred[1](array);
                            return $report(_exceptionable, {
                                path: _path,
                                expected:
                                    "(Array<string> | Array<boolean> | Array<number>)",
                                value: input,
                            });
                        };
                        return (
                            ((Array.isArray(input) ||
                                $report(true, {
                                    path: _path + "",
                                    expected: "ArrayUnion",
                                    value: input,
                                })) &&
                                input
                                    .map(
                                        (elem: any, _index1: number) =>
                                            ((Array.isArray(elem) ||
                                                $report(true, {
                                                    path:
                                                        _path +
                                                        "[" +
                                                        _index1 +
                                                        "]",
                                                    expected:
                                                        "(Array<boolean> | Array<number> | Array<string>)",
                                                    value: elem,
                                                })) &&
                                                ($vp0(
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
                                                            "Array<string> | Array<boolean> | Array<number>",
                                                        value: elem,
                                                    }))) ||
                                            $report(true, {
                                                path:
                                                    _path + "[" + _index1 + "]",
                                                expected:
                                                    "(Array<boolean> | Array<number> | Array<string>)",
                                                value: elem,
                                            }),
                                    )
                                    .every((flag: boolean) => flag)) ||
                            $report(true, {
                                path: _path + "",
                                expected: "ArrayUnion",
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
            const clone = (
                input: Array<ArrayUnion.IUnion>,
            ): typia.Primitive<Array<ArrayUnion.IUnion>> => {
                const $throws = (typia.validateClone as any).throws;
                const $cp0 = (input: any) => {
                    const array = input;
                    const top = input[0];
                    if (0 === input.length) return [];
                    const arrayPredicators = [
                        [
                            (top: any): any => "string" === typeof top,
                            (entire: any[]): any =>
                                entire.map((elem: any) => elem as any),
                        ],
                        [
                            (top: any): any => "boolean" === typeof top,
                            (entire: any[]): any =>
                                entire.map((elem: any) => elem as any),
                        ],
                        [
                            (top: any): any => "number" === typeof top,
                            (entire: any[]): any =>
                                entire.map((elem: any) => elem as any),
                        ],
                    ];
                    const passed = arrayPredicators.filter((pred: any) =>
                        pred[0](top),
                    );
                    if (1 === passed.length) return passed[0][1](array);
                    else if (1 < passed.length)
                        for (const pred of passed)
                            if (
                                array.every(
                                    (value: any) => true === pred[0](value),
                                )
                            )
                                return pred[1](array);
                    $throws({
                        expected:
                            "(Array<string> | Array<boolean> | Array<number>)",
                        value: input,
                    });
                };
                const $cp1 = (input: any) =>
                    input.map((elem: any) =>
                        Array.isArray(elem) ? $cp0(elem) : (elem as any),
                    );
                return Array.isArray(input) ? $cp1(input) : (input as any);
            };
            const output = validate(input) as any;
            if (output.success) output.data = clone(input);
            return output;
        })(input),
    ArrayUnion.SPOILERS,
);
