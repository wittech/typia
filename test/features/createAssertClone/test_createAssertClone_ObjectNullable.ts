import typia from "typia";

import { ObjectNullable } from "../../structures/ObjectNullable";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_createAssertClone_ObjectNullable = _test_assertClone(
    "ObjectNullable",
    ObjectNullable.generate,
    typia.createAssertClone<ObjectNullable>(),
    ObjectNullable.SPOILERS,
);