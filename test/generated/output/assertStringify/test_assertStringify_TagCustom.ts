import typia from "../../../../src";
import { _test_assertStringify } from "../../../internal/_test_assertStringify";
import { TagCustom } from "../../../structures/TagCustom";

export const test_assertStringify_TagCustom = _test_assertStringify(
    "TagCustom",
    TagCustom.generate,
    (input) =>
        ((input: any): string => {
            const assert = (input: any): TagCustom => {
                const __is = (input: any): input is TagCustom => {
                    const $is_uuid = (typia.assertStringify as any).is_uuid;
                    const $is_custom = (typia.assertStringify as any).is_custom;
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
                        const $guard = (typia.assertStringify as any).guard;
                        const $is_uuid = (typia.assertStringify as any).is_uuid;
                        const $is_custom = (typia.assertStringify as any)
                            .is_custom;
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
            const stringify = (input: TagCustom): string => {
                const $string = (typia.assertStringify as any).string;
                const $number = (typia.assertStringify as any).number;
                const $is_uuid = (typia.assertStringify as any).is_uuid;
                const $is_custom = (typia.assertStringify as any).is_custom;
                const $so0 = (input: any): any =>
                    `{"id":${$string(input.id)},"dollar":${$string(
                        input.dollar,
                    )},"postfix":${$string(input.postfix)},"log":${$number(
                        input.log,
                    )}}`;
                return $so0(input);
            };
            return stringify(assert(input));
        })(input),
    TagCustom.SPOILERS,
);
