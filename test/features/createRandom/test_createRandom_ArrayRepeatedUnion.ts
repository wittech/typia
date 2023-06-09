import typia from "../../../src";
import { _test_random } from "../../internal/_test_random";
import { ArrayRepeatedUnion } from "../../structures/ArrayRepeatedUnion";

export const test_createRandom_ArrayRepeatedUnion = _test_random(
    "ArrayRepeatedUnion",
    typia.createRandom<ArrayRepeatedUnion>(),
    typia.createAssert<typia.Primitive<ArrayRepeatedUnion>>(),
);
