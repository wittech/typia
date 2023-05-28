export const $is_username = (str: string): boolean => REGEX.test(str);

//用户名正则，6到30位（字母，数字，下划线）和特殊符号
const REGEX = /^[a-zA-Z0-9_@#!&%$]{6,30}$/;
