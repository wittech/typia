import ts from "typescript";

import { FeatureProgrammer } from "../FeatureProgrammer";
import { FunctionImporter } from "../helpers/FunctionImporeter";

/**
 * @internal
 */
export const check_decimal =
    (explore: FeatureProgrammer.IExplore) =>
    (importer: FunctionImporter) =>
    (input: ts.Expression) => {
        //如果是bool值，也自动进行转换
        return ts.factory.createCallExpression(
            importer.use(`to_decimal`),
            undefined,
            [
                ts.factory.createIdentifier("input"),
                ts.factory.createIdentifier(explore.postfix.replace(".", "")), //移除属性前面的符号点
                input,
            ],
        );
    };
