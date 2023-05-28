export const $is_contact = (str: string): boolean => REGEX.test(str);
/** 联系方式：手机或座机 */
const REGEX =
    /^((13[0-9]|14[0-9]|15[0-9]|16[0-9]|17[0-9]|18[0-9]|19[0-9])[0-9]{8})|(0\d{2,3}-\d{7,8})$/;
