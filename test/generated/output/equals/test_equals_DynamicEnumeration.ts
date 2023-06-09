import typia from "../../../../src";
import { _test_equals } from "../../../internal/_test_equals";
import { DynamicEnumeration } from "../../../structures/DynamicEnumeration";

export const test_equals_DynamicEnumeration = _test_equals(
    "DynamicEnumeration",
    DynamicEnumeration.generate,
    (input) =>
        ((
            input: any,
            _exceptionable: boolean = true,
        ): input is {
            ar?: string | undefined;
            "zh-Hans"?: string | undefined;
            "zh-Hant"?: string | undefined;
            en?: string | undefined;
            fr?: string | undefined;
            de?: string | undefined;
            ja?: string | undefined;
            ko?: string | undefined;
            pt?: string | undefined;
            ru?: string | undefined;
        } => {
            const $io0 = (
                input: any,
                _exceptionable: boolean = true,
            ): boolean =>
                (undefined === input.ar || "string" === typeof input.ar) &&
                (undefined === input["zh-Hans"] ||
                    "string" === typeof input["zh-Hans"]) &&
                (undefined === input["zh-Hant"] ||
                    "string" === typeof input["zh-Hant"]) &&
                (undefined === input.en || "string" === typeof input.en) &&
                (undefined === input.fr || "string" === typeof input.fr) &&
                (undefined === input.de || "string" === typeof input.de) &&
                (undefined === input.ja || "string" === typeof input.ja) &&
                (undefined === input.ko || "string" === typeof input.ko) &&
                (undefined === input.pt || "string" === typeof input.pt) &&
                (undefined === input.ru || "string" === typeof input.ru) &&
                (0 === Object.keys(input).length ||
                    Object.keys(input).every((key: any) => {
                        if (
                            [
                                "ar",
                                "zh-Hans",
                                "zh-Hant",
                                "en",
                                "fr",
                                "de",
                                "ja",
                                "ko",
                                "pt",
                                "ru",
                            ].some((prop: any) => key === prop)
                        )
                            return true;
                        const value = input[key];
                        if (undefined === value) return true;
                        return false;
                    }));
            return (
                "object" === typeof input &&
                null !== input &&
                false === Array.isArray(input) &&
                $io0(input, true)
            );
        })(input),
);
