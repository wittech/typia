import { Atomic } from "../typings/Atomic";

import { IMetadataConstant } from "./IMetadataConstant";
import { IMetadataEntry } from "./IMetadataEntry";

export interface IMetadata {
    any: boolean;
    required: boolean;
    optional: boolean;
    nullable: boolean;
    functional: boolean;

    atomics: Atomic.Literal[];
    constants: IMetadataConstant[];
    templates: IMetadata[][];
    resolved: IMetadata | null;

    rest: IMetadata | null;
    arrays: string[];
    tuples: string[];
    objects: string[];
    aliases: string[];

    natives: string[];
    sets: IMetadata[];
    maps: IMetadataEntry[];
}
