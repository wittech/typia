export const $is_zipcode = (str: string): boolean => REGEX.test(str);

const REGEX = /^[0-9]{1}(\d+){5}$/;
