import typia from "../../../../src";
import { _test_clone } from "../../../internal/_test_clone";
import { ArrayMatrix } from "../../../structures/ArrayMatrix";

export const test_createClone_ArrayMatrix = _test_clone(
    "ArrayMatrix",
    ArrayMatrix.generate,
    (input: ArrayMatrix): typia.Primitive<ArrayMatrix> => {
        const $cp0 = (input: any) => input.map((elem: any) => elem as any);
        const $cp1 = (input: any) =>
            input.map((elem: any) =>
                Array.isArray(elem) ? $cp0(elem) : (elem as any),
            );
        const $cp2 = (input: any) =>
            input.map((elem: any) =>
                Array.isArray(elem) ? $cp1(elem) : (elem as any),
            );
        return Array.isArray(input) ? $cp2(input) : (input as any);
    },
);
