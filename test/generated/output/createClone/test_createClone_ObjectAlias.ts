import typia from "../../../../src";
import { _test_clone } from "../../../internal/_test_clone";
import { ObjectAlias } from "../../../structures/ObjectAlias";

export const test_createClone_ObjectAlias = _test_clone(
    "ObjectAlias",
    ObjectAlias.generate,
    (input: ObjectAlias): typia.Primitive<ObjectAlias> => {
        const $cp0 = (input: any) =>
            input.map((elem: any) =>
                "object" === typeof elem && null !== elem
                    ? $co0(elem)
                    : (elem as any),
            );
        const $co0 = (input: any): any => ({
            id: input.id as any,
            email: input.email as any,
            name: input.name as any,
            sex: input.sex as any,
            age: input.age as any,
            dead: input.dead as any,
        });
        return Array.isArray(input) ? $cp0(input) : (input as any);
    },
);
