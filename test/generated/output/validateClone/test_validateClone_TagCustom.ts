import typia from "../../../../src";
import { _test_validateClone } from "../../../internal/_test_validateClone";
import { TagCustom } from "../../../structures/TagCustom";

export const test_validateClone_TagCustom = _test_validateClone(
    "TagCustom",
    TagCustom.generate,
    (input) =>
        ((input: any): typia.IValidation<typia.Primitive<TagCustom>> => {
            const validate = (input: any): typia.IValidation<TagCustom> => {
                const errors = [] as any[];
                const $report = (typia.validateClone as any).report(errors);
                const $is_uuid = (typia.validateClone as any).is_uuid;
                const $is_custom = (typia.validateClone as any).is_custom;
                ((
                    input: any,
                    _path: string,
                    _exceptionable: boolean = true,
                ): input is TagCustom => {
                    const $vo0 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        [
                            ("string" === typeof input.id &&
                                true === $is_uuid(input.id)) ||
                                $report(_exceptionable, {
                                    path: _path + ".id",
                                    expected: "string",
                                    value: input.id,
                                }),
                            ("string" === typeof input.dolloar &&
                                $is_custom(
                                    "dollar",
                                    "string",
                                    "",
                                    input.dolloar,
                                )) ||
                                $report(_exceptionable, {
                                    path: _path + ".dolloar",
                                    expected: "string",
                                    value: input.dolloar,
                                }),
                            ("string" === typeof input.postfix &&
                                $is_custom(
                                    "postfix",
                                    "string",
                                    "abcd",
                                    input.postfix,
                                )) ||
                                $report(_exceptionable, {
                                    path: _path + ".postfix",
                                    expected: "string",
                                    value: input.postfix,
                                }),
                            ("number" === typeof input.log &&
                                Number.isFinite(input.log) &&
                                $is_custom(
                                    "powerOf",
                                    "number",
                                    "10",
                                    input.log,
                                )) ||
                                $report(_exceptionable, {
                                    path: _path + ".log",
                                    expected: "number",
                                    value: input.log,
                                }),
                        ].every((flag: boolean) => flag);
                    return (
                        ((("object" === typeof input && null !== input) ||
                            $report(true, {
                                path: _path + "",
                                expected: "Resolve<TagCustom>",
                                value: input,
                            })) &&
                            $vo0(input, _path + "", true)) ||
                        $report(true, {
                            path: _path + "",
                            expected: "Resolve<TagCustom>",
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
            const clone = (input: TagCustom): typia.Primitive<TagCustom> => {
                const $is_uuid = (typia.validateClone as any).is_uuid;
                const $is_custom = (typia.validateClone as any).is_custom;
                const $co0 = (input: any): any => ({
                    id: input.id as any,
                    dolloar: input.dolloar as any,
                    postfix: input.postfix as any,
                    log: input.log as any,
                });
                return "object" === typeof input && null !== input
                    ? $co0(input)
                    : (input as any);
            };
            const output = validate(input) as any;
            if (output.success) output.data = clone(input);
            return output;
        })(input),
    TagCustom.SPOILERS,
);