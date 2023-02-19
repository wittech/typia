import typia from "typia";

import { TagLength } from "../../structures/TagLength";
import { _test_isClone } from "../internal/_test_isClone";

export const test_isClone_TagLength = _test_isClone(
    "TagLength",
    TagLength.generate,
    (input) => typia.isClone(input),
    TagLength.SPOILERS,
);