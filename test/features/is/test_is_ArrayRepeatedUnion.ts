import typia from "../../../src";
import { _test_is } from "../../internal/_test_is";
import { ArrayRepeatedUnion } from "../../structures/ArrayRepeatedUnion";

export const test_is_ArrayRepeatedUnion = _test_is(
    "ArrayRepeatedUnion",
    ArrayRepeatedUnion.generate,
    (input) => typia.is(input),
    ArrayRepeatedUnion.SPOILERS,
);
