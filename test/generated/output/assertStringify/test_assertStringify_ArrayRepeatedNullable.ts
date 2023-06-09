import typia from "../../../../src";
import { _test_assertStringify } from "../../../internal/_test_assertStringify";
import { ArrayRepeatedNullable } from "../../../structures/ArrayRepeatedNullable";

export const test_assertStringify_ArrayRepeatedNullable = _test_assertStringify(
    "ArrayRepeatedNullable",
    ArrayRepeatedNullable.generate,
    (input) =>
        ((input: any): string => {
            const assert = (
                input: any,
            ): string | number | Array<ArrayRepeatedNullable> | null => {
                const __is = (
                    input: any,
                ): input is
                    | string
                    | number
                    | Array<ArrayRepeatedNullable>
                    | null => {
                    const $ia0 = (input: any): any =>
                        input.every(
                            (elem: any) =>
                                undefined !== elem &&
                                (null === elem ||
                                    "string" === typeof elem ||
                                    ("number" === typeof elem &&
                                        Number.isFinite(elem)) ||
                                    (Array.isArray(elem) &&
                                        ($ia0(elem) || false))),
                        );
                    return (
                        undefined !== input &&
                        (null === input ||
                            "string" === typeof input ||
                            ("number" === typeof input &&
                                Number.isFinite(input)) ||
                            (Array.isArray(input) && ($ia0(input) || false)))
                    );
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is
                        | string
                        | number
                        | Array<ArrayRepeatedNullable>
                        | null => {
                        const $guard = (typia.assertStringify as any).guard;
                        const $aa0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): any =>
                            input.every(
                                (elem: any, _index1: number) =>
                                    (undefined !== elem ||
                                        $guard(_exceptionable, {
                                            path: _path + "[" + _index1 + "]",
                                            expected:
                                                "(Array<ArrayRepeatedNullable> | null | number | string)",
                                            value: elem,
                                        })) &&
                                    (null === elem ||
                                        "string" === typeof elem ||
                                        ("number" === typeof elem &&
                                            Number.isFinite(elem)) ||
                                        ((Array.isArray(elem) ||
                                            $guard(_exceptionable, {
                                                path:
                                                    _path + "[" + _index1 + "]",
                                                expected:
                                                    "(Array<ArrayRepeatedNullable> | null | number | string)",
                                                value: elem,
                                            })) &&
                                            ($aa0(
                                                elem,
                                                _path + "[" + _index1 + "]",
                                                true && _exceptionable,
                                            ) ||
                                                $guard(_exceptionable, {
                                                    path:
                                                        _path +
                                                        "[" +
                                                        _index1 +
                                                        "]",
                                                    expected:
                                                        "Array<ArrayRepeatedNullable>",
                                                    value: elem,
                                                }))) ||
                                        $guard(_exceptionable, {
                                            path: _path + "[" + _index1 + "]",
                                            expected:
                                                "(Array<ArrayRepeatedNullable> | null | number | string)",
                                            value: elem,
                                        })),
                            );
                        return (
                            (undefined !== input ||
                                $guard(true, {
                                    path: _path + "",
                                    expected:
                                        "(Array<ArrayRepeatedNullable> | null | number | string)",
                                    value: input,
                                })) &&
                            (null === input ||
                                "string" === typeof input ||
                                ("number" === typeof input &&
                                    Number.isFinite(input)) ||
                                ((Array.isArray(input) ||
                                    $guard(true, {
                                        path: _path + "",
                                        expected:
                                            "(Array<ArrayRepeatedNullable> | null | number | string)",
                                        value: input,
                                    })) &&
                                    ($aa0(
                                        input,
                                        _path + "",
                                        true && _exceptionable,
                                    ) ||
                                        $guard(_exceptionable, {
                                            path: _path + "",
                                            expected:
                                                "Array<ArrayRepeatedNullable>",
                                            value: input,
                                        }))) ||
                                $guard(true, {
                                    path: _path + "",
                                    expected:
                                        "(Array<ArrayRepeatedNullable> | null | number | string)",
                                    value: input,
                                }))
                        );
                    })(input, "$input", true);
                return input;
            };
            const stringify = (
                input: string | number | Array<ArrayRepeatedNullable> | null,
            ): string => {
                const $ia0 = (input: any): any =>
                    input.every(
                        (elem: any) =>
                            undefined !== elem &&
                            (null === elem ||
                                "string" === typeof elem ||
                                "number" === typeof elem ||
                                (Array.isArray(elem) && ($ia0(elem) || false))),
                    );
                const $string = (typia.assertStringify as any).string;
                const $number = (typia.assertStringify as any).number;
                const $throws = (typia.assertStringify as any).throws;
                const $sa0 = (input: any): any =>
                    `[${input
                        .map((elem: any) =>
                            null !== elem
                                ? (() => {
                                      if ("string" === typeof elem)
                                          return $string(elem);
                                      if ("number" === typeof elem)
                                          return $number(elem);
                                      if (Array.isArray(elem))
                                          return $sa0(elem);
                                      $throws({
                                          expected:
                                              "(Array<ArrayRepeatedNullable> | null | number | string)",
                                          value: elem,
                                      });
                                  })()
                                : "null",
                        )
                        .join(",")}]`;
                return null !== input
                    ? (() => {
                          if ("string" === typeof input) return $string(input);
                          if ("number" === typeof input)
                              return $number(input).toString();
                          if (Array.isArray(input)) return $sa0(input);
                          $throws({
                              expected:
                                  "(Array<ArrayRepeatedNullable> | null | number | string)",
                              value: input,
                          });
                      })()
                    : "null";
            };
            return stringify(assert(input));
        })(input),
    ArrayRepeatedNullable.SPOILERS,
);
