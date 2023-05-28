export const $is_mobile = (str: string): boolean => REGEX.test(str);

const REGEX =
    /^(13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8}$/;
