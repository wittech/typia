import typia from "../../../../src";
import { _test_stringify } from "../../../internal/_test_stringify";
import { NativeUnion } from "../../../structures/NativeUnion";

export const test_createStringify_NativeUnion = _test_stringify(
    "NativeUnion",
    NativeUnion.generate,
    (input: NativeUnion): string => {
        const $io1 = (input: any): boolean =>
            "Buffer" === input.type &&
            Array.isArray(input.data) &&
            input.data.every((elem: any) => "number" === typeof elem);
        const $string = (typia.createStringify as any).string;
        const $throws = (typia.createStringify as any).throws;
        const $number = (typia.createStringify as any).number;
        const $so0 = (input: any): any =>
            `{"date":${
                null !== input.date
                    ? (() => {
                          if (
                              "object" === typeof input.date &&
                              "function" === typeof input.date.toJSON
                          )
                              return JSON.stringify(input.date.toJSON());
                          if ("string" === typeof input.date)
                              return $string(input.date);
                          $throws({
                              expected: "(null | string | unknown)",
                              value: input.date,
                          });
                      })()
                    : "null"
            },"unsigned":${(() => {
                if (input.unsigned instanceof Uint8Array) return "{}";
                if (input.unsigned instanceof Uint8ClampedArray) return "{}";
                if (input.unsigned instanceof Uint16Array) return "{}";
                if (input.unsigned instanceof Uint32Array) return "{}";
                if (input.unsigned instanceof BigUint64Array) return "{}";
                $throws({
                    expected:
                        "(BigUint64Array | Uint16Array | Uint32Array | Uint8Array | Uint8ClampedArray)",
                    value: input.unsigned,
                });
            })()},"signed":${(() => {
                if (input.signed instanceof Int8Array) return "{}";
                if (input.signed instanceof Int16Array) return "{}";
                if (input.signed instanceof Int32Array) return "{}";
                if (input.signed instanceof BigInt64Array) return "{}";
                $throws({
                    expected:
                        "(BigInt64Array | Int16Array | Int32Array | Int8Array)",
                    value: input.signed,
                });
            })()},"float":${(() => {
                if (input.float instanceof Float32Array) return "{}";
                if (input.float instanceof Float64Array) return "{}";
                $throws({
                    expected: "(Float32Array | Float64Array)",
                    value: input.float,
                });
            })()},"buffer":${(() => {
                if (
                    "object" === typeof input.buffer &&
                    "function" === typeof input.buffer.toJSON
                )
                    return JSON.stringify(input.buffer.toJSON());
                if (input.buffer instanceof ArrayBuffer) return "{}";
                if (input.buffer instanceof SharedArrayBuffer) return "{}";
                if (input.buffer instanceof DataView) return "{}";
                if ("object" === typeof input.buffer && null !== input.buffer)
                    return $so1(input.buffer);
                $throws({
                    expected:
                        "(ArrayBuffer | DataView | SharedArrayBuffer | __type | unknown)",
                    value: input.buffer,
                });
            })()},"weak":${(() => {
                if (input.weak instanceof WeakSet) return "{}";
                if (input.weak instanceof WeakMap) return "{}";
                $throws({
                    expected: "(WeakMap | WeakSet)",
                    value: input.weak,
                });
            })()}}`;
        const $so1 = (input: any): any =>
            `{"type":${(() => {
                if ("string" === typeof input.type) return $string(input.type);
                if ("string" === typeof input.type)
                    return '"' + input.type + '"';
                $throws({
                    expected: '"Buffer"',
                    value: input.type,
                });
            })()},"data":${`[${input.data
                .map((elem: any) => $number(elem))
                .join(",")}]`}}`;
        return `[${input.map((elem: any) => $so0(elem)).join(",")}]`;
    },
);
