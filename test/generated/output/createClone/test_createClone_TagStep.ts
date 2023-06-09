import typia from "../../../../src";
import { _test_clone } from "../../../internal/_test_clone";
import { TagStep } from "../../../structures/TagStep";

export const test_createClone_TagStep = _test_clone(
    "TagStep",
    TagStep.generate,
    (input: TagStep): typia.Primitive<TagStep> => {
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
    },
);
