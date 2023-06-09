import typia from "../../../../src";
import { _test_validatePrune } from "../../../internal/_test_validatePrune";
import { ObjectGenericUnion } from "../../../structures/ObjectGenericUnion";

export const test_createValidatePrune_ObjectGenericUnion = _test_validatePrune(
    "ObjectGenericUnion",
    ObjectGenericUnion.generate,
    (input: any): typia.IValidation<ObjectGenericUnion> => {
        const validate = (
            input: any,
        ): typia.IValidation<ObjectGenericUnion> => {
            const errors = [] as any[];
            const $report = (typia.createValidatePrune as any).report(errors);
            const __is = (input: any): input is ObjectGenericUnion => {
                const $io0 = (input: any): boolean =>
                    "string" === typeof input.writer &&
                    (null === input.answer ||
                        ("object" === typeof input.answer &&
                            null !== input.answer &&
                            $io1(input.answer))) &&
                    "string" === typeof input.id &&
                    "number" === typeof input.hit &&
                    Number.isFinite(input.hit) &&
                    Array.isArray(input.contents) &&
                    input.contents.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $io2(elem),
                    ) &&
                    "string" === typeof input.created_at;
                const $io1 = (input: any): boolean =>
                    "string" === typeof input.id &&
                    "number" === typeof input.hit &&
                    Number.isFinite(input.hit) &&
                    Array.isArray(input.contents) &&
                    input.contents.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $io2(elem),
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
                            "object" === typeof elem &&
                            null !== elem &&
                            $io3(elem),
                    );
                const $io3 = (input: any): boolean =>
                    (null === input.extension ||
                        "string" === typeof input.extension) &&
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
                    Number.isFinite(input.hit) &&
                    Array.isArray(input.contents) &&
                    input.contents.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $io5(elem),
                    ) &&
                    "string" === typeof input.created_at;
                const $io5 = (input: any): boolean =>
                    "number" === typeof input.score &&
                    Number.isFinite(input.score) &&
                    "string" === typeof input.id &&
                    "string" === typeof input.created_at &&
                    "string" === typeof input.title &&
                    "string" === typeof input.body &&
                    Array.isArray(input.files) &&
                    input.files.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $io3(elem),
                    );
                const $iu0 = (input: any): any =>
                    (() => {
                        if ($io4(input)) return $io4(input);
                        if ($io0(input)) return $io0(input);
                        return false;
                    })();
                return (
                    "object" === typeof input && null !== input && $iu0(input)
                );
            };
            if (false === __is(input))
                ((
                    input: any,
                    _path: string,
                    _exceptionable: boolean = true,
                ): input is ObjectGenericUnion => {
                    const $vo0 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        [
                            "string" === typeof input.writer ||
                                $report(_exceptionable, {
                                    path: _path + ".writer",
                                    expected: "string",
                                    value: input.writer,
                                }),
                            null === input.answer ||
                                ((("object" === typeof input.answer &&
                                    null !== input.answer) ||
                                    $report(_exceptionable, {
                                        path: _path + ".answer",
                                        expected:
                                            "(ObjectGenericUnion.ISaleAnswer | null)",
                                        value: input.answer,
                                    })) &&
                                    $vo1(
                                        input.answer,
                                        _path + ".answer",
                                        true && _exceptionable,
                                    )) ||
                                $report(_exceptionable, {
                                    path: _path + ".answer",
                                    expected:
                                        "(ObjectGenericUnion.ISaleAnswer | null)",
                                    value: input.answer,
                                }),
                            "string" === typeof input.id ||
                                $report(_exceptionable, {
                                    path: _path + ".id",
                                    expected: "string",
                                    value: input.id,
                                }),
                            ("number" === typeof input.hit &&
                                Number.isFinite(input.hit)) ||
                                $report(_exceptionable, {
                                    path: _path + ".hit",
                                    expected: "number",
                                    value: input.hit,
                                }),
                            ((Array.isArray(input.contents) ||
                                $report(_exceptionable, {
                                    path: _path + ".contents",
                                    expected:
                                        "Array<ObjectGenericUnion.ISaleArticle.IContent>",
                                    value: input.contents,
                                })) &&
                                input.contents
                                    .map(
                                        (elem: any, _index1: number) =>
                                            ((("object" === typeof elem &&
                                                null !== elem) ||
                                                $report(_exceptionable, {
                                                    path:
                                                        _path +
                                                        ".contents[" +
                                                        _index1 +
                                                        "]",
                                                    expected:
                                                        "ObjectGenericUnion.ISaleArticle.IContent",
                                                    value: elem,
                                                })) &&
                                                $vo2(
                                                    elem,
                                                    _path +
                                                        ".contents[" +
                                                        _index1 +
                                                        "]",
                                                    true && _exceptionable,
                                                )) ||
                                            $report(_exceptionable, {
                                                path:
                                                    _path +
                                                    ".contents[" +
                                                    _index1 +
                                                    "]",
                                                expected:
                                                    "ObjectGenericUnion.ISaleArticle.IContent",
                                                value: elem,
                                            }),
                                    )
                                    .every((flag: boolean) => flag)) ||
                                $report(_exceptionable, {
                                    path: _path + ".contents",
                                    expected:
                                        "Array<ObjectGenericUnion.ISaleArticle.IContent>",
                                    value: input.contents,
                                }),
                            "string" === typeof input.created_at ||
                                $report(_exceptionable, {
                                    path: _path + ".created_at",
                                    expected: "string",
                                    value: input.created_at,
                                }),
                        ].every((flag: boolean) => flag);
                    const $vo1 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        [
                            "string" === typeof input.id ||
                                $report(_exceptionable, {
                                    path: _path + ".id",
                                    expected: "string",
                                    value: input.id,
                                }),
                            ("number" === typeof input.hit &&
                                Number.isFinite(input.hit)) ||
                                $report(_exceptionable, {
                                    path: _path + ".hit",
                                    expected: "number",
                                    value: input.hit,
                                }),
                            ((Array.isArray(input.contents) ||
                                $report(_exceptionable, {
                                    path: _path + ".contents",
                                    expected:
                                        "Array<ObjectGenericUnion.ISaleArticle.IContent>",
                                    value: input.contents,
                                })) &&
                                input.contents
                                    .map(
                                        (elem: any, _index2: number) =>
                                            ((("object" === typeof elem &&
                                                null !== elem) ||
                                                $report(_exceptionable, {
                                                    path:
                                                        _path +
                                                        ".contents[" +
                                                        _index2 +
                                                        "]",
                                                    expected:
                                                        "ObjectGenericUnion.ISaleArticle.IContent",
                                                    value: elem,
                                                })) &&
                                                $vo2(
                                                    elem,
                                                    _path +
                                                        ".contents[" +
                                                        _index2 +
                                                        "]",
                                                    true && _exceptionable,
                                                )) ||
                                            $report(_exceptionable, {
                                                path:
                                                    _path +
                                                    ".contents[" +
                                                    _index2 +
                                                    "]",
                                                expected:
                                                    "ObjectGenericUnion.ISaleArticle.IContent",
                                                value: elem,
                                            }),
                                    )
                                    .every((flag: boolean) => flag)) ||
                                $report(_exceptionable, {
                                    path: _path + ".contents",
                                    expected:
                                        "Array<ObjectGenericUnion.ISaleArticle.IContent>",
                                    value: input.contents,
                                }),
                            "string" === typeof input.created_at ||
                                $report(_exceptionable, {
                                    path: _path + ".created_at",
                                    expected: "string",
                                    value: input.created_at,
                                }),
                        ].every((flag: boolean) => flag);
                    const $vo2 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        [
                            "string" === typeof input.id ||
                                $report(_exceptionable, {
                                    path: _path + ".id",
                                    expected: "string",
                                    value: input.id,
                                }),
                            "string" === typeof input.created_at ||
                                $report(_exceptionable, {
                                    path: _path + ".created_at",
                                    expected: "string",
                                    value: input.created_at,
                                }),
                            "string" === typeof input.title ||
                                $report(_exceptionable, {
                                    path: _path + ".title",
                                    expected: "string",
                                    value: input.title,
                                }),
                            "string" === typeof input.body ||
                                $report(_exceptionable, {
                                    path: _path + ".body",
                                    expected: "string",
                                    value: input.body,
                                }),
                            ((Array.isArray(input.files) ||
                                $report(_exceptionable, {
                                    path: _path + ".files",
                                    expected:
                                        'Array<Omit<ObjectGenericUnion.IAttachmentFile, "id">>',
                                    value: input.files,
                                })) &&
                                input.files
                                    .map(
                                        (elem: any, _index3: number) =>
                                            ((("object" === typeof elem &&
                                                null !== elem) ||
                                                $report(_exceptionable, {
                                                    path:
                                                        _path +
                                                        ".files[" +
                                                        _index3 +
                                                        "]",
                                                    expected:
                                                        'Omit<ObjectGenericUnion.IAttachmentFile, "id">',
                                                    value: elem,
                                                })) &&
                                                $vo3(
                                                    elem,
                                                    _path +
                                                        ".files[" +
                                                        _index3 +
                                                        "]",
                                                    true && _exceptionable,
                                                )) ||
                                            $report(_exceptionable, {
                                                path:
                                                    _path +
                                                    ".files[" +
                                                    _index3 +
                                                    "]",
                                                expected:
                                                    'Omit<ObjectGenericUnion.IAttachmentFile, "id">',
                                                value: elem,
                                            }),
                                    )
                                    .every((flag: boolean) => flag)) ||
                                $report(_exceptionable, {
                                    path: _path + ".files",
                                    expected:
                                        'Array<Omit<ObjectGenericUnion.IAttachmentFile, "id">>',
                                    value: input.files,
                                }),
                        ].every((flag: boolean) => flag);
                    const $vo3 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        [
                            null === input.extension ||
                                "string" === typeof input.extension ||
                                $report(_exceptionable, {
                                    path: _path + ".extension",
                                    expected: "(null | string)",
                                    value: input.extension,
                                }),
                            "string" === typeof input.name ||
                                $report(_exceptionable, {
                                    path: _path + ".name",
                                    expected: "string",
                                    value: input.name,
                                }),
                            "string" === typeof input.url ||
                                $report(_exceptionable, {
                                    path: _path + ".url",
                                    expected: "string",
                                    value: input.url,
                                }),
                        ].every((flag: boolean) => flag);
                    const $vo4 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        [
                            "string" === typeof input.writer ||
                                $report(_exceptionable, {
                                    path: _path + ".writer",
                                    expected: "string",
                                    value: input.writer,
                                }),
                            null === input.answer ||
                                ((("object" === typeof input.answer &&
                                    null !== input.answer) ||
                                    $report(_exceptionable, {
                                        path: _path + ".answer",
                                        expected:
                                            "(ObjectGenericUnion.ISaleAnswer | null)",
                                        value: input.answer,
                                    })) &&
                                    $vo1(
                                        input.answer,
                                        _path + ".answer",
                                        true && _exceptionable,
                                    )) ||
                                $report(_exceptionable, {
                                    path: _path + ".answer",
                                    expected:
                                        "(ObjectGenericUnion.ISaleAnswer | null)",
                                    value: input.answer,
                                }),
                            "string" === typeof input.id ||
                                $report(_exceptionable, {
                                    path: _path + ".id",
                                    expected: "string",
                                    value: input.id,
                                }),
                            ("number" === typeof input.hit &&
                                Number.isFinite(input.hit)) ||
                                $report(_exceptionable, {
                                    path: _path + ".hit",
                                    expected: "number",
                                    value: input.hit,
                                }),
                            ((Array.isArray(input.contents) ||
                                $report(_exceptionable, {
                                    path: _path + ".contents",
                                    expected:
                                        "Array<ObjectGenericUnion.ISaleReview.IContent>",
                                    value: input.contents,
                                })) &&
                                input.contents
                                    .map(
                                        (elem: any, _index4: number) =>
                                            ((("object" === typeof elem &&
                                                null !== elem) ||
                                                $report(_exceptionable, {
                                                    path:
                                                        _path +
                                                        ".contents[" +
                                                        _index4 +
                                                        "]",
                                                    expected:
                                                        "ObjectGenericUnion.ISaleReview.IContent",
                                                    value: elem,
                                                })) &&
                                                $vo5(
                                                    elem,
                                                    _path +
                                                        ".contents[" +
                                                        _index4 +
                                                        "]",
                                                    true && _exceptionable,
                                                )) ||
                                            $report(_exceptionable, {
                                                path:
                                                    _path +
                                                    ".contents[" +
                                                    _index4 +
                                                    "]",
                                                expected:
                                                    "ObjectGenericUnion.ISaleReview.IContent",
                                                value: elem,
                                            }),
                                    )
                                    .every((flag: boolean) => flag)) ||
                                $report(_exceptionable, {
                                    path: _path + ".contents",
                                    expected:
                                        "Array<ObjectGenericUnion.ISaleReview.IContent>",
                                    value: input.contents,
                                }),
                            "string" === typeof input.created_at ||
                                $report(_exceptionable, {
                                    path: _path + ".created_at",
                                    expected: "string",
                                    value: input.created_at,
                                }),
                        ].every((flag: boolean) => flag);
                    const $vo5 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): boolean =>
                        [
                            ("number" === typeof input.score &&
                                Number.isFinite(input.score)) ||
                                $report(_exceptionable, {
                                    path: _path + ".score",
                                    expected: "number",
                                    value: input.score,
                                }),
                            "string" === typeof input.id ||
                                $report(_exceptionable, {
                                    path: _path + ".id",
                                    expected: "string",
                                    value: input.id,
                                }),
                            "string" === typeof input.created_at ||
                                $report(_exceptionable, {
                                    path: _path + ".created_at",
                                    expected: "string",
                                    value: input.created_at,
                                }),
                            "string" === typeof input.title ||
                                $report(_exceptionable, {
                                    path: _path + ".title",
                                    expected: "string",
                                    value: input.title,
                                }),
                            "string" === typeof input.body ||
                                $report(_exceptionable, {
                                    path: _path + ".body",
                                    expected: "string",
                                    value: input.body,
                                }),
                            ((Array.isArray(input.files) ||
                                $report(_exceptionable, {
                                    path: _path + ".files",
                                    expected:
                                        'Array<Omit<ObjectGenericUnion.IAttachmentFile, "id">>',
                                    value: input.files,
                                })) &&
                                input.files
                                    .map(
                                        (elem: any, _index5: number) =>
                                            ((("object" === typeof elem &&
                                                null !== elem) ||
                                                $report(_exceptionable, {
                                                    path:
                                                        _path +
                                                        ".files[" +
                                                        _index5 +
                                                        "]",
                                                    expected:
                                                        'Omit<ObjectGenericUnion.IAttachmentFile, "id">',
                                                    value: elem,
                                                })) &&
                                                $vo3(
                                                    elem,
                                                    _path +
                                                        ".files[" +
                                                        _index5 +
                                                        "]",
                                                    true && _exceptionable,
                                                )) ||
                                            $report(_exceptionable, {
                                                path:
                                                    _path +
                                                    ".files[" +
                                                    _index5 +
                                                    "]",
                                                expected:
                                                    'Omit<ObjectGenericUnion.IAttachmentFile, "id">',
                                                value: elem,
                                            }),
                                    )
                                    .every((flag: boolean) => flag)) ||
                                $report(_exceptionable, {
                                    path: _path + ".files",
                                    expected:
                                        'Array<Omit<ObjectGenericUnion.IAttachmentFile, "id">>',
                                    value: input.files,
                                }),
                        ].every((flag: boolean) => flag);
                    const $vu0 = (
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): any =>
                        $vo4(input, _path, false && _exceptionable) ||
                        $vo0(input, _path, false && _exceptionable);
                    return (
                        ((("object" === typeof input && null !== input) ||
                            $report(true, {
                                path: _path + "",
                                expected:
                                    "(ObjectGenericUnion.ISaleQuestion | ObjectGenericUnion.ISaleReview)",
                                value: input,
                            })) &&
                            $vu0(input, _path + "", true)) ||
                        $report(true, {
                            path: _path + "",
                            expected:
                                "(ObjectGenericUnion.ISaleQuestion | ObjectGenericUnion.ISaleReview)",
                            value: input,
                        })
                    );
                })(input, "$input", true);
            const success = 0 === errors.length;
            return {
                success,
                errors,
                data: success ? input : undefined,
            } as any;
        };
        const prune = (input: ObjectGenericUnion): void => {
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
                (null === input.extension ||
                    "string" === typeof input.extension) &&
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
            const $throws = (typia.createValidatePrune as any).throws;
            const $pp0 = (input: any) =>
                input.forEach((elem: any) => {
                    if ("object" === typeof elem && null !== elem) $po2(elem);
                });
            const $pp1 = (input: any) =>
                input.forEach((elem: any) => {
                    if ("object" === typeof elem && null !== elem) $po3(elem);
                });
            const $pp2 = (input: any) =>
                input.forEach((elem: any) => {
                    if ("object" === typeof elem && null !== elem) $po5(elem);
                });
            const $po0 = (input: any): any => {
                if ("object" === typeof input.answer && null !== input.answer)
                    $po1(input.answer);
                if (Array.isArray(input.contents)) $pp0(input.contents);
                for (const key of Object.keys(input)) {
                    if (
                        "writer" === key ||
                        "answer" === key ||
                        "id" === key ||
                        "hit" === key ||
                        "contents" === key ||
                        "created_at" === key
                    )
                        continue;
                    delete input[key];
                }
            };
            const $po1 = (input: any): any => {
                if (Array.isArray(input.contents)) $pp0(input.contents);
                for (const key of Object.keys(input)) {
                    if (
                        "id" === key ||
                        "hit" === key ||
                        "contents" === key ||
                        "created_at" === key
                    )
                        continue;
                    delete input[key];
                }
            };
            const $po2 = (input: any): any => {
                if (Array.isArray(input.files)) $pp1(input.files);
                for (const key of Object.keys(input)) {
                    if (
                        "id" === key ||
                        "created_at" === key ||
                        "title" === key ||
                        "body" === key ||
                        "files" === key
                    )
                        continue;
                    delete input[key];
                }
            };
            const $po3 = (input: any): any => {
                for (const key of Object.keys(input)) {
                    if ("extension" === key || "name" === key || "url" === key)
                        continue;
                    delete input[key];
                }
            };
            const $po4 = (input: any): any => {
                if ("object" === typeof input.answer && null !== input.answer)
                    $po1(input.answer);
                if (Array.isArray(input.contents)) $pp2(input.contents);
                for (const key of Object.keys(input)) {
                    if (
                        "writer" === key ||
                        "answer" === key ||
                        "id" === key ||
                        "hit" === key ||
                        "contents" === key ||
                        "created_at" === key
                    )
                        continue;
                    delete input[key];
                }
            };
            const $po5 = (input: any): any => {
                if (Array.isArray(input.files)) $pp1(input.files);
                for (const key of Object.keys(input)) {
                    if (
                        "score" === key ||
                        "id" === key ||
                        "created_at" === key ||
                        "title" === key ||
                        "body" === key ||
                        "files" === key
                    )
                        continue;
                    delete input[key];
                }
            };
            const $pu0 = (input: any): any =>
                (() => {
                    if ($io4(input)) return $po4(input);
                    if ($io0(input)) return $po0(input);
                    $throws({
                        expected:
                            "(ObjectGenericUnion.ISaleReview | ObjectGenericUnion.ISaleQuestion)",
                        value: input,
                    });
                })();
            if ("object" === typeof input && null !== input) $pu0(input);
        };
        const output = validate(input);
        if (output.success) prune(input);
        return output;
    },
    ObjectGenericUnion.SPOILERS,
);
