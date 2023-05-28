export const checkDate = (val: string) => {
    const pattern =
        /^(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)$/;
    if (pattern.test(val)) {
        const year = val.substring(0, 4);
        const month = val.substring(4, 6);
        const date = val.substring(6, 8);
        const date2 = new Date(year + "-" + month + "-" + date);
        if (date2 && date2.getMonth() == parseInt(month) - 1) {
            return true;
        }
    }
    return false;
};

export const checkCode = (val: any) => {
    const p =
        /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    const factor: any = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2];
    const parity = [1, 0, "X", 9, 8, 7, 6, 5, 4, 3, 2];
    const code = val.substring(17);
    if (p.test(val)) {
        let sum = 0;
        for (let i = 0; i < 17; i++) {
            sum += val[i] * factor[i];
        }
        if (parity[sum % 11] == code.toUpperCase()) {
            return true;
        }
    }
    return false;
};

const provs: any = {
    11: "北京",
    12: "天津",
    13: "河北",
    14: "山西",
    15: "内蒙古",
    21: "辽宁",
    22: "吉林",
    23: "黑龙江",
    31: "上海",
    32: "江苏",
    33: "浙江",
    34: "安徽",
    35: "福建",
    36: "江西",
    37: "山东",
    41: "河南",
    42: "湖北 ",
    43: "湖南",
    44: "广东",
    45: "广西",
    46: "海南",
    50: "重庆",
    51: "四川",
    52: "贵州",
    53: "云南",
    54: "西藏 ",
    61: "陕西",
    62: "甘肃",
    63: "青海",
    64: "宁夏",
    65: "新疆",
    71: "台湾",
    81: "香港",
    82: "澳门",
};
export const checkProv = (val: string) => {
    const pattern = /^[1-9][0-9]/;
    if (pattern.test(val)) {
        if (provs[val]) {
            return true;
        }
    }
    return false;
};

export const checkBirth = (val: string) => {
    const pattern =
        /^(19|20)\d{2}\-((0?[1-9])|(1[0-2]))\-((0?[1-9])|([1-2]\d)|3[01])$/;
    if (pattern.test(val)) {
        const date = new Date(val);
        if (date < new Date("1919-12-31") || date > new Date()) {
            return false;
        }
        const month = val.substring(val.indexOf("-") + 1, val.lastIndexOf("-"));
        return date && date.getMonth() + 1 == parseInt(month);
    }
    return false;
};

//先用简单规则匹配
export const checkAll = (val: string) => {
    const pattern =
        /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(1[0-2]))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/;
    return pattern.test(val);
};

//从身份证号中提取信息
// export const getIdCard = (idcard: string) => {
//     if (!_isEmpty(idcard) && idcard.length === 18) {
//         const val = idcard.substring(6, 14);
//         let birth;
//         if (checkDate(val)) {
//             const year = val.substring(0, 4);
//             const month = val.substring(4, 6);
//             const date = val.substring(6, 8);
//             birth = year + "-" + month + "-" + date;
//         }
//         const gender = parseInt(idcard.substr(16, 1)) % 2;
//         let g;
//         if (gender === 1) {
//             g = { key: "1", name: "男" };
//         } else {
//             g = { key: "2", name: "女" };
//         }
//         const prov = idcard.substr(0, 2);

//         const p = provs[prov];
//         let pr;
//         if (!_isEmpty(p)) {
//             pr = { key: prov, name: p };
//         }
//         return { birth, gender: g, province: pr };
//     }

//     return {};
// };
