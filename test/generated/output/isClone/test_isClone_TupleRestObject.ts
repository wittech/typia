import typia from "../../../../src";
import { _test_isClone } from "../../../internal/_test_isClone";
import { TupleRestObject } from "../../../structures/TupleRestObject";

export const test_isClone_TupleRestObject = _test_isClone(
    "TupleRestObject",
    TupleRestObject.generate,
    (input) =>
        ((
            input: any,
        ): typia.Primitive<
            [boolean, number, ...TupleRestObject.IObject[]]
        > | null => {
            const is = (
                input: any,
            ): input is [boolean, number, ...TupleRestObject.IObject[]] => {
                const $io0 = (input: any): boolean =>
                    "string" === typeof input.value;
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
                                "object" === typeof elem &&
                                null !== elem &&
                                $io0(elem),
                        )
                );
            };
            const clone = (
                input: [boolean, number, ...TupleRestObject.IObject[]],
            ): typia.Primitive<
                [boolean, number, ...TupleRestObject.IObject[]]
            > => {
                const $io0 = (input: any): boolean =>
                    "string" === typeof input.value;
                const $cp0 = (input: any) =>
                    input.map((elem: any) =>
                        "object" === typeof elem && null !== elem
                            ? $co0(elem)
                            : (elem as any),
                    );
                const $co0 = (input: any): any => ({
                    value: input.value as any,
                });
                return Array.isArray(input) &&
                    "boolean" === typeof input[0] &&
                    "number" === typeof input[1] &&
                    Array.isArray(input.slice(2)) &&
                    input
                        .slice(2)
                        .every(
                            (elem: any) =>
                                "object" === typeof elem &&
                                null !== elem &&
                                $io0(elem),
                        )
                    ? ([
                          input[0] as any,
                          input[1] as any,
                          ...(Array.isArray(input.slice(2))
                              ? $cp0(input.slice(2))
                              : (input.slice(2) as any)),
                      ] as any)
                    : (input as any);
            };
            if (!is(input)) return null;
            const output = clone(input);
            return output;
        })(input),
    TupleRestObject.SPOILERS,
);
