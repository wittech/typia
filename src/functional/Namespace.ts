import { RandomGenerator } from "../utils/RandomGenerator";

import { IValidation } from "../IValidation";
import { TypeGuardError } from "../TypeGuardError";
import { $any } from "./$any";
import { $every } from "./$every";
import { $guard } from "./$guard";
import { $is_between } from "./$is_between";
import { $is_contact } from "./$is_contact";
import { $is_custom } from "./$is_custom";
import { $is_date } from "./$is_date";
import { $is_datetime } from "./$is_datetime";
import { $is_email } from "./$is_email";
import { $is_idcard, $is_idcard_x } from "./$is_idcard";
import { $is_ipv4 } from "./$is_ipv4";
import { $is_ipv6 } from "./$is_ipv6";
import { $is_mobile } from "./$is_mobile";
import { $is_name } from "./$is_name";
import { $is_passport } from "./$is_passport";
import { $is_password } from "./$is_password";
import { $is_password_h } from "./$is_password_h";
import { $is_password_m } from "./$is_password_m";
import { $is_telphone } from "./$is_telphone";
import { $is_url } from "./$is_url";
import { $is_username } from "./$is_username";
import { $is_uuid } from "./$is_uuid";
import { $is_zipcode } from "./$is_zipcode";
import { $join } from "./$join";
import { $number } from "./$number";
import { $report } from "./$report";
import { $rest } from "./$rest";
import { $string } from "./$string";
import { $tail } from "./$tail";
import { $to_bool } from "./$to_bool";
import { $to_date } from "./$to_date";
import { $to_decimal } from "./$to_decimal";

/**
 * @internal
 */
export namespace Namespace {
    export const is = () => ({
        is_uuid: $is_uuid,
        is_email: $is_email,
        is_url: $is_url,
        is_ipv4: $is_ipv4,
        is_ipv6: $is_ipv6,
        is_between: $is_between,
        is_date: $is_date,
        is_datetime: $is_datetime,
        is_custom: $is_custom,
        is_mobile: $is_mobile,
        is_telphone: $is_telphone,
        is_username: $is_username,
        is_password: $is_password,
        is_password_m: $is_password_m,
        is_password_h: $is_password_h,
        is_passport: $is_passport,
        is_contact: $is_contact,
        is_zipcode: $is_zipcode,
        is_idcard: $is_idcard,
        is_idcard_x: $is_idcard_x,
        is_name: $is_name,
        to_date: $to_date,
        to_bool: $to_bool,
        to_decimal: $to_decimal,
    });

    export const assert = (method: string) => ({
        ...is(),
        join: $join,
        every: $every,
        guard: $guard(`typia.${method}`),
        predicate: (
            matched: boolean,
            exceptionable: boolean,
            closure: () => Omit<TypeGuardError.IProps, "method">,
        ): boolean => {
            if (matched === false && exceptionable === true)
                throw new TypeGuardError({
                    ...closure(),
                    method: `typia.${method}`,
                });
            return matched;
        },
    });

    export const validate = () => ({
        ...is(),
        join: $join,
        report: $report,
        predicate:
            (res: IValidation) =>
            (
                matched: boolean,
                exceptionable: boolean,
                closure: () => IValidation.IError,
            ) => {
                // CHECK FAILURE
                if (matched === false && exceptionable === true)
                    (() => {
                        res.success &&= false;
                        const errorList = (res as IValidation.IFailure).errors;

                        // TRACE ERROR
                        const error = closure();
                        if (errorList.length) {
                            const last = errorList[errorList.length - 1]!.path;
                            if (
                                last.length >= error.path.length &&
                                last.substring(0, error.path.length) ===
                                    error.path
                            )
                                return;
                        }
                        errorList.push(error);
                        return;
                    })();
                return matched;
            },
    });

    export const stringify = (method: string) => ({
        ...is(),
        number: $number,
        string: $string,
        tail: $tail,
        rest: $rest,
        throws: $throws(method),
    });

    export const clone = (method: string) => ({
        ...is(),
        throws: $throws(method),
        any: $any,
    });

    export const prune = (method: string) => ({
        ...is(),
        throws: $throws(method),
    });

    export const random = () => ({
        generator: RandomGenerator,
        pick: RandomGenerator.pick,
    });

    const $throws =
        (method: string) =>
        (props: Pick<TypeGuardError.IProps, "expected" | "value">) => {
            throw new TypeGuardError({
                ...props,
                method: `typia.${method}`,
            });
        };
}
