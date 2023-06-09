import typia from "../../../src";
import { _test_validate } from "../../internal/_test_validate";
import { ArrayRepeatedNullable } from "../../structures/ArrayRepeatedNullable";

export const test_validate_ArrayRepeatedNullable = _test_validate(
    "ArrayRepeatedNullable",
    ArrayRepeatedNullable.generate,
    (input) => typia.validate(input),
    ArrayRepeatedNullable.SPOILERS,
);
