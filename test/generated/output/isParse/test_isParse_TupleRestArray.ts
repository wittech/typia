import typia from "../../../../src";
import { TupleRestArray } from "../../../structures/TupleRestArray";
import { _test_isParse } from "../internal/_test_isParse";

export const test_isParse_TupleRestArray = _test_isParse(
    "TupleRestArray",
    TupleRestArray.generate,
    (input) =>
        ((input: any): typia.Primitive<TupleRestArray> => {
            const is = (input: any): input is TupleRestArray => {
                return (
                    Array.isArray(input) &&
                    "boolean" === typeof input[0] &&
                    "number" === typeof input[1] &&
                    Number.isFinite(input[1]) &&
                    Array.isArray(input.slice(2)) &&
                    input
                        .slice(2)
                        .every(
                            (elem: any) =>
                                Array.isArray(elem) &&
                                elem.every(
                                    (elem: any) => "string" === typeof elem,
                                ),
                        )
                );
            };
            input = JSON.parse(input);
            return is(input) ? (input as any) : null;
        })(input),
    TupleRestArray.SPOILERS,
);