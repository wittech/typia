export const $is_password = (str: string): boolean => REGEX.test(str);

//密码正则，以字母开头，长度在6~18之间，只能包含字母、数字和下划线
const REGEX = /^[a-zA-Z]\w{6,18}$/;
