import typia from "../../../../src";
import { _test_assertStringify } from "../../../internal/_test_assertStringify";
import { AtomicUnion } from "../../../structures/AtomicUnion";

export const test_assertStringify_AtomicUnion = _test_assertStringify(
    "AtomicUnion",
    AtomicUnion.generate,
    (input) =>
        ((input: any): string => {
            const assert = (input: any): Array<AtomicUnion.Union> => {
                const __is = (
                    input: any,
                ): input is Array<AtomicUnion.Union> => {
                    return (
                        Array.isArray(input) &&
                        input.every(
                            (elem: any) =>
                                null === elem ||
                                "string" === typeof elem ||
                                ("number" === typeof elem &&
                                    Number.isFinite(elem)) ||
                                "boolean" === typeof elem,
                        )
                    );
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is Array<AtomicUnion.Union> => {
                        const $guard = (typia.assertStringify as any).guard;
                        return (
                            ((Array.isArray(input) ||
                                $guard(true, {
                                    path: _path + "",
                                    expected: "AtomicUnion",
                                    value: input,
                                })) &&
                                input.every(
                                    (elem: any, _index1: number) =>
                                        null === elem ||
                                        "string" === typeof elem ||
                                        ("number" === typeof elem &&
                                            Number.isFinite(elem)) ||
                                        "boolean" === typeof elem ||
                                        $guard(true, {
                                            path: _path + "[" + _index1 + "]",
                                            expected:
                                                "(boolean | null | number | string)",
                                            value: elem,
                                        }),
                                )) ||
                            $guard(true, {
                                path: _path + "",
                                expected: "AtomicUnion",
                                value: input,
                            })
                        );
                    })(input, "$input", true);
                return input;
            };
            const stringify = (input: Array<AtomicUnion.Union>): string => {
                const $string = (typia.assertStringify as any).string;
                const $number = (typia.assertStringify as any).number;
                const $throws = (typia.assertStringify as any).throws;
                return `[${input
                    .map((elem: any) =>
                        null !== elem
                            ? (() => {
                                  if ("string" === typeof elem)
                                      return $string(elem);
                                  if ("number" === typeof elem)
                                      return $number(elem);
                                  if ("boolean" === typeof elem) return elem;
                                  $throws({
                                      expected:
                                          "(boolean | null | number | string)",
                                      value: elem,
                                  });
                              })()
                            : "null",
                    )
                    .join(",")}]`;
            };
            return stringify(assert(input));
        })(input),
    AtomicUnion.SPOILERS,
);
