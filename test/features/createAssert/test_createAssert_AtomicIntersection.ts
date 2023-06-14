import typia from "../../../src";
import { _test_assert } from "../../internal/_test_assert";
import { AtomicIntersection } from "../../structures/AtomicIntersection";

export const test_createAssert_AtomicIntersection = _test_assert(
    "AtomicIntersection",
    AtomicIntersection.generate,
    typia.createAssert<AtomicIntersection>(),
    AtomicIntersection.SPOILERS,
);
