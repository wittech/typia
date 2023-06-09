import typia from "../../../../src";
import { _test_isPrune } from "../../../internal/_test_isPrune";
import { ObjectSimple } from "../../../structures/ObjectSimple";

export const test_isPrune_ObjectSimple = _test_isPrune(
    "ObjectSimple",
    ObjectSimple.generate,
    (input) =>
        ((input: any): input is ObjectSimple.IBox3D => {
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
            const prune = (input: ObjectSimple.IBox3D): void => {
                const $io1 = (input: any): boolean =>
                    "number" === typeof input.x &&
                    "number" === typeof input.y &&
                    "number" === typeof input.z;
                const $po0 = (input: any): any => {
                    if ("object" === typeof input.scale && null !== input.scale)
                        $po1(input.scale);
                    if (
                        "object" === typeof input.position &&
                        null !== input.position
                    )
                        $po1(input.position);
                    if (
                        "object" === typeof input.rotate &&
                        null !== input.rotate
                    )
                        $po1(input.rotate);
                    if ("object" === typeof input.pivot && null !== input.pivot)
                        $po1(input.pivot);
                    for (const key of Object.keys(input)) {
                        if (
                            "scale" === key ||
                            "position" === key ||
                            "rotate" === key ||
                            "pivot" === key
                        )
                            continue;
                        delete input[key];
                    }
                };
                const $po1 = (input: any): any => {
                    for (const key of Object.keys(input)) {
                        if ("x" === key || "y" === key || "z" === key) continue;
                        delete input[key];
                    }
                };
                if ("object" === typeof input && null !== input) $po0(input);
            };
            if (!is(input)) return false;
            prune(input);
            return true;
        })(input),
    ObjectSimple.SPOILERS,
);
