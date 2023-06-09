import typia from "../../../../src";
import { _test_equals } from "../../../internal/_test_equals";
import { TagAtomicUnion } from "../../../structures/TagAtomicUnion";

export const test_createEquals_TagAtomicUnion = _test_equals(
    "TagAtomicUnion",
    TagAtomicUnion.generate,
    (input: any, _exceptionable: boolean = true): input is TagAtomicUnion => {
        const $io0 = (input: any, _exceptionable: boolean = true): boolean =>
            (("string" === typeof input.value &&
                3 <= input.value.length &&
                7 >= input.value.length) ||
                ("number" === typeof input.value &&
                    Number.isFinite(input.value) &&
                    3 <= input.value)) &&
            (1 === Object.keys(input).length ||
                Object.keys(input).every((key: any) => {
                    if (["value"].some((prop: any) => key === prop))
                        return true;
                    const value = input[key];
                    if (undefined === value) return true;
                    return false;
                }));
        return (
            Array.isArray(input) &&
            input.every(
                (elem: any, _index1: number) =>
                    "object" === typeof elem &&
                    null !== elem &&
                    $io0(elem, true),
            )
        );
    },
);
