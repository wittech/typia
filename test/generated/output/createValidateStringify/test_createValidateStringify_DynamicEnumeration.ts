import typia from "../../../../src";
import { _test_validateStringify } from "../../../internal/_test_validateStringify";
import { DynamicEnumeration } from "../../../structures/DynamicEnumeration";

export const test_createValidateStringify_DynamicEnumeration =
    _test_validateStringify(
        "DynamicEnumeration",
        DynamicEnumeration.generate,
        (input: DynamicEnumeration): typia.IValidation<string> => {
            const validate = (
                input: any,
            ): typia.IValidation<DynamicEnumeration> => {
                const errors = [] as any[];
                const $report = (typia.createValidateStringify as any).report(
                    errors,
                );
                const __is = (input: any): input is DynamicEnumeration => {
                    const $io0 = (input: any): boolean =>
                        (undefined === input.ar ||
                            "string" === typeof input.ar) &&
                        (undefined === input["zh-Hans"] ||
                            "string" === typeof input["zh-Hans"]) &&
                        (undefined === input["zh-Hant"] ||
                            "string" === typeof input["zh-Hant"]) &&
                        (undefined === input.en ||
                            "string" === typeof input.en) &&
                        (undefined === input.fr ||
                            "string" === typeof input.fr) &&
                        (undefined === input.de ||
                            "string" === typeof input.de) &&
                        (undefined === input.ja ||
                            "string" === typeof input.ja) &&
                        (undefined === input.ko ||
                            "string" === typeof input.ko) &&
                        (undefined === input.pt ||
                            "string" === typeof input.pt) &&
                        (undefined === input.ru ||
                            "string" === typeof input.ru);
                    return (
                        "object" === typeof input &&
                        null !== input &&
                        false === Array.isArray(input) &&
                        $io0(input)
                    );
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is DynamicEnumeration => {
                        const $vo0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): boolean =>
                            [
                                undefined === input.ar ||
                                    "string" === typeof input.ar ||
                                    $report(_exceptionable, {
                                        path: _path + ".ar",
                                        expected: "(string | undefined)",
                                        value: input.ar,
                                    }),
                                undefined === input["zh-Hans"] ||
                                    "string" === typeof input["zh-Hans"] ||
                                    $report(_exceptionable, {
                                        path: _path + '["zh-Hans"]',
                                        expected: "(string | undefined)",
                                        value: input["zh-Hans"],
                                    }),
                                undefined === input["zh-Hant"] ||
                                    "string" === typeof input["zh-Hant"] ||
                                    $report(_exceptionable, {
                                        path: _path + '["zh-Hant"]',
                                        expected: "(string | undefined)",
                                        value: input["zh-Hant"],
                                    }),
                                undefined === input.en ||
                                    "string" === typeof input.en ||
                                    $report(_exceptionable, {
                                        path: _path + ".en",
                                        expected: "(string | undefined)",
                                        value: input.en,
                                    }),
                                undefined === input.fr ||
                                    "string" === typeof input.fr ||
                                    $report(_exceptionable, {
                                        path: _path + ".fr",
                                        expected: "(string | undefined)",
                                        value: input.fr,
                                    }),
                                undefined === input.de ||
                                    "string" === typeof input.de ||
                                    $report(_exceptionable, {
                                        path: _path + ".de",
                                        expected: "(string | undefined)",
                                        value: input.de,
                                    }),
                                undefined === input.ja ||
                                    "string" === typeof input.ja ||
                                    $report(_exceptionable, {
                                        path: _path + ".ja",
                                        expected: "(string | undefined)",
                                        value: input.ja,
                                    }),
                                undefined === input.ko ||
                                    "string" === typeof input.ko ||
                                    $report(_exceptionable, {
                                        path: _path + ".ko",
                                        expected: "(string | undefined)",
                                        value: input.ko,
                                    }),
                                undefined === input.pt ||
                                    "string" === typeof input.pt ||
                                    $report(_exceptionable, {
                                        path: _path + ".pt",
                                        expected: "(string | undefined)",
                                        value: input.pt,
                                    }),
                                undefined === input.ru ||
                                    "string" === typeof input.ru ||
                                    $report(_exceptionable, {
                                        path: _path + ".ru",
                                        expected: "(string | undefined)",
                                        value: input.ru,
                                    }),
                            ].every((flag: boolean) => flag);
                        return (
                            ((("object" === typeof input &&
                                null !== input &&
                                false === Array.isArray(input)) ||
                                $report(true, {
                                    path: _path + "",
                                    expected: "DynamicEnumeration",
                                    value: input,
                                })) &&
                                $vo0(input, _path + "", true)) ||
                            $report(true, {
                                path: _path + "",
                                expected: "DynamicEnumeration",
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
            const stringify = (input: DynamicEnumeration): string => {
                const $string = (typia.createValidateStringify as any).string;
                const $tail = (typia.createValidateStringify as any).tail;
                const $so0 = (input: any): any =>
                    `{${$tail(
                        `${
                            undefined === input.ar
                                ? ""
                                : `"ar":${
                                      undefined !== input.ar
                                          ? $string(input.ar)
                                          : undefined
                                  },`
                        }${
                            undefined === input["zh-Hans"]
                                ? ""
                                : `"zh-Hans":${
                                      undefined !== input["zh-Hans"]
                                          ? $string(input["zh-Hans"])
                                          : undefined
                                  },`
                        }${
                            undefined === input["zh-Hant"]
                                ? ""
                                : `"zh-Hant":${
                                      undefined !== input["zh-Hant"]
                                          ? $string(input["zh-Hant"])
                                          : undefined
                                  },`
                        }${
                            undefined === input.en
                                ? ""
                                : `"en":${
                                      undefined !== input.en
                                          ? $string(input.en)
                                          : undefined
                                  },`
                        }${
                            undefined === input.fr
                                ? ""
                                : `"fr":${
                                      undefined !== input.fr
                                          ? $string(input.fr)
                                          : undefined
                                  },`
                        }${
                            undefined === input.de
                                ? ""
                                : `"de":${
                                      undefined !== input.de
                                          ? $string(input.de)
                                          : undefined
                                  },`
                        }${
                            undefined === input.ja
                                ? ""
                                : `"ja":${
                                      undefined !== input.ja
                                          ? $string(input.ja)
                                          : undefined
                                  },`
                        }${
                            undefined === input.ko
                                ? ""
                                : `"ko":${
                                      undefined !== input.ko
                                          ? $string(input.ko)
                                          : undefined
                                  },`
                        }${
                            undefined === input.pt
                                ? ""
                                : `"pt":${
                                      undefined !== input.pt
                                          ? $string(input.pt)
                                          : undefined
                                  },`
                        }${
                            undefined === input.ru
                                ? ""
                                : `"ru":${
                                      undefined !== input.ru
                                          ? $string(input.ru)
                                          : undefined
                                  }`
                        }`,
                    )}}`;
                return $so0(input);
            };
            const output = validate(input) as any;
            if (output.success) output.data = stringify(input);
            return output;
        },
        DynamicEnumeration.SPOILERS,
    );
