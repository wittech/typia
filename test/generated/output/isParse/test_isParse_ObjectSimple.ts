import typia from "../../../../src";
import { _test_isParse } from "../../../internal/_test_isParse";
import { ObjectSimple } from "../../../structures/ObjectSimple";

export const test_isParse_ObjectSimple = _test_isParse(
    "ObjectSimple",
    ObjectSimple.generate,
    (input) =>
        ((input: any): typia.Primitive<ObjectSimple> => {
            const is = (input: any): input is ObjectSimple => {
                const $io0 = (input: any): boolean =>
                    "object" === typeof input.scale &&
                    null !== input.scale &&
                    "number" === typeof (input.scale as any).x &&
                    Number.isFinite((input.scale as any).x) &&
                    "number" === typeof (input.scale as any).y &&
                    Number.isFinite((input.scale as any).y) &&
                    "number" === typeof (input.scale as any).z &&
                    Number.isFinite((input.scale as any).z) &&
                    "object" === typeof input.position &&
                    null !== input.position &&
                    "number" === typeof (input.position as any).x &&
                    Number.isFinite((input.position as any).x) &&
                    "number" === typeof (input.position as any).y &&
                    Number.isFinite((input.position as any).y) &&
                    "number" === typeof (input.position as any).z &&
                    Number.isFinite((input.position as any).z) &&
                    "object" === typeof input.rotate &&
                    null !== input.rotate &&
                    "number" === typeof (input.rotate as any).x &&
                    Number.isFinite((input.rotate as any).x) &&
                    "number" === typeof (input.rotate as any).y &&
                    Number.isFinite((input.rotate as any).y) &&
                    "number" === typeof (input.rotate as any).z &&
                    Number.isFinite((input.rotate as any).z) &&
                    "object" === typeof input.pivot &&
                    null !== input.pivot &&
                    "number" === typeof (input.pivot as any).x &&
                    Number.isFinite((input.pivot as any).x) &&
                    "number" === typeof (input.pivot as any).y &&
                    Number.isFinite((input.pivot as any).y) &&
                    "number" === typeof (input.pivot as any).z &&
                    Number.isFinite((input.pivot as any).z);
                return (
                    "object" === typeof input && null !== input && $io0(input)
                );
            };
            input = JSON.parse(input);
            return is(input) ? (input as any) : null;
        })(input),
    ObjectSimple.SPOILERS,
);
