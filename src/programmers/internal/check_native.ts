import ts from "typescript";

import { ExpressionFactory } from "../../factories/ExpressionFactory";

import { FeatureProgrammer } from "../FeatureProgrammer";
import { FunctionImporter } from "../helpers/FunctionImporeter";

/**
 * @internal
 */
export const check_native =
    (explore: FeatureProgrammer.IExplore) =>
    (importer: FunctionImporter) =>
    (type: string) =>
    (input: ts.Expression) => {
        //针对Date类型单独处理；之前date直接生成的是instanceOf Date，如果是传的字符串类型的就肯定过不到；强制转换一下看；
        if (type === "Date") {
            return ts.factory.createCallExpression(
                importer.use(`to_date`),
                undefined,
                [
                    ts.factory.createIdentifier("input"),
                    ts.factory.createIdentifier(
                        explore.postfix.replace(".", ""),
                    ), //移除属性前面的符号点
                    input,
                ],
            );
        }
        if (type === "Boolean") {
            //如果是bool值，也自动进行转换
            return ts.factory.createCallExpression(
                importer.use(`to_bool`),
                undefined,
                [
                    ts.factory.createIdentifier("input"),
                    ts.factory.createIdentifier(
                        explore.postfix.replace(".", ""),
                    ), //移除属性前面的符号点
                    input,
                ],
            );
        }
        const instanceOf = ExpressionFactory.isInstanceOf(type)(input);
        return ATOMIC_LIKE.has(type)
            ? ts.factory.createLogicalOr(
                  ts.factory.createStrictEquality(
                      ts.factory.createStringLiteral(type.toLowerCase()),
                      ts.factory.createTypeOfExpression(input),
                  ),
                  instanceOf,
              )
            : instanceOf;
    };

const ATOMIC_LIKE = new Set(["Boolean", "Number", "String"]);
