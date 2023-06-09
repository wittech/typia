import typia from "../../../../src";
import { _test_validateClone } from "../../../internal/_test_validateClone";
import { ClassMethod } from "../../../structures/ClassMethod";

export const test_validateClone_ClassMethod = _test_validateClone(
    "ClassMethod",
    ClassMethod.generate,
    (input) =>
        ((
            input: any,
        ): typia.IValidation<typia.Primitive<ClassMethod.Animal>> => {
            const validate = (
                input: any,
            ): typia.IValidation<ClassMethod.Animal> => {
                const errors = [] as any[];
                const $report = (typia.validateClone as any).report(errors);
                const __is = (input: any): input is ClassMethod.Animal => {
                    return (
                        "object" === typeof input &&
                        null !== input &&
                        "string" === typeof (input as any).name &&
                        "number" === typeof (input as any).age &&
                        Number.isFinite((input as any).age)
                    );
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is ClassMethod.Animal => {
                        const $vo0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): boolean =>
                            [
                                "string" === typeof input.name ||
                                    $report(_exceptionable, {
                                        path: _path + ".name",
                                        expected: "string",
                                        value: input.name,
                                    }),
                                ("number" === typeof input.age &&
                                    Number.isFinite(input.age)) ||
                                    $report(_exceptionable, {
                                        path: _path + ".age",
                                        expected: "number",
                                        value: input.age,
                                    }),
                            ].every((flag: boolean) => flag);
                        return (
                            ((("object" === typeof input && null !== input) ||
                                $report(true, {
                                    path: _path + "",
                                    expected: "ClassMethod.Animal",
                                    value: input,
                                })) &&
                                $vo0(input, _path + "", true)) ||
                            $report(true, {
                                path: _path + "",
                                expected: "ClassMethod.Animal",
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
                input: ClassMethod.Animal,
            ): typia.Primitive<ClassMethod.Animal> => {
                const $co0 = (input: any): any => ({
                    name: input.name as any,
                    age: input.age as any,
                });
                return "object" === typeof input && null !== input
                    ? $co0(input)
                    : (input as any);
            };
            const output = validate(input) as any;
            if (output.success) output.data = clone(input);
            return output;
        })(input),
    ClassMethod.SPOILERS,
);
