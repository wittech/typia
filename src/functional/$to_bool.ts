export const $to_bool = (
    input: any,
    prop: string,
    value: string | number | boolean | Boolean,
): boolean => {
    if (typeof value === "boolean") {
        return true;
    } else if (value instanceof Boolean) {
        input[prop] = value.valueOf();
        return true;
    }

    if (value === "1" || value === 1 || /^true$/i.test(value.toString())) {
        input[prop] = true;
        return true;
    } else if (
        value === "0" ||
        value === 0 ||
        /^false$/i.test(value.toString())
    ) {
        input[prop] = false;
        return true;
    } else {
        input[prop] = undefined;
        return false;
    }
};
