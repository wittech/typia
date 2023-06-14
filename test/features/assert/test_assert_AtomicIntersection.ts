import typia from "../../../src";
import { _test_assert } from "../../internal/_test_assert";
import { AtomicIntersection } from "../../structures/AtomicIntersection";

export const test_assert_AtomicIntersection = _test_assert(
    "AtomicIntersection",
    AtomicIntersection.generate,
    (input) => typia.assert(input),
    AtomicIntersection.SPOILERS,
);
