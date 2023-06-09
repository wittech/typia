import typia, { IValidation, Primitive } from "typia";

import { Spoiler } from "../helpers/Spoiler";
import { primitive_equal_to } from "../helpers/primitive_equal_to";
import { _check_invalidate_json_value } from "./_check_invalidate_json_value";

export const _test_validateParse =
    <T>(
        name: string,
        generator: () => T,
        parser: (input: string) => IValidation<Primitive<T>>,
        spoilers?: Spoiler<T>[],
    ) =>
    () => {
        const data: T = generator();
        const string: string = JSON.stringify(data);
        const expected: Primitive<T> = JSON.parse(string);
        const valid: IValidation<Primitive<T>> = parser(string);

        if (valid.success === false)
            throw new Error(
                `Bug on typia.validateParse(): failed to understand the ${name} type.`,
            );
        else if (primitive_equal_to(expected, valid.data) === false) {
            throw new Error(
                `Bug on typia.validateParse(): failed to understand the ${name} type.`,
            );
        }

        const wrong: ISpoiled[] = [];
        for (const spoil of spoilers ?? []) {
            const elem: T = generator();
            const expected: string[] = spoil(elem);
            if (_check_invalidate_json_value(elem)) continue;

            const valid: IValidation<Primitive<T>> = parser(
                JSON.stringify(elem),
            );
            if (valid.success === true)
                throw new Error(
                    `Bug on typia.validateParse(): failed to detect error on the ${name} type.`,
                );

            typia.assert(valid);
            expected.sort();
            valid.errors.sort((x, y) => (x.path < y.path ? -1 : 1));

            if (
                valid.errors.length !== expected.length ||
                valid.errors.every((e, i) => e.path === expected[i]) === false
            )
                wrong.push({
                    expected,
                    actual: valid.errors.map((e) => e.path),
                });
        }
        if (wrong.length !== 0) {
            console.log(wrong);
            throw new Error(
                `Bug on typia.validateParse(): failed to detect error on the ${name} type.`,
            );
        }
    };

interface ISpoiled {
    expected: string[];
    actual: string[];
}
