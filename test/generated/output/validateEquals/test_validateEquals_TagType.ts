import typia from "../../../../src";
import { _test_validateEquals } from "../../../internal/_test_validateEquals";
import { TagType } from "../../../structures/TagType";

export const test_validateEquals_TagType = _test_validateEquals(
    "TagType",
    TagType.generate,
    (input) =>
        ((input: any): typia.IValidation<Array<TagType.Type>> => {
            const errors = [] as any[];
            const $report = (typia.validateEquals as any).report(errors);
            const __is = (
                input: any,
                _exceptionable: boolean = true,
            ): input is Array<TagType.Type> => {
                const $io0 = (
                    input: any,
                    _exceptionable: boolean = true,
                ): boolean =>
                    "number" === typeof input.int &&
                    Number.isFinite(input.int) &&
                    parseInt(input.int) === input.int &&
                    "number" === typeof input.uint &&
                    Number.isFinite(input.uint) &&
                    parseInt(input.uint) === input.uint &&
                    0 <= input.uint &&
                    (2 === Object.keys(input).length ||
                        Object.keys(input).every((key: any) => {
                            if (
                                ["int", "uint"].some(
                                    (prop: any) => key === prop,
                                )
                            )
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
                ): input is Array<TagType.Type> => {
                    const $join = (typia.validateEquals as any).join;
                    const $vo0 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        [
                            ("number" === typeof input.int &&
                                Number.isFinite(input.int) &&
                                (parseInt(input.int) === input.int ||
                                    $report(_exceptionable, {
                                        path: _path + ".int",
                                        expected: "number (@type int)",
                                        value: input.int,
                                    }))) ||
                                $report(_exceptionable, {
                                    path: _path + ".int",
                                    expected: "number",
                                    value: input.int,
                                }),
                            ("number" === typeof input.uint &&
                                Number.isFinite(input.uint) &&
                                (parseInt(input.uint) === input.uint ||
                                    $report(_exceptionable, {
                                        path: _path + ".uint",
                                        expected: "number (@type uint)",
                                        value: input.uint,
                                    })) &&
                                (0 <= input.uint ||
                                    $report(_exceptionable, {
                                        path: _path + ".uint",
                                        expected: "number (@type uint)",
                                        value: input.uint,
                                    }))) ||
                                $report(_exceptionable, {
                                    path: _path + ".uint",
                                    expected: "number",
                                    value: input.uint,
                                }),
                            2 === Object.keys(input).length ||
                                false === _exceptionable ||
                                Object.keys(input)
                                    .map((key: any) => {
                                        if (
                                            ["int", "uint"].some(
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
                                expected: "Array<TagType.Type>",
                                value: input,
                            })) &&
                            input
                                .map(
                                    (elem: any, _index1: number) =>
                                        ((("object" === typeof elem &&
                                            null !== elem) ||
                                            $report(true, {
                                                path:
                                                    _path + "[" + _index1 + "]",
                                                expected: "TagType.Type",
                                                value: elem,
                                            })) &&
                                            $vo0(
                                                elem,
                                                _path + "[" + _index1 + "]",
                                                true,
                                            )) ||
                                        $report(true, {
                                            path: _path + "[" + _index1 + "]",
                                            expected: "TagType.Type",
                                            value: elem,
                                        }),
                                )
                                .every((flag: boolean) => flag)) ||
                        $report(true, {
                            path: _path + "",
                            expected: "Array<TagType.Type>",
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
        })(input),
);
