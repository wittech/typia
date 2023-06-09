import typia from "../../../../src";
import { _test_assertClone } from "../../../internal/_test_assertClone";
import { ObjectNullable } from "../../../structures/ObjectNullable";

export const test_assertClone_ObjectNullable = _test_assertClone(
    "ObjectNullable",
    ObjectNullable.generate,
    (input) =>
        ((
            input: any,
        ): typia.Primitive<
            [
                ObjectNullable.IProduct,
                ObjectNullable.IProduct,
                ObjectNullable.IProduct,
            ]
        > => {
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
                        const $guard = (typia.assertClone as any).guard;
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
            const clone = (
                input: [
                    ObjectNullable.IProduct,
                    ObjectNullable.IProduct,
                    ObjectNullable.IProduct,
                ],
            ): typia.Primitive<
                [
                    ObjectNullable.IProduct,
                    ObjectNullable.IProduct,
                    ObjectNullable.IProduct,
                ]
            > => {
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
                const $throws = (typia.assertClone as any).throws;
                const $co0 = (input: any): any => ({
                    name: input.name as any,
                    manufacturer:
                        "object" === typeof input.manufacturer &&
                        null !== input.manufacturer
                            ? $co1(input.manufacturer)
                            : (input.manufacturer as any),
                    brand:
                        "object" === typeof input.brand && null !== input.brand
                            ? $co2(input.brand)
                            : (input.brand as any),
                    similar:
                        "object" === typeof input.similar &&
                        null !== input.similar
                            ? $cu0(input.similar)
                            : (input.similar as any),
                });
                const $co1 = (input: any): any => ({
                    type: input.type as any,
                    name: input.name as any,
                });
                const $co2 = (input: any): any => ({
                    type: input.type as any,
                    name: input.name as any,
                });
                const $cu0 = (input: any): any =>
                    (() => {
                        if ("brand" === input.type) return $co2(input);
                        if ("manufacturer" === input.type) return $co1(input);
                        $throws({
                            expected:
                                "(ObjectNullable.IBrand | ObjectNullable.IManufacturer)",
                            value: input,
                        });
                    })();
                return Array.isArray(input) &&
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
                    ? ([
                          "object" === typeof input[0] && null !== input[0]
                              ? $co0(input[0])
                              : (input[0] as any),
                          "object" === typeof input[1] && null !== input[1]
                              ? $co0(input[1])
                              : (input[1] as any),
                          "object" === typeof input[2] && null !== input[2]
                              ? $co0(input[2])
                              : (input[2] as any),
                      ] as any)
                    : (input as any);
            };
            assert(input);
            const output = clone(input);
            return output;
        })(input),
    ObjectNullable.SPOILERS,
);
