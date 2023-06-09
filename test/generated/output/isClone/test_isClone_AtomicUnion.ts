import typia from "../../../../src";
import { _test_isClone } from "../../../internal/_test_isClone";
import { AtomicUnion } from "../../../structures/AtomicUnion";

export const test_isClone_AtomicUnion = _test_isClone(
    "AtomicUnion",
    AtomicUnion.generate,
    (input) =>
        ((input: any): typia.Primitive<Array<AtomicUnion.Union>> | null => {
            const is = (input: any): input is Array<AtomicUnion.Union> => {
                return (
                    Array.isArray(input) &&
                    input.every(
                        (elem: any) =>
                            null === elem ||
                            "string" === typeof elem ||
                            ("number" === typeof elem &&
                                Number.isFinite(elem)) ||
                            "boolean" === typeof elem,
                    )
                );
            };
            const clone = (
                input: Array<AtomicUnion.Union>,
            ): typia.Primitive<Array<AtomicUnion.Union>> => {
                const $cp0 = (input: any) =>
                    input.map((elem: any) => elem as any);
                return Array.isArray(input) ? $cp0(input) : (input as any);
            };
            if (!is(input)) return null;
            const output = clone(input);
            return output;
        })(input),
    AtomicUnion.SPOILERS,
);
