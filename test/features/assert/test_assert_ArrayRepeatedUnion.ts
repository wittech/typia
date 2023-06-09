import typia from "../../../src";
import { _test_assert } from "../../internal/_test_assert";
import { ArrayRepeatedUnion } from "../../structures/ArrayRepeatedUnion";

export const test_assert_ArrayRepeatedUnion = _test_assert(
    "ArrayRepeatedUnion",
    ArrayRepeatedUnion.generate,
    (input) => typia.assert(input),
    ArrayRepeatedUnion.SPOILERS,
);
