import typia from "../../../../src";
import { _test_assertClone } from "../../../internal/_test_assertClone";
import { TagCustom } from "../../../structures/TagCustom";

export const test_assertClone_TagCustom = _test_assertClone(
    "TagCustom",
    TagCustom.generate,
    (input) =>
        ((input: any): typia.Primitive<TagCustom> => {
            const assert = (input: any): TagCustom => {
                const __is = (input: any): input is TagCustom => {
                    const $is_uuid = (typia.assertClone as any).is_uuid;
                    const $is_custom = (typia.assertClone as any).is_custom;
                    const $io0 = (input: any): boolean =>
                        "string" === typeof input.id &&
                        $is_uuid(input.id) &&
                        "string" === typeof input.dollar &&
                        $is_custom("dollar", "string", "", input.dollar) &&
                        "string" === typeof input.postfix &&
                        $is_custom(
                            "postfix",
                            "string",
                            "abcd",
                            input.postfix,
                        ) &&
                        "number" === typeof input.log &&
                        Number.isFinite(input.log) &&
                        $is_custom("powerOf", "number", "10", input.log);
                    return (
                        "object" === typeof input &&
                        null !== input &&
                        $io0(input)
                    );
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is TagCustom => {
                        const $guard = (typia.assertClone as any).guard;
                        const $is_uuid = (typia.assertClone as any).is_uuid;
                        const $is_custom = (typia.assertClone as any).is_custom;
                        const $ao0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): boolean =>
                            (("string" === typeof input.id &&
                                ($is_uuid(input.id) ||
                                    $guard(_exceptionable, {
                                        path: _path + ".id",
                                        expected: "string (@format uuid)",
                                        value: input.id,
                                    }))) ||
                                $guard(_exceptionable, {
                                    path: _path + ".id",
                                    expected: "string",
                                    value: input.id,
                                })) &&
                            (("string" === typeof input.dollar &&
                                ($is_custom(
                                    "dollar",
                                    "string",
                                    "",
                                    input.dollar,
                                ) ||
                                    $guard(_exceptionable, {
                                        path: _path + ".dollar",
                                        expected: "string (@dollar)",
                                        value: input.dollar,
                                    }))) ||
                                $guard(_exceptionable, {
                                    path: _path + ".dollar",
                                    expected: "string",
                                    value: input.dollar,
                                })) &&
                            (("string" === typeof input.postfix &&
                                ($is_custom(
                                    "postfix",
                                    "string",
                                    "abcd",
                                    input.postfix,
                                ) ||
                                    $guard(_exceptionable, {
                                        path: _path + ".postfix",
                                        expected: "string (@postfix abcd)",
                                        value: input.postfix,
                                    }))) ||
                                $guard(_exceptionable, {
                                    path: _path + ".postfix",
                                    expected: "string",
                                    value: input.postfix,
                                })) &&
                            (("number" === typeof input.log &&
                                Number.isFinite(input.log) &&
                                ($is_custom(
                                    "powerOf",
                                    "number",
                                    "10",
                                    input.log,
                                ) ||
                                    $guard(_exceptionable, {
                                        path: _path + ".log",
                                        expected: "number (@powerOf 10)",
                                        value: input.log,
                                    }))) ||
                                $guard(_exceptionable, {
                                    path: _path + ".log",
                                    expected: "number",
                                    value: input.log,
                                }));
                        return (
                            ((("object" === typeof input && null !== input) ||
                                $guard(true, {
                                    path: _path + "",
                                    expected: "TagCustom",
                                    value: input,
                                })) &&
                                $ao0(input, _path + "", true)) ||
                            $guard(true, {
                                path: _path + "",
                                expected: "TagCustom",
                                value: input,
                            })
                        );
                    })(input, "$input", true);
                return input;
            };
            const clone = (input: TagCustom): typia.Primitive<TagCustom> => {
                const $is_uuid = (typia.assertClone as any).is_uuid;
                const $is_custom = (typia.assertClone as any).is_custom;
                const $co0 = (input: any): any => ({
                    id: input.id as any,
                    dollar: input.dollar as any,
                    postfix: input.postfix as any,
                    log: input.log as any,
                });
                return "object" === typeof input && null !== input
                    ? $co0(input)
                    : (input as any);
            };
            assert(input);
            const output = clone(input);
            return output;
        })(input),
    TagCustom.SPOILERS,
);
