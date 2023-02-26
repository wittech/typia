import typia from "../../../../src";
import { ArraySimple } from "../../../structures/ArraySimple";
import { _test_assertParse } from "../internal/_test_assertParse";

export const test_createAssertParse_ArraySimple = _test_assertParse(
    "ArraySimple",
    ArraySimple.generate,
    (input: string): typia.Primitive<ArraySimple> => {
        const assert = (input: any): ArraySimple => {
            const $guard = (typia.createAssertParse as any).guard;
            ((
                input: any,
                _path: string,
                _exceptionable: boolean = true,
            ): input is ArraySimple => {
                const $ao0 = (
                    input: any,
                    _path: string,
                    _exceptionable: boolean = true,
                ): boolean =>
                    ("string" === typeof input.name ||
                        $guard(_exceptionable, {
                            path: _path + ".name",
                            expected: "string",
                            value: input.name,
                        })) &&
                    ("string" === typeof input.email ||
                        $guard(_exceptionable, {
                            path: _path + ".email",
                            expected: "string",
                            value: input.email,
                        })) &&
                    (Array.isArray(input.hobbies) ||
                        $guard(_exceptionable, {
                            path: _path + ".hobbies",
                            expected: "Array<Resolve<ArraySimple.IHobby>>",
                            value: input.hobbies,
                        })) &&
                    input.hobbies.every(
                        (elem: any, _index2: number) =>
                            (("object" === typeof elem && null !== elem) ||
                                $guard(_exceptionable, {
                                    path: _path + ".hobbies[" + _index2 + "]",
                                    expected: "Resolve<ArraySimple.IHobby>",
                                    value: elem,
                                })) &&
                            $ao1(
                                elem,
                                _path + ".hobbies[" + _index2 + "]",
                                true && _exceptionable,
                            ),
                    );
                const $ao1 = (
                    input: any,
                    _path: string,
                    _exceptionable: boolean = true,
                ): boolean =>
                    ("string" === typeof input.name ||
                        $guard(_exceptionable, {
                            path: _path + ".name",
                            expected: "string",
                            value: input.name,
                        })) &&
                    ("string" === typeof input.body ||
                        $guard(_exceptionable, {
                            path: _path + ".body",
                            expected: "string",
                            value: input.body,
                        })) &&
                    (("number" === typeof input.rank &&
                        Number.isFinite(input.rank)) ||
                        $guard(_exceptionable, {
                            path: _path + ".rank",
                            expected: "number",
                            value: input.rank,
                        }));
                return (
                    (Array.isArray(input) ||
                        $guard(true, {
                            path: _path + "",
                            expected: "Array<Resolve<ArraySimple.IPerson>>",
                            value: input,
                        })) &&
                    input.every(
                        (elem: any, _index1: number) =>
                            (("object" === typeof elem && null !== elem) ||
                                $guard(true, {
                                    path: _path + "[" + _index1 + "]",
                                    expected: "Resolve<ArraySimple.IPerson>",
                                    value: elem,
                                })) &&
                            $ao0(elem, _path + "[" + _index1 + "]", true),
                    )
                );
            })(input, "$input", true);
            return input;
        };
        input = JSON.parse(input);
        return assert(input);
    },
    ArraySimple.SPOILERS,
);