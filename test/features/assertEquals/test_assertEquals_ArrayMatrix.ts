import typia from "../../../src";
import { ArrayMatrix } from "../../structures/ArrayMatrix";
import { _test_assertEquals } from "../internal/_test_assertEquals";

export const test_assertEquals_ArrayMatrix = _test_assertEquals(
    "ArrayMatrix",
    ArrayMatrix.generate,
    (input) => typia.assertEquals(input),
);