import { checkAll, checkCode, checkDate, checkProv } from "./idcard";

export const $is_idcard = (val: string): boolean => {
    if (!val) return false;
    if (val.length !== 18) {
        return false;
    }
    //身份证号校验，不含校验位
    const date = val.substring(6, 14);
    if (checkAll(val)) {
        if (checkDate(date)) {
            if (checkProv(val.substring(0, 2))) {
                return true;
            }
        }
    }
    return false;
};

export const $is_idcard_x = (val: string): boolean => {
    if (!val) return false;
    if (val.length !== 18) {
        return false;
    }
    //身份证号校验，不含校验位
    if (checkAll(val)) {
        //身份证号校验，含校验位
        if (checkCode(val)) {
            const date = val.substring(6, 14);
            if (checkDate(date)) {
                if (checkProv(val.substring(0, 2))) {
                    return true;
                }
            }
        }
    }
    return false;
};
