import typia from "../../../../src";
import { _test_clone } from "../../../internal/_test_clone";
import { ConstantIntersection } from "../../../structures/ConstantIntersection";

export const test_clone_ConstantIntersection = _test_clone(
    "ConstantIntersection",
    ConstantIntersection.generate,
    (input) =>
        ((
            input: [
                ConstantIntersection.Wrapper<false>,
                ConstantIntersection.Wrapper<1>,
                ConstantIntersection.Wrapper<"two">,
            ],
        ): typia.Primitive<
            [
                ConstantIntersection.Wrapper<false>,
                ConstantIntersection.Wrapper<1>,
                ConstantIntersection.Wrapper<"two">,
            ]
        > => {
            return Array.isArray(input) &&
                input.length === 3 &&
                false === input[0] &&
                1 === input[1] &&
                "two" === input[2]
                ? ([input[0] as any, input[1] as any, input[2] as any] as any)
                : (input as any);
        })(input),
);
