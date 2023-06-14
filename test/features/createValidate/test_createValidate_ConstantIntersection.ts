import typia from "../../../src";
import { _test_validate } from "../../internal/_test_validate";
import { ConstantIntersection } from "../../structures/ConstantIntersection";

export const test_createValidate_ConstantIntersection = _test_validate(
    "ConstantIntersection",
    ConstantIntersection.generate,
    typia.createValidate<ConstantIntersection>(),
    ConstantIntersection.SPOILERS,
);
