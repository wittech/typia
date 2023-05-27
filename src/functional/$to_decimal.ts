import Decimal from "decimal.js";

export const $to_decimal = (
    input: any,
    prop: string,
    value: string | number | Decimal,
): boolean => {
    if (value instanceof Decimal) {
        return true;
    } else if (typeof value === "number") {
        input[prop] = new Decimal(value);
        return true;
    }
    const isDec = Decimal.isDecimal(value);
    if (isDec) {
        //将input对象的属性prop值类型设置为新的类型；
        input[prop] = new Decimal(value);
    } else {
        input[prop] = undefined;
    }
    return isDec;
};
