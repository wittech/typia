import ts from "typescript";

import { Metadata } from "../../../metadata/Metadata";
import { MetadataTuple } from "../../../metadata/MetadataTuple";

import { Writable } from "../../../typings/Writable";

import { ArrayUtil } from "../../../utils/ArrayUtil";

import { MetadataCollection } from "../../MetadataCollection";
import { MetadataFactory } from "../../MetadataFactory";
import { explore_metadata } from "./explore_metadata";

export const emplace_metadata_tuple =
    (checker: ts.TypeChecker) =>
    (options: MetadataFactory.IOptions) =>
    (collection: MetadataCollection) =>
    (type: ts.TupleType, nullable: boolean): MetadataTuple => {
        // CHECK EXISTENCE
        const [tuple, newbie, closure] = collection.emplaceTuple(checker, type);
        ArrayUtil.add(tuple.nullables, nullable);
        if (newbie === false) return tuple;

        // CONSTRUCT ELEMENT TYPES
        const flagList: readonly ts.ElementFlags[] =
            type.elementFlags ??
            (type.target as ts.TupleType)?.elementFlags ??
            [];
        const elements: Metadata[] = checker
            .getTypeArguments(type as ts.TypeReference)
            .map((elem, i) => {
                const child: Metadata = explore_metadata(checker)(options)(
                    collection,
                )(elem, false, false);

                // CHECK OPTIONAL
                const flag: ts.ElementFlags | undefined = flagList[i];
                if (
                    flag === ts.ElementFlags.Optional &&
                    (child.required === false || child.any === true)
                )
                    Writable(child).optional = true;

                // REST TYPE
                if (flag !== ts.ElementFlags.Rest) return child;
                const wrapper: Metadata = Metadata.initialize();
                Writable(wrapper).rest = child;
                return wrapper;
            });
        closure(elements);

        return tuple;
    };
