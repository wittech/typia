import typia from "../../../../src";
import { _test_is } from "../../../internal/_test_is";
import { ClassNonPublic } from "../../../structures/ClassNonPublic";

export const test_createIs_ClassNonPublic = _test_is(
    "ClassNonPublic",
    ClassNonPublic.generate,
    (input: any): input is ClassNonPublic => {
        return (
            "object" === typeof input &&
            null !== input &&
            "string" === typeof (input as any).implicit &&
            "string" === typeof (input as any).shown
        );
    },
    ClassNonPublic.SPOILERS,
);
