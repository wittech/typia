export const $is_telphone = (str: string): boolean => REGEX.test(str);

const REGEX = /^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{8}$/;
