import typia from "../../../../src";
import { _test_assertPrune } from "../../../internal/_test_assertPrune";
import { ObjectNullable } from "../../../structures/ObjectNullable";

export const test_assertPrune_ObjectNullable = _test_assertPrune(
    "ObjectNullable",
    ObjectNullable.generate,
    (input) =>
        ((
            input: any,
        ): [
            ObjectNullable.IProduct,
            ObjectNullable.IProduct,
            ObjectNullable.IProduct,
        ] => {
            const assert = (
                input: any,
            ): [
                ObjectNullable.IProduct,
                ObjectNullable.IProduct,
                ObjectNullable.IProduct,
            ] => {
                const __is = (
                    input: any,
                ): input is [
                    ObjectNullable.IProduct,
                    ObjectNullable.IProduct,
                    ObjectNullable.IProduct,
                ] => {
                    const $io0 = (input: any): boolean =>
                        "string" === typeof input.name &&
                        "object" === typeof input.manufacturer &&
                        null !== input.manufacturer &&
                        $io1(input.manufacturer) &&
                        (null === input.brand ||
                            ("object" === typeof input.brand &&
                                null !== input.brand &&
                                $io2(input.brand))) &&
                        (null === input.similar ||
                            ("object" === typeof input.similar &&
                                null !== input.similar &&
                                $iu0(input.similar)));
                    const $io1 = (input: any): boolean =>
                        "manufacturer" === input.type &&
                        "string" === typeof input.name;
                    const $io2 = (input: any): boolean =>
                        "brand" === input.type &&
                        "string" === typeof input.name;
                    const $iu0 = (input: any): any =>
                        (() => {
                            if ("brand" === input.type) return $io2(input);
                            if ("manufacturer" === input.type)
                                return $io1(input);
                            return false;
                        })();
                    return (
                        Array.isArray(input) &&
                        input.length === 3 &&
                        "object" === typeof input[0] &&
                        null !== input[0] &&
                        $io0(input[0]) &&
                        "object" === typeof input[1] &&
                        null !== input[1] &&
                        $io0(input[1]) &&
                        "object" === typeof input[2] &&
                        null !== input[2] &&
                        $io0(input[2])
                    );
                };
                if (false === __is(input))
                    ((
                        input: any,
                        _path: string,
                        _exceptionable: boolean = true,
                    ): input is [
                        ObjectNullable.IProduct,
                        ObjectNullable.IProduct,
                        ObjectNullable.IProduct,
                    ] => {
                        const $guard = (typia.assertPrune as any).guard;
                        const $ao0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): boolean =>
                            ("string" === typeof input.name ||
                                $guard(_exceptionable, {
                                    path: _path + ".name",
                                    expected: "string",
                                    value: input.name,
                                })) &&
                            (((("object" === typeof input.manufacturer &&
                                null !== input.manufacturer) ||
                                $guard(_exceptionable, {
                                    path: _path + ".manufacturer",
                                    expected: "ObjectNullable.IManufacturer",
                                    value: input.manufacturer,
                                })) &&
                                $ao1(
                                    input.manufacturer,
                                    _path + ".manufacturer",
                                    true && _exceptionable,
                                )) ||
                                $guard(_exceptionable, {
                                    path: _path + ".manufacturer",
                                    expected: "ObjectNullable.IManufacturer",
                                    value: input.manufacturer,
                                })) &&
                            (null === input.brand ||
                                ((("object" === typeof input.brand &&
                                    null !== input.brand) ||
                                    $guard(_exceptionable, {
                                        path: _path + ".brand",
                                        expected:
                                            "(ObjectNullable.IBrand | null)",
                                        value: input.brand,
                                    })) &&
                                    $ao2(
                                        input.brand,
                                        _path + ".brand",
                                        true && _exceptionable,
                                    )) ||
                                $guard(_exceptionable, {
                                    path: _path + ".brand",
                                    expected: "(ObjectNullable.IBrand | null)",
                                    value: input.brand,
                                })) &&
                            (null === input.similar ||
                                ((("object" === typeof input.similar &&
                                    null !== input.similar) ||
                                    $guard(_exceptionable, {
                                        path: _path + ".similar",
                                        expected:
                                            "(ObjectNullable.IBrand | ObjectNullable.IManufacturer | null)",
                                        value: input.similar,
                                    })) &&
                                    $au0(
                                        input.similar,
                                        _path + ".similar",
                                        true && _exceptionable,
                                    )) ||
                                $guard(_exceptionable, {
                                    path: _path + ".similar",
                                    expected:
                                        "(ObjectNullable.IBrand | ObjectNullable.IManufacturer | null)",
                                    value: input.similar,
                                }));
                        const $ao1 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): boolean =>
                            ("manufacturer" === input.type ||
                                $guard(_exceptionable, {
                                    path: _path + ".type",
                                    expected: '"manufacturer"',
                                    value: input.type,
                                })) &&
                            ("string" === typeof input.name ||
                                $guard(_exceptionable, {
                                    path: _path + ".name",
                                    expected: "string",
                                    value: input.name,
                                }));
                        const $ao2 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): boolean =>
                            ("brand" === input.type ||
                                $guard(_exceptionable, {
                                    path: _path + ".type",
                                    expected: '"brand"',
                                    value: input.type,
                                })) &&
                            ("string" === typeof input.name ||
                                $guard(_exceptionable, {
                                    path: _path + ".name",
                                    expected: "string",
                                    value: input.name,
                                }));
                        const $au0 = (
                            input: any,
                            _path: string,
                            _exceptionable: boolean = true,
                        ): any =>
                            (() => {
                                if ("brand" === input.type)
                                    return $ao2(
                                        input,
                                        _path,
                                        true && _exceptionable,
                                    );
                                if ("manufacturer" === input.type)
                                    return $ao1(
                                        input,
                                        _path,
                                        true && _exceptionable,
                                    );
                                return $guard(_exceptionable, {
                                    path: _path,
                                    expected:
                                        "(ObjectNullable.IBrand | ObjectNullable.IManufacturer)",
                                    value: input,
                                });
                            })();
                        return (
                            ((Array.isArray(input) ||
                                $guard(true, {
                                    path: _path + "",
                                    expected: "ObjectNullable",
                                    value: input,
                                })) &&
                                (input.length === 3 ||
                                    $guard(true, {
                                        path: _path + "",
                                        expected:
                                            "[ObjectNullable.IProduct, ObjectNullable.IProduct, ObjectNullable.IProduct]",
                                        value: input,
                                    })) &&
                                (((("object" === typeof input[0] &&
                                    null !== input[0]) ||
                                    $guard(true, {
                                        path: _path + "[0]",
                                        expected: "ObjectNullable.IProduct",
                                        value: input[0],
                                    })) &&
                                    $ao0(input[0], _path + "[0]", true)) ||
                                    $guard(true, {
                                        path: _path + "[0]",
                                        expected: "ObjectNullable.IProduct",
                                        value: input[0],
                                    })) &&
                                (((("object" === typeof input[1] &&
                                    null !== input[1]) ||
                                    $guard(true, {
                                        path: _path + "[1]",
                                        expected: "ObjectNullable.IProduct",
                                        value: input[1],
                                    })) &&
                                    $ao0(input[1], _path + "[1]", true)) ||
                                    $guard(true, {
                                        path: _path + "[1]",
                                        expected: "ObjectNullable.IProduct",
                                        value: input[1],
                                    })) &&
                                (((("object" === typeof input[2] &&
                                    null !== input[2]) ||
                                    $guard(true, {
                                        path: _path + "[2]",
                                        expected: "ObjectNullable.IProduct",
                                        value: input[2],
                                    })) &&
                                    $ao0(input[2], _path + "[2]", true)) ||
                                    $guard(true, {
                                        path: _path + "[2]",
                                        expected: "ObjectNullable.IProduct",
                                        value: input[2],
                                    }))) ||
                            $guard(true, {
                                path: _path + "",
                                expected: "ObjectNullable",
                                value: input,
                            })
                        );
                    })(input, "$input", true);
                return input;
            };
            const prune = (
                input: [
                    ObjectNullable.IProduct,
                    ObjectNullable.IProduct,
                    ObjectNullable.IProduct,
                ],
            ): void => {
                const $io0 = (input: any): boolean =>
                    "string" === typeof input.name &&
                    "object" === typeof input.manufacturer &&
                    null !== input.manufacturer &&
                    $io1(input.manufacturer) &&
                    (null === input.brand ||
                        ("object" === typeof input.brand &&
                            null !== input.brand &&
                            $io2(input.brand))) &&
                    (null === input.similar ||
                        ("object" === typeof input.similar &&
                            null !== input.similar &&
                            $iu0(input.similar)));
                const $io1 = (input: any): boolean =>
                    "manufacturer" === input.type &&
                    "string" === typeof input.name;
                const $io2 = (input: any): boolean =>
                    "brand" === input.type && "string" === typeof input.name;
                const $iu0 = (input: any): any =>
                    (() => {
                        if ("brand" === input.type) return $io2(input);
                        if ("manufacturer" === input.type) return $io1(input);
                        return false;
                    })();
                const $throws = (typia.assertPrune as any).throws;
                const $po0 = (input: any): any => {
                    if (
                        "object" === typeof input.manufacturer &&
                        null !== input.manufacturer
                    )
                        $po1(input.manufacturer);
                    if ("object" === typeof input.brand && null !== input.brand)
                        $po2(input.brand);
                    if (
                        "object" === typeof input.similar &&
                        null !== input.similar
                    )
                        $pu0(input.similar);
                    for (const key of Object.keys(input)) {
                        if (
                            "name" === key ||
                            "manufacturer" === key ||
                            "brand" === key ||
                            "similar" === key
                        )
                            continue;
                        delete input[key];
                    }
                };
                const $po1 = (input: any): any => {
                    for (const key of Object.keys(input)) {
                        if ("type" === key || "name" === key) continue;
                        delete input[key];
                    }
                };
                const $po2 = (input: any): any => {
                    for (const key of Object.keys(input)) {
                        if ("type" === key || "name" === key) continue;
                        delete input[key];
                    }
                };
                const $pu0 = (input: any): any =>
                    (() => {
                        if ("brand" === input.type) return $po2(input);
                        if ("manufacturer" === input.type) return $po1(input);
                        $throws({
                            expected:
                                "(ObjectNullable.IBrand | ObjectNullable.IManufacturer)",
                            value: input,
                        });
                    })();
                if (
                    Array.isArray(input) &&
                    input.length === 3 &&
                    "object" === typeof input[0] &&
                    null !== input[0] &&
                    $io0(input[0]) &&
                    "object" === typeof input[1] &&
                    null !== input[1] &&
                    $io0(input[1]) &&
                    "object" === typeof input[2] &&
                    null !== input[2] &&
                    $io0(input[2])
                ) {
                    if ("object" === typeof input[0] && null !== input[0])
                        $po0(input[0]);
                    if ("object" === typeof input[1] && null !== input[1])
                        $po0(input[1]);
                    if ("object" === typeof input[2] && null !== input[2])
                        $po0(input[2]);
                }
            };
            assert(input);
            prune(input);
            return input;
        })(input),
    ObjectNullable.SPOILERS,
);
