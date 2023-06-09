import typia from "../../../../src";
import { _test_clone } from "../../../internal/_test_clone";
import { ObjectUnionNonPredictable } from "../../../structures/ObjectUnionNonPredictable";

export const test_createClone_ObjectUnionNonPredictable = _test_clone(
    "ObjectUnionNonPredictable",
    ObjectUnionNonPredictable.generate,
    (
        input: ObjectUnionNonPredictable,
    ): typia.Primitive<ObjectUnionNonPredictable> => {
        const $io1 = (input: any): boolean =>
            "object" === typeof input.value &&
            null !== input.value &&
            $iu0(input.value);
        const $io2 = (input: any): boolean =>
            "object" === typeof input.value &&
            null !== input.value &&
            $io3(input.value);
        const $io3 = (input: any): boolean => "boolean" === typeof input.value;
        const $io4 = (input: any): boolean =>
            "object" === typeof input.value &&
            null !== input.value &&
            $io5(input.value);
        const $io5 = (input: any): boolean => "number" === typeof input.value;
        const $io6 = (input: any): boolean =>
            "object" === typeof input.value &&
            null !== input.value &&
            $io7(input.value);
        const $io7 = (input: any): boolean => "string" === typeof input.value;
        const $iu0 = (input: any): any =>
            $io6(input) || $io4(input) || $io2(input);
        const $throws = (typia.createClone as any).throws;
        const $cp0 = (input: any) =>
            input.map((elem: any) =>
                "object" === typeof elem && null !== elem
                    ? $co0(elem)
                    : (elem as any),
            );
        const $co0 = (input: any): any => ({
            value:
                "object" === typeof input.value && null !== input.value
                    ? $co1(input.value)
                    : (input.value as any),
        });
        const $co1 = (input: any): any => ({
            value:
                "object" === typeof input.value && null !== input.value
                    ? $cu0(input.value)
                    : (input.value as any),
        });
        const $co2 = (input: any): any => ({
            value:
                "object" === typeof input.value && null !== input.value
                    ? $co3(input.value)
                    : (input.value as any),
        });
        const $co3 = (input: any): any => ({
            value: input.value as any,
        });
        const $co4 = (input: any): any => ({
            value:
                "object" === typeof input.value && null !== input.value
                    ? $co5(input.value)
                    : (input.value as any),
        });
        const $co5 = (input: any): any => ({
            value: input.value as any,
        });
        const $co6 = (input: any): any => ({
            value:
                "object" === typeof input.value && null !== input.value
                    ? $co7(input.value)
                    : (input.value as any),
        });
        const $co7 = (input: any): any => ({
            value: input.value as any,
        });
        const $cu0 = (input: any): any =>
            (() => {
                if ($io6(input)) return $co6(input);
                if ($io4(input)) return $co4(input);
                if ($io2(input)) return $co2(input);
                $throws({
                    expected:
                        "(ObjectUnionNonPredictable.IWrapper<string> | ObjectUnionNonPredictable.IWrapper<number> | ObjectUnionNonPredictable.IWrapper<boolean>)",
                    value: input,
                });
            })();
        return Array.isArray(input) ? $cp0(input) : (input as any);
    },
);
