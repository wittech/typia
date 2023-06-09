import typia from "../../../../src";
import { _test_clone } from "../../../internal/_test_clone";
import { ObjectGenericUnion } from "../../../structures/ObjectGenericUnion";

export const test_createClone_ObjectGenericUnion = _test_clone(
    "ObjectGenericUnion",
    ObjectGenericUnion.generate,
    (input: ObjectGenericUnion): typia.Primitive<ObjectGenericUnion> => {
        const $io0 = (input: any): boolean =>
            "string" === typeof input.writer &&
            (null === input.answer ||
                ("object" === typeof input.answer &&
                    null !== input.answer &&
                    $io1(input.answer))) &&
            "string" === typeof input.id &&
            "number" === typeof input.hit &&
            Array.isArray(input.contents) &&
            input.contents.every(
                (elem: any) =>
                    "object" === typeof elem && null !== elem && $io2(elem),
            ) &&
            "string" === typeof input.created_at;
        const $io1 = (input: any): boolean =>
            "string" === typeof input.id &&
            "number" === typeof input.hit &&
            Array.isArray(input.contents) &&
            input.contents.every(
                (elem: any) =>
                    "object" === typeof elem && null !== elem && $io2(elem),
            ) &&
            "string" === typeof input.created_at;
        const $io2 = (input: any): boolean =>
            "string" === typeof input.id &&
            "string" === typeof input.created_at &&
            "string" === typeof input.title &&
            "string" === typeof input.body &&
            Array.isArray(input.files) &&
            input.files.every(
                (elem: any) =>
                    "object" === typeof elem && null !== elem && $io3(elem),
            );
        const $io3 = (input: any): boolean =>
            (null === input.extension || "string" === typeof input.extension) &&
            "string" === typeof input.name &&
            "string" === typeof input.url;
        const $io4 = (input: any): boolean =>
            "string" === typeof input.writer &&
            (null === input.answer ||
                ("object" === typeof input.answer &&
                    null !== input.answer &&
                    $io1(input.answer))) &&
            "string" === typeof input.id &&
            "number" === typeof input.hit &&
            Array.isArray(input.contents) &&
            input.contents.every(
                (elem: any) =>
                    "object" === typeof elem && null !== elem && $io5(elem),
            ) &&
            "string" === typeof input.created_at;
        const $io5 = (input: any): boolean =>
            "number" === typeof input.score &&
            "string" === typeof input.id &&
            "string" === typeof input.created_at &&
            "string" === typeof input.title &&
            "string" === typeof input.body &&
            Array.isArray(input.files) &&
            input.files.every(
                (elem: any) =>
                    "object" === typeof elem && null !== elem && $io3(elem),
            );
        const $throws = (typia.createClone as any).throws;
        const $cp0 = (input: any) =>
            input.map((elem: any) =>
                "object" === typeof elem && null !== elem
                    ? $co2(elem)
                    : (elem as any),
            );
        const $cp1 = (input: any) =>
            input.map((elem: any) =>
                "object" === typeof elem && null !== elem
                    ? $co3(elem)
                    : (elem as any),
            );
        const $cp2 = (input: any) =>
            input.map((elem: any) =>
                "object" === typeof elem && null !== elem
                    ? $co5(elem)
                    : (elem as any),
            );
        const $co0 = (input: any): any => ({
            writer: input.writer as any,
            answer:
                "object" === typeof input.answer && null !== input.answer
                    ? $co1(input.answer)
                    : (input.answer as any),
            id: input.id as any,
            hit: input.hit as any,
            contents: Array.isArray(input.contents)
                ? $cp0(input.contents)
                : (input.contents as any),
            created_at: input.created_at as any,
        });
        const $co1 = (input: any): any => ({
            id: input.id as any,
            hit: input.hit as any,
            contents: Array.isArray(input.contents)
                ? $cp0(input.contents)
                : (input.contents as any),
            created_at: input.created_at as any,
        });
        const $co2 = (input: any): any => ({
            id: input.id as any,
            created_at: input.created_at as any,
            title: input.title as any,
            body: input.body as any,
            files: Array.isArray(input.files)
                ? $cp1(input.files)
                : (input.files as any),
        });
        const $co3 = (input: any): any => ({
            extension: input.extension as any,
            name: input.name as any,
            url: input.url as any,
        });
        const $co4 = (input: any): any => ({
            writer: input.writer as any,
            answer:
                "object" === typeof input.answer && null !== input.answer
                    ? $co1(input.answer)
                    : (input.answer as any),
            id: input.id as any,
            hit: input.hit as any,
            contents: Array.isArray(input.contents)
                ? $cp2(input.contents)
                : (input.contents as any),
            created_at: input.created_at as any,
        });
        const $co5 = (input: any): any => ({
            score: input.score as any,
            id: input.id as any,
            created_at: input.created_at as any,
            title: input.title as any,
            body: input.body as any,
            files: Array.isArray(input.files)
                ? $cp1(input.files)
                : (input.files as any),
        });
        const $cu0 = (input: any): any =>
            (() => {
                if ($io4(input)) return $co4(input);
                if ($io0(input)) return $co0(input);
                $throws({
                    expected:
                        "(ObjectGenericUnion.ISaleReview | ObjectGenericUnion.ISaleQuestion)",
                    value: input,
                });
            })();
        return "object" === typeof input && null !== input
            ? $cu0(input)
            : (input as any);
    },
);
