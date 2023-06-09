import typia from "../../../../src";
import { _test_isStringify } from "../../../internal/_test_isStringify";
import { ConstantAtomicWrapper } from "../../../structures/ConstantAtomicWrapper";

export const test_isStringify_ConstantAtomicWrapper = _test_isStringify(
    "ConstantAtomicWrapper",
    ConstantAtomicWrapper.generate,
    (input) =>
        ((
            input: [
                ConstantAtomicWrapper.IPointer<boolean>,
                ConstantAtomicWrapper.IPointer<number>,
                ConstantAtomicWrapper.IPointer<string>,
            ],
        ): string | null => {
            const is = (
                input: any,
            ): input is [
                ConstantAtomicWrapper.IPointer<boolean>,
                ConstantAtomicWrapper.IPointer<number>,
                ConstantAtomicWrapper.IPointer<string>,
            ] => {
                const $io0 = (input: any): boolean =>
                    "boolean" === typeof input.value;
                const $io1 = (input: any): boolean =>
                    "number" === typeof input.value &&
                    Number.isFinite(input.value);
                const $io2 = (input: any): boolean =>
                    "string" === typeof input.value;
                return (
                    Array.isArray(input) &&
                    input.length === 3 &&
                    "object" === typeof input[0] &&
                    null !== input[0] &&
                    $io0(input[0]) &&
                    "object" === typeof input[1] &&
                    null !== input[1] &&
                    $io1(input[1]) &&
                    "object" === typeof input[2] &&
                    null !== input[2] &&
                    $io2(input[2])
                );
            };
            const stringify = (
                input: [
                    ConstantAtomicWrapper.IPointer<boolean>,
                    ConstantAtomicWrapper.IPointer<number>,
                    ConstantAtomicWrapper.IPointer<string>,
                ],
            ): string => {
                const $number = (typia.isStringify as any).number;
                const $string = (typia.isStringify as any).string;
                return `[${`{"value":${
                    (input[0] as any).value
                }}`},${`{"value":${$number(
                    (input[1] as any).value,
                )}}`},${`{"value":${$string((input[2] as any).value)}}`}]`;
            };
            return is(input) ? stringify(input) : null;
        })(input),
    ConstantAtomicWrapper.SPOILERS,
);
