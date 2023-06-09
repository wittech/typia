import ts from "typescript";

import { Metadata } from "../metadata/Metadata";
import { explore_metadata } from "./internal/metadata/explore_metadata";
import { iterate_metadata_collection } from "./internal/metadata/iterate_metadata_collection";
import { iterate_metadata_sort } from "./internal/metadata/iterate_metadata_sort";

import { MetadataCollection } from "./MetadataCollection";

export namespace MetadataFactory {
    export interface IOptions {
        resolve: boolean;
        constant: boolean;
        absorb: boolean;
        validate?: (meta: Metadata) => void;
    }

    export const analyze =
        (checker: ts.TypeChecker) =>
        (options: IOptions) =>
        (collection: MetadataCollection) =>
        (type: ts.Type | null): Metadata => {
            const meta: Metadata = explore_metadata(checker)(options)(
                collection,
            )(type, false);
            iterate_metadata_collection(collection);
            iterate_metadata_sort(collection)(meta);
            return meta;
        };

    /**
     * @deprecated Use `analyze` function instead
     */
    export const generate = (
        checker: ts.TypeChecker,
        collection: MetadataCollection,
        type: ts.Type,
        options: IOptions,
    ) => analyze(checker)(options)(collection)(type);
}
