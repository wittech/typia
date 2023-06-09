import typia from "../../../../src";
import { _test_isStringify } from "../../../internal/_test_isStringify";
import { ObjectUnionNonPredictable } from "../../../structures/ObjectUnionNonPredictable";

export const test_isStringify_ObjectUnionNonPredictable = _test_isStringify(
    "ObjectUnionNonPredictable",
    ObjectUnionNonPredictable.generate,
    (input) =>
        ((
            input: Array<
                ObjectUnionNonPredictable.IWrapper<ObjectUnionNonPredictable.IUnion>
            >,
        ): string | null => {
            const is = (
                input: any,
            ): input is Array<
                ObjectUnionNonPredictable.IWrapper<ObjectUnionNonPredictable.IUnion>
            > => {
                const $io0 = (input: any): boolean =>
                    "object" === typeof input.value &&
                    null !== input.value &&
                    $io1(input.value);
                const $io1 = (input: any): boolean =>
                    "object" === typeof input.value &&
                    null !== input.value &&
                    $iu0(input.value);
                const $io2 = (input: any): boolean =>
                    "object" === typeof input.value &&
                    null !== input.value &&
                    "boolean" === typeof (input.value as any).value;
                const $io4 = (input: any): boolean =>
                    "object" === typeof input.value &&
                    null !== input.value &&
                    "number" === typeof (input.value as any).value &&
                    Number.isFinite((input.value as any).value);
                const $io6 = (input: any): boolean =>
                    "object" === typeof input.value &&
                    null !== input.value &&
                    "string" === typeof (input.value as any).value;
                const $iu0 = (input: any): any =>
                    (() => {
                        if ($io6(input)) return $io6(input);
                        if ($io4(input)) return $io4(input);
                        if ($io2(input)) return $io2(input);
                        return false;
                    })();
                return (
                    Array.isArray(input) &&
                    input.every(
                        (elem: any) =>
                            "object" === typeof elem &&
                            null !== elem &&
                            $io0(elem),
                    )
                );
            };
            const stringify = (
                input: Array<
                    ObjectUnionNonPredictable.IWrapper<ObjectUnionNonPredictable.IUnion>
                >,
            ): string => {
                const $io1 = (input: any): boolean =>
                    "object" === typeof input.value &&
                    null !== input.value &&
                    $iu0(input.value);
                const $io2 = (input: any): boolean =>
                    "object" === typeof input.value &&
                    null !== input.value &&
                    $io3(input.value);
                const $io3 = (input: any): boolean =>
                    "boolean" === typeof input.value;
                const $io4 = (input: any): boolean =>
                    "object" === typeof input.value &&
                    null !== input.value &&
                    $io5(input.value);
                const $io5 = (input: any): boolean =>
                    "number" === typeof input.value;
                const $io6 = (input: any): boolean =>
                    "object" === typeof input.value &&
                    null !== input.value &&
                    $io7(input.value);
                const $io7 = (input: any): boolean =>
                    "string" === typeof input.value;
                const $iu0 = (input: any): any =>
                    $io6(input) || $io4(input) || $io2(input);
                const $number = (typia.isStringify as any).number;
                const $string = (typia.isStringify as any).string;
                const $throws = (typia.isStringify as any).throws;
                const $so0 = (input: any): any =>
                    `{"value":${$so1(input.value)}}`;
                const $so1 = (input: any): any =>
                    `{"value":${$su0(input.value)}}`;
                const $so2 = (input: any): any =>
                    `{"value":${`{"value":${(input.value as any).value}}`}}`;
                const $so4 = (input: any): any =>
                    `{"value":${`{"value":${$number(
                        (input.value as any).value,
                    )}}`}}`;
                const $so6 = (input: any): any =>
                    `{"value":${`{"value":${$string(
                        (input.value as any).value,
                    )}}`}}`;
                const $su0 = (input: any): any =>
                    (() => {
                        if ($io6(input)) return $so6(input);
                        if ($io4(input)) return $so4(input);
                        if ($io2(input)) return $so2(input);
                        $throws({
                            expected:
                                "(ObjectUnionNonPredictable.IWrapper<string> | ObjectUnionNonPredictable.IWrapper<number> | ObjectUnionNonPredictable.IWrapper<boolean>)",
                            value: input,
                        });
                    })();
                return `[${input.map((elem: any) => $so0(elem)).join(",")}]`;
            };
            return is(input) ? stringify(input) : null;
        })(input),
    ObjectUnionNonPredictable.SPOILERS,
);
