import typia from "../../../src";
import { ToJsonAtomicSimple } from "../../structures/ToJsonAtomicSimple";
import { _test_stringify } from "../internal/_test_stringify";

export const test_createStringify_ToJsonAtomicSimple = _test_stringify(
    "ToJsonAtomicSimple",
    ToJsonAtomicSimple.generate,
    typia.createStringify<ToJsonAtomicSimple>(),
);