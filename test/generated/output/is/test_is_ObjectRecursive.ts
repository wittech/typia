import typia from "../../../../src";
import { ObjectRecursive } from "../../../structures/ObjectRecursive";
import { _test_is } from "../internal/_test_is";

export const test_is_ObjectRecursive = _test_is(
    "ObjectRecursive",
    ObjectRecursive.generate,
    (input) =>
        ((input: any): input is ObjectRecursive.IDepartment => {
            const $io0 = (input: any): boolean =>
                (null === input.parent ||
                    ("object" === typeof input.parent &&
                        null !== input.parent &&
                        $io0(input.parent))) &&
                "number" === typeof input.id &&
                Number.isFinite(input.id) &&
                "string" === typeof input.code &&
                "string" === typeof input.name &&
                "number" === typeof input.sequence &&
                Number.isFinite(input.sequence) &&
                "object" === typeof input.created_at &&
                null !== input.created_at &&
                "number" === typeof input.created_at.time &&
                Number.isFinite(input.created_at.time) &&
                "number" === typeof input.created_at.zone &&
                Number.isFinite(input.created_at.zone);
            return "object" === typeof input && null !== input && $io0(input);
        })(input),
    ObjectRecursive.SPOILERS,
);