export type IMetadataTag =
    // NUMBER
    | IMetadataTag.IType
    | IMetadataTag.IMinimum
    | IMetadataTag.IMaximum
    | IMetadataTag.IExclusiveMinimum
    | IMetadataTag.IExclusiveMaximum
    | IMetadataTag.IMultipleOf
    | IMetadataTag.IStep
    // STRING
    | IMetadataTag.IFormat
    | IMetadataTag.IPattern
    | IMetadataTag.ILength
    | IMetadataTag.IMinLength
    | IMetadataTag.IMaxLength
    // ARRAY
    | IMetadataTag.IItems
    | IMetadataTag.IMinItems
    | IMetadataTag.IMaxItems
    // 通用类型
    | IMetadataTag.IData;

export namespace IMetadataTag {
    /* -----------------------------------------------------------
        NUMBER
    ----------------------------------------------------------- */
    export interface IType {
        kind: "type";
        value: "int" | "uint";
    }

    export interface IMinimum {
        kind: "minimum";
        value: number;
    }

    export interface IMaximum {
        kind: "maximum";
        value: number;
    }

    export interface IExclusiveMinimum {
        kind: "exclusiveMinimum";
        value: number;
    }

    export interface IExclusiveMaximum {
        kind: "exclusiveMaximum";
        value: number;
    }

    export interface IMultipleOf {
        kind: "multipleOf";
        value: number;
    }

    export interface IStep {
        kind: "step";
        value: number;
    }

    /* -----------------------------------------------------------
        STRING
    ----------------------------------------------------------- */
    //增加身份证idcard、手机号码mobile、固话号码telphone等
    export interface IFormat {
        kind: "format";
        value:
            | "uuid"
            | "email"
            | "url"
            | "ipv4"
            | "ipv6"
            | "date"
            | "datetime"
            | "idcard"
            | "idcard_x"
            | "passport"
            | "telphone"
            | "contact"
            | "name"
            | "username"
            | "password"
            | "password_m"
            | "password_h"
            | "mobile";
    }

    export interface IPattern {
        kind: "pattern";
        value: string;
    }

    export interface ILength {
        kind: "length";
        value: number;
    }

    export interface IMinLength {
        kind: "minLength";
        value: number;
    }

    export interface IMaxLength {
        kind: "maxLength";
        value: number;
    }

    /* -----------------------------------------------------------
        ARRAY   
    ----------------------------------------------------------- */
    export interface IItems {
        kind: "items";
        value: number;
    }

    export interface IMinItems {
        kind: "minItems";
        value: number;
    }

    export interface IMaxItems {
        kind: "maxItems";
        value: number;
    }

    //增加@data值引用的metaTag，用于代码值从对象属性中获取值和设置到对象属性中去；
    export interface IData {
        kind: "data";
        value: string;
    }
}
