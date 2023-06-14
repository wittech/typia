import typia from "../../../src";
import { _test_equals } from "../../internal/_test_equals";
import { AtomicIntersection } from "../../structures/AtomicIntersection";

export const test_createEquals_AtomicIntersection = _test_equals(
    "AtomicIntersection",
    AtomicIntersection.generate,
    typia.createEquals<AtomicIntersection>(),
);
