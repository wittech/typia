import typia from "../../../../src";
import { _test_isClone } from "../../../internal/_test_isClone";
import { TagStep } from "../../../structures/TagStep";

export const test_isClone_TagStep = _test_isClone(
    "TagStep",
    TagStep.generate,
    (input) =>
        ((input: any): typia.Primitive<Array<TagStep.Type>> | null => {
            const is = (input: any): input is Array<TagStep.Type> => {
                const $io0 = (input: any): boolean =>
                    "number" === typeof input.exclusiveMinimum &&
                    0 === (input.exclusiveMinimum % 5) - 3 &&
                    3 < input.exclusiveMinimum &&
                    "number" === typeof input.minimum &&
                    0 === (input.minimum % 5) - 3 &&
                    3 <= input.minimum &&
                    "number" === typeof input.range &&
                    0 === (input.range % 5) - 0 &&
                    0 < input.range &&
                    100 > input.range &&
                    "number" === typeof input.multipleOf &&
                    0 === input.multipleOf % 5 &&
                    3 <= input.multipleOf &&
                    99 >= input.multipleOf;
                return (
                    Array.isArray(input) &&
                    input.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $io0(elem),
                    )
                );
            };
            const clone = (
                input: Array<TagStep.Type>,
            ): typia.Primitive<Array<TagStep.Type>> => {
                const $cp0 = (input: any) =>
                    input.map((elem: any) =>
                        "object" === typeof elem && null !== elem
                            ? $co0(elem)
                            : (elem as any),
                    );
                const $co0 = (input: any): any => ({
                    exclusiveMinimum: input.exclusiveMinimum as any,
                    minimum: input.minimum as any,
                    range: input.range as any,
                    multipleOf: input.multipleOf as any,
                });
                return Array.isArray(input) ? $cp0(input) : (input as any);
            };
            if (!is(input)) return null;
            const output = clone(input);
            return output;
        })(input),
    TagStep.SPOILERS,
);
