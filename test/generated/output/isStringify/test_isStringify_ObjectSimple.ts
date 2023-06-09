import typia from "../../../../src";
import { _test_isStringify } from "../../../internal/_test_isStringify";
import { ObjectSimple } from "../../../structures/ObjectSimple";

export const test_isStringify_ObjectSimple = _test_isStringify(
    "ObjectSimple",
    ObjectSimple.generate,
    (input) =>
        ((input: ObjectSimple.IBox3D): string | null => {
            const is = (input: any): input is ObjectSimple.IBox3D => {
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
            const stringify = (input: ObjectSimple.IBox3D): string => {
                const $io1 = (input: any): boolean =>
                    "number" === typeof input.x &&
                    "number" === typeof input.y &&
                    "number" === typeof input.z;
                const $number = (typia.isStringify as any).number;
                const $so0 = (input: any): any =>
                    `{"scale":${`{"x":${$number(
                        (input.scale as any).x,
                    )},"y":${$number((input.scale as any).y)},"z":${$number(
                        (input.scale as any).z,
                    )}}`},"position":${`{"x":${$number(
                        (input.position as any).x,
                    )},"y":${$number((input.position as any).y)},"z":${$number(
                        (input.position as any).z,
                    )}}`},"rotate":${`{"x":${$number(
                        (input.rotate as any).x,
                    )},"y":${$number((input.rotate as any).y)},"z":${$number(
                        (input.rotate as any).z,
                    )}}`},"pivot":${`{"x":${$number(
                        (input.pivot as any).x,
                    )},"y":${$number((input.pivot as any).y)},"z":${$number(
                        (input.pivot as any).z,
                    )}}`}}`;
                return $so0(input);
            };
            return is(input) ? stringify(input) : null;
        })(input),
    ObjectSimple.SPOILERS,
);
