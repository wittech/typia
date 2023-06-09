import typia from "../../../../src";
import { _test_prune } from "../../../internal/_test_prune";
import { TagType } from "../../../structures/TagType";

export const test_prune_TagType = _test_prune(
    "TagType",
    TagType.generate,
    (input) =>
        ((input: Array<TagType.Type>): void => {
            const $pp0 = (input: any) =>
                input.forEach((elem: any) => {
                    if ("object" === typeof elem && null !== elem) $po0(elem);
                });
            const $po0 = (input: any): any => {
                for (const key of Object.keys(input)) {
                    if ("int" === key || "uint" === key) continue;
                    delete input[key];
                }
            };
            if (Array.isArray(input)) $pp0(input);
        })(input),
);
