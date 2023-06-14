import typia from "../../../src";
import { _test_validateEquals } from "../../internal/_test_validateEquals";
import { ConstantIntersection } from "../../structures/ConstantIntersection";

export const test_createValidateEquals_ConstantIntersection =
    _test_validateEquals(
        "ConstantIntersection",
        ConstantIntersection.generate,
        typia.createValidateEquals<ConstantIntersection>(),
    );
