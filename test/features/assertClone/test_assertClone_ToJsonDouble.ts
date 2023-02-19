import typia from "typia";

import { ToJsonDouble } from "../../structures/ToJsonDouble";
import { _test_assertClone } from "../internal/_test_assertClone";

export const test_assertClone_ToJsonDouble = _test_assertClone(
    "ToJsonDouble",
    ToJsonDouble.generate,
    (input) => typia.assertClone(input),
);