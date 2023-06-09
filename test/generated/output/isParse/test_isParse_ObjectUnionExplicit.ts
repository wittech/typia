import typia from "../../../../src";
import { _test_isParse } from "../../../internal/_test_isParse";
import { ObjectUnionExplicit } from "../../../structures/ObjectUnionExplicit";

export const test_isParse_ObjectUnionExplicit = _test_isParse(
    "ObjectUnionExplicit",
    ObjectUnionExplicit.generate,
    (input) =>
        ((input: any): typia.Primitive<ObjectUnionExplicit> => {
            const is = (input: any): input is ObjectUnionExplicit => {
                const $io0 = (input: any): boolean =>
                    "number" === typeof input.x &&
                    Number.isFinite(input.x) &&
                    "number" === typeof input.y &&
                    Number.isFinite(input.y) &&
                    "point" === input.type;
                const $io1 = (input: any): boolean =>
                    "object" === typeof input.p1 &&
                    null !== input.p1 &&
                    "number" === typeof (input.p1 as any).x &&
                    Number.isFinite((input.p1 as any).x) &&
                    "number" === typeof (input.p1 as any).y &&
                    Number.isFinite((input.p1 as any).y) &&
                    "object" === typeof input.p2 &&
                    null !== input.p2 &&
                    "number" === typeof (input.p2 as any).x &&
                    Number.isFinite((input.p2 as any).x) &&
                    "number" === typeof (input.p2 as any).y &&
                    Number.isFinite((input.p2 as any).y) &&
                    "line" === input.type;
                const $io2 = (input: any): boolean =>
                    "number" === typeof input.x &&
                    Number.isFinite(input.x) &&
                    "number" === typeof input.y &&
                    Number.isFinite(input.y);
                const $io3 = (input: any): boolean =>
                    "object" === typeof input.p1 &&
                    null !== input.p1 &&
                    "number" === typeof (input.p1 as any).x &&
                    Number.isFinite((input.p1 as any).x) &&
                    "number" === typeof (input.p1 as any).y &&
                    Number.isFinite((input.p1 as any).y) &&
                    "object" === typeof input.p2 &&
                    null !== input.p2 &&
                    "number" === typeof (input.p2 as any).x &&
                    Number.isFinite((input.p2 as any).x) &&
                    "number" === typeof (input.p2 as any).y &&
                    Number.isFinite((input.p2 as any).y) &&
                    "object" === typeof input.p3 &&
                    null !== input.p3 &&
                    "number" === typeof (input.p3 as any).x &&
                    Number.isFinite((input.p3 as any).x) &&
                    "number" === typeof (input.p3 as any).y &&
                    Number.isFinite((input.p3 as any).y) &&
                    "triangle" === input.type;
                const $io4 = (input: any): boolean =>
                    "object" === typeof input.p1 &&
                    null !== input.p1 &&
                    "number" === typeof (input.p1 as any).x &&
                    Number.isFinite((input.p1 as any).x) &&
                    "number" === typeof (input.p1 as any).y &&
                    Number.isFinite((input.p1 as any).y) &&
                    "object" === typeof input.p2 &&
                    null !== input.p2 &&
                    "number" === typeof (input.p2 as any).x &&
                    Number.isFinite((input.p2 as any).x) &&
                    "number" === typeof (input.p2 as any).y &&
                    Number.isFinite((input.p2 as any).y) &&
                    "object" === typeof input.p3 &&
                    null !== input.p3 &&
                    "number" === typeof (input.p3 as any).x &&
                    Number.isFinite((input.p3 as any).x) &&
                    "number" === typeof (input.p3 as any).y &&
                    Number.isFinite((input.p3 as any).y) &&
                    "object" === typeof input.p4 &&
                    null !== input.p4 &&
                    "number" === typeof (input.p4 as any).x &&
                    Number.isFinite((input.p4 as any).x) &&
                    "number" === typeof (input.p4 as any).y &&
                    Number.isFinite((input.p4 as any).y) &&
                    "rectangle" === input.type;
                const $io5 = (input: any): boolean =>
                    Array.isArray(input.points) &&
                    input.points.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $io2(elem),
                    ) &&
                    "polyline" === input.type;
                const $io6 = (input: any): boolean =>
                    "object" === typeof input.outer &&
                    null !== input.outer &&
                    $io7(input.outer) &&
                    Array.isArray(input.inner) &&
                    input.inner.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $io7(elem),
                    ) &&
                    "polygon" === input.type;
                const $io7 = (input: any): boolean =>
                    Array.isArray(input.points) &&
                    input.points.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $io2(elem),
                    );
                const $io8 = (input: any): boolean =>
                    "object" === typeof input.centroid &&
                    null !== input.centroid &&
                    "number" === typeof (input.centroid as any).x &&
                    Number.isFinite((input.centroid as any).x) &&
                    "number" === typeof (input.centroid as any).y &&
                    Number.isFinite((input.centroid as any).y) &&
                    "number" === typeof input.radius &&
                    Number.isFinite(input.radius) &&
                    "circle" === input.type;
                const $iu0 = (input: any): any =>
                    (() => {
                        if ("point" === input.type) return $io0(input);
                        if ("line" === input.type) return $io1(input);
                        if ("triangle" === input.type) return $io3(input);
                        if ("rectangle" === input.type) return $io4(input);
                        if ("polyline" === input.type) return $io5(input);
                        if ("polygon" === input.type) return $io6(input);
                        if ("circle" === input.type) return $io8(input);
                        return false;
                    })();
                return (
                    Array.isArray(input) &&
                    input.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $iu0(elem),
                    )
                );
            };
            input = JSON.parse(input);
            return is(input) ? (input as any) : null;
        })(input),
    ObjectUnionExplicit.SPOILERS,
);
