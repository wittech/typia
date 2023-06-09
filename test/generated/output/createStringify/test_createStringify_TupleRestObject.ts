import typia from "../../../../src";
import { _test_stringify } from "../../../internal/_test_stringify";
import { TupleRestObject } from "../../../structures/TupleRestObject";

export const test_createStringify_TupleRestObject = _test_stringify(
    "TupleRestObject",
    TupleRestObject.generate,
    (input: TupleRestObject): string => {
        const $number = (typia.createStringify as any).number;
        const $string = (typia.createStringify as any).string;
        const $rest = (typia.createStringify as any).rest;
        return `[${input[0]},${$number(input[1])}${$rest(
            `[${input
                .slice(2)
                .map((elem: any) => `{"value":${$string((elem as any).value)}}`)
                .join(",")}]`,
        )}]`;
    },
);
