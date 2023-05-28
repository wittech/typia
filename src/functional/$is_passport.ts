export const $is_passport = (str: string): boolean => REGEX.test(str);

const REGEX =
    /^(P\d{7}|G\d{7,8}|TH\d{7,8}|S\d{7,8}|A\d{7,8}|L\d{7,8}|\d{9}|D\d+|1[4,5]\d{7})$/;
