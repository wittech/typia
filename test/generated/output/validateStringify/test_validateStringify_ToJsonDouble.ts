import typia from "../../../../src";
import { _test_validateStringify } from "../../../internal/_test_validateStringify";
import { ToJsonDouble } from "../../../structures/ToJsonDouble";

export const test_validateStringify_ToJsonDouble = _test_validateStringify(
    "ToJsonDouble",
    ToJsonDouble.generate,
    (input) =>
        ((input: ToJsonDouble.Parent): typia.IValidation<string> => {
            const validate = (
                input: any,
            ): typia.IValidation<ToJsonDouble.Parent> => {
                const errors = [] as any[];
                const $report = (typia.validateStringify as any).report(errors);
                const __is = (input: any): input is ToJsonDouble.Parent => {
                    return "object" === typeof input && null !== input && true;
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is ToJsonDouble.Parent => {
                        const $vo0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): boolean => true;
                        return (
                            ((("object" === typeof input &&
                                null !== input &&
                                false === Array.isArray(input)) ||
                                $report(true, {
                                    path: _path + "",
                                    expected: "ToJsonDouble.Parent",
                                    value: input,
                                })) &&
                                $vo0(input, _path + "", true)) ||
                            $report(true, {
                                path: _path + "",
                                expected: "ToJsonDouble.Parent",
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
            const stringify = (input: ToJsonDouble.Parent): string => {
                const $number = (typia.validateStringify as any).number;
                const $so0 = (input: any): any =>
                    `{"id":${$number(input.id)},"flag":${input.flag}}`;
                return $so0(input.toJSON());
            };
            const output = validate(input) as any;
            if (output.success) output.data = stringify(input);
            return output;
        })(input),
);
