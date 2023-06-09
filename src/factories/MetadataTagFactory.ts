import ts from "typescript";

import { IMetadataTag } from "../metadata/IMetadataTag";
import { Metadata } from "../metadata/Metadata";

export namespace MetadataTagFactory {
    export const generate =
        (metadata: Metadata) =>
        (tagList: ts.JSDocTagInfo[]) =>
        (identifier: () => string): IMetadataTag[] => {
            const output: IMetadataTag[] = [];
            for (const tag of tagList) {
                const elem: IMetadataTag | null = parse(
                    identifier,
                    metadata,
                    tag,
                    output,
                );
                if (elem !== null) output.push(elem);
            }
            return output;
        };

    const parse = (
        identifier: () => string,
        metadata: Metadata,
        tag: ts.JSDocTagInfo,
        output: IMetadataTag[],
    ): IMetadataTag | null => {
        const closure = _PARSER[tag.name];
        if (closure === undefined) return null;

        const text = (tag.text || [])[0]?.text;
        if (text === undefined)
            throw new Error(`${LABEL}: no tag value on ${identifier()}`);

        return closure(identifier, metadata, text, output);
    };

    /**
     * @internal
     */
    export const _PARSER: Record<
        string,
        (
            identifier: () => string,
            metadata: Metadata,
            text: string,
            output: IMetadataTag[],
        ) => IMetadataTag | null
    > = {
        /* -----------------------------------------------------------
            ARRAY
        ----------------------------------------------------------- */
        items: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "items", "array", [
                "minItems",
            ]);
            return {
                kind: "items",
                value: parse_number(identifier, text),
            };
        },
        minItems: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "minItems", "array", [
                "items",
            ]);
            return {
                kind: "minItems",
                value: parse_number(identifier, text),
            };
        },
        maxItems: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "maxItems", "array", [
                "items",
            ]);
            return {
                kind: "maxItems",
                value: parse_number(identifier, text),
            };
        },

        /* -----------------------------------------------------------
            NUMBER
        ----------------------------------------------------------- */
        type: (_identifier, metadata, text, _output) => {
            return has_atomic(metadata)("number") &&
                (text === "int" || text === "uint")
                ? { kind: "type", value: text }
                : text === "{int}" || text === "{uint}"
                ? { kind: "type", value: text.slice(1, -1) as "int" | "uint" }
                : null;
        },
        minimum: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "minimum", "number", [
                "exclusiveMinimum",
            ]);
            return {
                kind: "minimum",
                value: parse_number(identifier, text),
            };
        },
        maximum: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "maximum", "number", [
                "exclusiveMaximum",
            ]);
            return {
                kind: "maximum",
                value: parse_number(identifier, text),
            };
        },
        exclusiveMinimum: (identifier, metadata, text, output) => {
            validate(
                identifier,
                metadata,
                output,
                "exclusiveMinimum",
                "number",
                ["minimum"],
            );
            return {
                kind: "exclusiveMinimum",
                value: parse_number(identifier, text),
            };
        },
        exclusiveMaximum: (identifier, metadata, text, output) => {
            validate(
                identifier,
                metadata,
                output,
                "exclusiveMaximum",
                "number",
                ["maximum"],
            );
            return {
                kind: "exclusiveMaximum",
                value: parse_number(identifier, text),
            };
        },
        multipleOf: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "multipleOf", "number", [
                "step",
            ]);
            return {
                kind: "multipleOf",
                value: parse_number(identifier, text),
            };
        },
        step: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "step", "number", [
                "multipleOf",
            ]);

            const minimum: boolean = output.some(
                (tag) =>
                    tag.kind === "minimum" || tag.kind === "exclusiveMinimum",
            );
            if (minimum === undefined)
                throw new Error(
                    `${LABEL}: step requires minimum or exclusiveMinimum tag on "${identifier()}".`,
                );

            return {
                kind: "step",
                value: parse_number(identifier, text),
            };
        },

        /* -----------------------------------------------------------
            STRING
        ----------------------------------------------------------- */
        format: (identifier, metadata, str, output) => {
            validate(identifier, metadata, output, "format", "string", [
                "pattern",
            ]);

            // Ignore arbitrary @format values in the internal metadata,
            // these are currently only supported on the typia.application() API.
            const value: IMetadataTag.IFormat["value"] | undefined =
                FORMATS.get(str);
            if (value === undefined) return null;
            return {
                kind: "format",
                value,
            };
        },
        pattern: (identifier, metadata, value, output) => {
            validate(identifier, metadata, output, "pattern", "string", [
                "format",
            ]);
            return {
                kind: "pattern",
                value,
            };
        },
        length: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "length", "string", [
                "minLength",
                "maxLength",
            ]);
            return {
                kind: "length",
                value: parse_number(identifier, text),
            };
        },
        minLength: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "minLength", "string", [
                "length",
            ]);
            return {
                kind: "minLength",
                value: parse_number(identifier, text),
            };
        },
        maxLength: (identifier, metadata, text, output) => {
            validate(identifier, metadata, output, "maxLength", "string", [
                "length",
            ]);
            return {
                kind: "maxLength",
                value: parse_number(identifier, text),
            };
        },
        data: (_identifier, _metadata, text, _output) => {
            return {
                kind: "data",
                value: text,
            };
        },
    };
}

const parse_number = (identifier: () => string, str: string): number => {
    const value: number = Number(str);
    if (isNaN(value) === true)
        throw new Error(`${LABEL}: invalid number on "${identifier()}".`);
    return value;
};

const LABEL = "Error on typia.MetadataTagFactory.generate()";
const FORMATS: Map<string, IMetadataTag.IFormat["value"]> = new Map([
    ["uuid", "uuid"],
    ["email", "email"],
    ["url", "url"],
    ["ipv4", "ipv4"],
    ["ipv6", "ipv6"],
    ["date", "date"],
    ["datetime", "datetime"],
    ["date-time", "datetime"],
    ["idcard", "idcard"],
    ["idCard", "idcard"],
    ["id-card", "idcard"],
    ["idcard_x", "idcard_x"],
    ["passport", "passport"],
    ["telphone", "telphone"],
    ["contact", "contact"],
    ["name", "name"],
    ["username", "username"],
    ["password", "password"],
    ["password_m", "password_m"],
    ["password_h", "password_h"],
    ["mobile", "mobile"],
]);

const WRONG_TYPE = (
    tag: string,
    type: "string" | "number" | "array",
    identifier: () => string,
) => `${LABEL}: ${tag} requires ${type} type, but no "${identifier()}".`;

const validate = (
    identifier: () => string,
    metadata: Metadata,
    output: IMetadataTag[],
    kind: IMetadataTag["kind"],
    type: "array" | "string" | "number",
    neighbors: IMetadataTag["kind"][],
): void => {
    // TYPE CHECKING
    if (type === "array") {
        if (has_array(metadata) === false)
            throw new Error(WRONG_TYPE(kind, "array", identifier));
    } else if (has_atomic(metadata)(type) === false)
        throw new Error(WRONG_TYPE(kind, type, identifier));

    // DUPLICATED TAG
    if (output.some((tag) => tag.kind === kind))
        throw new Error(
            `${LABEL}: duplicated ${kind} tags on "${identifier()}".`,
        );

    // NEIGHBOR TAG
    for (const name of neighbors)
        if (output.some((tag) => tag.kind === name))
            throw new Error(
                `${LABEL}: ${kind} and ${name} tags on "${identifier()}".`,
            );
};

// @todo: must block repeated array and tuple type
const has_atomic =
    (metadata: Metadata) =>
    (type: "string" | "number"): boolean =>
        metadata.atomics.find(
            type === "number"
                ? (atom: string) => atom === type || atom === "bigint"
                : (atom: string) => atom === type,
        ) !== undefined ||
        metadata.arrays.some((child) => has_atomic(child.value)(type)) ||
        metadata.tuples.some((tuple) =>
            tuple.elements.some((child) => has_atomic(child)(type)),
        );

const has_array = (metadata: Metadata): boolean =>
    metadata.arrays.length !== 0 ||
    metadata.tuples.some((tuple) =>
        tuple.elements.some((child) => has_array(child)),
    );
