import typia from "../../../src";
import { _test_is } from "../../internal/_test_is";
import { ArrayRepeatedUnion } from "../../structures/ArrayRepeatedUnion";

export const test_createIs_ArrayRepeatedUnion = _test_is(
    "ArrayRepeatedUnion",
    ArrayRepeatedUnion.generate,
    typia.createIs<ArrayRepeatedUnion>(),
    ArrayRepeatedUnion.SPOILERS,
);
