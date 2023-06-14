import typia from "../../../../src";
import { _test_isPrune } from "../../../internal/_test_isPrune";
import { AtomicIntersection } from "../../../structures/AtomicIntersection";

export const test_createIsPrune_AtomicIntersection = _test_isPrune(
    "AtomicIntersection",
    AtomicIntersection.generate,
    (input: any): input is AtomicIntersection => {
        const is = (input: any): input is AtomicIntersection => {
            return (
                Array.isArray(input) &&
                input.length === 3 &&
                "boolean" === typeof input[0] &&
                "number" === typeof input[1] &&
                Number.isFinite(input[1]) &&
                "string" === typeof input[2]
            );
        };
        const prune = (input: AtomicIntersection): void => {};
        if (!is(input)) return false;
        prune(input);
        return true;
    },
    AtomicIntersection.SPOILERS,
);
