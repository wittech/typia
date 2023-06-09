import typia from "../../../../src";
import { _test_clone } from "../../../internal/_test_clone";
import { TemplateConstant } from "../../../structures/TemplateConstant";

export const test_createClone_TemplateConstant = _test_clone(
    "TemplateConstant",
    TemplateConstant.generate,
    (input: TemplateConstant): typia.Primitive<TemplateConstant> => {
        const $cp0 = (input: any) =>
            input.map((elem: any) =>
                "object" === typeof elem && null !== elem
                    ? $co0(elem)
                    : (elem as any),
            );
        const $co0 = (input: any): any => ({
            prefix: input.prefix as any,
            postfix: input.postfix as any,
            combined: input.combined as any,
        });
        return Array.isArray(input) ? $cp0(input) : (input as any);
    },
);
