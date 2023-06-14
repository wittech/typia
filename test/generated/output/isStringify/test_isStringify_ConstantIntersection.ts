import typia from "../../../../src";
import { _test_isStringify } from "../../../internal/_test_isStringify";
import { ConstantIntersection } from "../../../structures/ConstantIntersection";

export const test_isStringify_ConstantIntersection = _test_isStringify(
    "ConstantIntersection",
    ConstantIntersection.generate,
    (input) =>
        ((
            input: [
                ConstantIntersection.Wrapper<false>,
                ConstantIntersection.Wrapper<1>,
                ConstantIntersection.Wrapper<"two">,
            ],
        ): string | null => {
            const is = (
                input: any,
            ): input is [
                ConstantIntersection.Wrapper<false>,
                ConstantIntersection.Wrapper<1>,
                ConstantIntersection.Wrapper<"two">,
            ] => {
                return (
                    Array.isArray(input) &&
                    input.length === 3 &&
                    false === input[0] &&
                    1 === input[1] &&
                    "two" === input[2]
                );
            };
            const stringify = (
                input: [
                    ConstantIntersection.Wrapper<false>,
                    ConstantIntersection.Wrapper<1>,
                    ConstantIntersection.Wrapper<"two">,
                ],
            ): string => {
                const $number = (typia.isStringify as any).number;
                const $string = (typia.isStringify as any).string;
                const $throws = (typia.isStringify as any).throws;
                return `[${input[0]},${$number(input[1])},${(() => {
                    if ("string" === typeof input[2]) return $string(input[2]);
                    if ("string" === typeof input[2])
                        return '"' + input[2] + '"';
                    $throws({
                        expected: '"two"',
                        value: input[2],
                    });
                })()}]`;
            };
            return is(input) ? stringify(input) : null;
        })(input),
    ConstantIntersection.SPOILERS,
);
