import { Primitive, TypeGuardError } from "typia";

import { Spoiler } from "../helpers/Spoiler";
import { primitive_equal_to } from "../helpers/primitive_equal_to";
import { _check_invalidate_json_value } from "./_check_invalidate_json_value";

export const _test_assertParse =
    <T>(
        name: string,
        generator: () => T,
        parser: (input: string) => Primitive<T>,
        spoilers?: Spoiler<T>[],
    ) =>
    () => {
        const data: T = generator();
        const string: string = JSON.stringify(data);
        const expected: Primitive<T> = JSON.parse(string);
        const parsed: Primitive<T> = parser(string);

        if (primitive_equal_to(expected, parsed) === false) {
            throw new Error(
                `Bug on typia.assertParse(): failed to understand the ${name} type.`,
            );
        }

        for (const spoil of spoilers ?? []) {
            const elem: T = generator();
            const expected: string[] = spoil(elem);
            if (_check_invalidate_json_value(elem)) continue;

            try {
                parser(JSON.stringify(elem));
            } catch (exp) {
                if (exp instanceof TypeGuardError)
                    if (exp.path && expected.includes(exp.path) === true)
                        continue;
                    else
                        console.log({
                            expected,
                            actual: exp.path,
                        });
            }
            throw new Error(
                `Bug on typia.assertParse(): failed to detect error on the ${name} type.`,
            );
        }
    };
