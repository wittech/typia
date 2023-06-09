import typia from "../../../src";
import { _test_isClone } from "../../internal/_test_isClone";
import { ArrayRepeatedUnionWithTuple } from "../../structures/ArrayRepeatedUnionWithTuple";

export const test_createIsClone_ArrayRepeatedUnionWithTuple = _test_isClone(
    "ArrayRepeatedUnionWithTuple",
    ArrayRepeatedUnionWithTuple.generate,
    typia.createIsClone<ArrayRepeatedUnionWithTuple>(),
    ArrayRepeatedUnionWithTuple.SPOILERS,
);
