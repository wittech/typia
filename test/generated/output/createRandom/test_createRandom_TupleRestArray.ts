import typia from "../../../../src";
import { TupleRestArray } from "../../../structures/TupleRestArray";
import { _test_random } from "../internal/_test_random";

export const test_createRandom_TupleRestArray = _test_random(
    "TupleRestArray",
    (
        generator: Partial<typia.IRandomGenerator> = (typia.createRandom as any)
            .generator,
    ): typia.Primitive<TupleRestArray> => {
        const $generator = (typia.createRandom as any).generator;
        return [
            (generator.boolean ?? $generator.boolean)(),
            (generator.number ?? $generator.number)(0, 100),
            (generator.array ?? $generator.array)(() =>
                (generator.string ?? $generator.string)(),
            ),
        ];
    },
    (input: any): TupleRestArray => {
        const $guard = (typia.createAssert as any).guard;
        ((
            input: any,
            _path: string,
            _exceptionable: boolean = true,
        ): input is TupleRestArray => {
            return (
                (Array.isArray(input) ||
                    $guard(true, {
                        path: _path + "",
                        expected: "[boolean, number, ...Array<string>]",
                        value: input,
                    })) &&
                ("boolean" === typeof input[0] ||
                    $guard(true, {
                        path: _path + "[0]",
                        expected: "boolean",
                        value: input[0],
                    })) &&
                (("number" === typeof input[1] && Number.isFinite(input[1])) ||
                    $guard(true, {
                        path: _path + "[1]",
                        expected: "number",
                        value: input[1],
                    })) &&
                (Array.isArray(input.slice(2)) ||
                    $guard(true, {
                        path: _path + "",
                        expected: "Array<Array<string>>",
                        value: input.slice(2),
                    })) &&
                input.slice(2).every(
                    (elem: any, _index1: number) =>
                        (Array.isArray(elem) ||
                            $guard(true, {
                                path: _path + "[" + (2 + _index1) + "]",
                                expected: "Array<string>",
                                value: elem,
                            })) &&
                        elem.every(
                            (elem: any, _index2: number) =>
                                "string" === typeof elem ||
                                $guard(true, {
                                    path:
                                        _path +
                                        "[" +
                                        (2 + _index1) +
                                        "][" +
                                        _index2 +
                                        "]",
                                    expected: "string",
                                    value: elem,
                                }),
                        ),
                )
            );
        })(input, "$input", true);
        return input;
    },
);