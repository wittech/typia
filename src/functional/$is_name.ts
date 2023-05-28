export const $is_name = (str: string): boolean => REGEX.test(str);

//正则校验中文生僻字
const REGEX = /^[\u4E00-\u9FA5\uf900-\ufa2d\u2E80-\uFE4F·s]{2,20}$/;
