export const $is_password_m = (str: string): boolean => REGEX.test(str);

//密码强度正则，最少8位，包括至少1个大写字母，1个小写字母，1个数字
const REGEX = /^.*(?=.{8,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z]).*$/;
