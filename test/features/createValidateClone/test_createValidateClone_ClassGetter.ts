import typia from "typia";

import { ClassGetter } from "../../structures/ClassGetter";
import { _test_validateClone } from "../internal/_test_validateClone";

export const test_createValidateClone_ClassGetter = _test_validateClone(
    "ClassGetter",
    ClassGetter.generate,
    typia.createValidateClone<ClassGetter>(),
    ClassGetter.SPOILERS,
);