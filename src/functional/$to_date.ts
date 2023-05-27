export const $to_date = (
    input: any,
    prop: string,
    value: string | Date,
): boolean => {
    if (value instanceof Date) {
        return true;
    }
    const date = new Date(value);
    const isDate = !isNaN(date.getTime());
    if (isDate) {
        //将input对象的属性prop值类型设置为新的类型；
        input[prop] = date;
    } else {
        input[prop] = undefined;
    }
    return isDate;
};
