import ts from "typescript";

import { ExpressionFactory } from "../factories/ExpressionFactory";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { MetadataCollection } from "../factories/MetadataCollection";
import { MetadataFactory } from "../factories/MetadataFactory";
import { TypeFactory } from "../factories/TypeFactory";

import { Metadata } from "../metadata/Metadata";

import { IProject } from "../transformers/IProject";

import { FeatureProgrammer } from "./FeatureProgrammer";
import { IsProgrammer } from "./IsProgrammer";
import { CloneJoiner } from "./helpers/CloneJoiner";
import { FunctionImporter } from "./helpers/FunctionImporeter";
import { UnionExplorer } from "./helpers/UnionExplorer";
import { decode_union_object } from "./internal/decode_union_object";

export namespace CloneProgrammer {
    /**
     * @deprecated Use `write()` function instead
     */
    export const generate =
        (project: IProject, modulo: ts.LeftHandSideExpression) =>
        (type: ts.Type, name?: string) =>
            write(project)(modulo)(type, name);

    export const write =
        (project: IProject) => (modulo: ts.LeftHandSideExpression) => {
            const importer: FunctionImporter = new FunctionImporter();
            return FeatureProgrammer.analyze(project)({
                ...CONFIG(project, importer),
                addition: (collection) => {
                    const isFunctors =
                        IsProgrammer.write_functors(project)(importer)(
                            collection,
                        );
                    const isUnioners =
                        IsProgrammer.write_unioners(project)(importer)(
                            collection,
                        );

                    return [
                        ...importer.declare(modulo),
                        ...isFunctors.filter((_, i) =>
                            importer.hasLocal(`$io${i}`),
                        ),
                        ...isUnioners.filter((_, i) =>
                            importer.hasLocal(`$iu${i}`),
                        ),
                    ];
                },
            })(importer);
        };

    /* -----------------------------------------------------------
        DECODERS
    ----------------------------------------------------------- */
    const decode =
        (project: IProject, importer: FunctionImporter) =>
        (
            input: ts.Expression,
            meta: Metadata,
            explore: FeatureProgrammer.IExplore,
        ): ts.Expression => {
            // ANY TYPE
            if (
                meta.any ||
                meta.arrays.some((a) => a.any) ||
                meta.tuples.some((t) => t.every((e) => e.any))
            )
                return ts.factory.createCallExpression(
                    importer.use("any"),
                    undefined,
                    [input],
                );

            interface IUnion {
                type: string;
                is: () => ts.Expression;
                value: () => ts.Expression;
            }
            const unions: IUnion[] = [];

            //----
            // LIST UP UNION TYPES
            //----
            // toJSON() METHOD
            if (meta.resolved !== null)
                unions.push({
                    type: "resolved",
                    is: () => IsProgrammer.decode_to_json(true)(input),
                    value: () =>
                        decode_to_json(project, importer)(
                            input,
                            meta.resolved!,
                            explore,
                        ),
                });

            // TUPLES
            for (const tuple of meta.tuples)
                unions.push({
                    type: "tuple",
                    is: () =>
                        IsProgrammer.decode(project, importer)(
                            input,
                            (() => {
                                const partial = Metadata.initialize();
                                partial.tuples.push(tuple);
                                return partial;
                            })(),
                            explore,
                            [],
                            [],
                        ),
                    value: () =>
                        decode_tuple(project, importer)(input, tuple, explore),
                });

            // ARRAYS
            if (meta.arrays.length)
                unions.push({
                    type: "array",
                    is: () => ExpressionFactory.isArray(input),
                    value: () =>
                        explore_arrays(project, importer)(
                            input,
                            meta.arrays,
                            {
                                ...explore,
                                from: "array",
                            },
                            [],
                            [],
                        ),
                });

            // NATIVE TYPES
            if (meta.sets.length)
                unions.push({
                    type: "set",
                    is: () => ExpressionFactory.isInstanceOf("Set")(input),
                    value: () => ts.factory.createIdentifier("{}"),
                });
            if (meta.maps.length)
                unions.push({
                    type: "map",
                    is: () => ExpressionFactory.isInstanceOf("Map")(input),
                    value: () => ts.factory.createIdentifier("{}"),
                });
            for (const native of meta.natives)
                unions.push({
                    type: "native",
                    is: () => ExpressionFactory.isInstanceOf(native)(input),
                    value: () =>
                        native === "Boolean" ||
                        native === "Number" ||
                        native === "String"
                            ? ts.factory.createCallExpression(
                                  IdentifierFactory.access(input)("valueOf"),
                                  undefined,
                                  undefined,
                              )
                            : ts.factory.createIdentifier("{}"),
                });

            // OBJECTS
            if (meta.objects.length)
                unions.push({
                    type: "object",
                    is: () =>
                        ExpressionFactory.isObject({
                            checkNull: true,
                            checkArray: false,
                        })(input),
                    value: () =>
                        explore_objects(importer)(input, meta, {
                            ...explore,
                            from: "object",
                        }),
                });

            // COMPOSITION
            let last: ts.Expression = input;
            for (const u of unions.reverse())
                last = ts.factory.createConditionalExpression(
                    u.is(),
                    undefined,
                    u.value(),
                    undefined,
                    last,
                );
            return ts.factory.createAsExpression(
                last,
                TypeFactory.keyword("any"),
            );
        };

    const decode_to_json =
        (project: IProject, importer: FunctionImporter) =>
        (
            input: ts.Expression,
            resolved: Metadata,
            explore: FeatureProgrammer.IExplore,
        ): ts.Expression => {
            return decode(project, importer)(
                ts.factory.createCallExpression(
                    IdentifierFactory.access(input)("toJSON"),
                    undefined,
                    [],
                ),
                resolved,
                explore,
            );
        };

    const decode_tuple =
        (project: IProject, importer: FunctionImporter) =>
        (
            input: ts.Expression,
            tuple: Metadata[],
            explore: FeatureProgrammer.IExplore,
        ): ts.Expression => {
            const children: ts.Expression[] = tuple
                .filter((m) => m.rest === null)
                .map((elem, index) =>
                    decode(project, importer)(
                        ts.factory.createElementAccessExpression(input, index),
                        elem,
                        {
                            ...explore,
                            from: "array",
                        },
                    ),
                );
            const rest = (() => {
                if (tuple.length === 0) return null;

                const last: Metadata = tuple[tuple.length - 1]!;
                const rest: Metadata | null = last.rest;
                if (rest === null) return null;

                return decode(project, importer)(
                    ts.factory.createCallExpression(
                        IdentifierFactory.access(input)("slice"),
                        undefined,
                        [ts.factory.createNumericLiteral(tuple.length - 1)],
                    ),
                    (() => {
                        const wrapper: Metadata = Metadata.initialize();
                        wrapper.arrays.push(rest);
                        return wrapper;
                    })(),
                    {
                        ...explore,
                        start: tuple.length - 1,
                    },
                );
            })();
            return CloneJoiner.tuple(children, rest);
        };

    const decode_array = (project: IProject, importer: FunctionImporter) =>
        FeatureProgrammer.decode_array(CONFIG(project, importer))(importer)(
            CloneJoiner.array,
        );

    const decode_object = (importer: FunctionImporter) =>
        FeatureProgrammer.decode_object({
            trace: false,
            path: false,
            functors: FUNCTORS,
        })(importer);

    const explore_arrays = (project: IProject, importer: FunctionImporter) =>
        UnionExplorer.array({
            checker: IsProgrammer.decode(project, importer),
            decoder: decode_array(project, importer),
            empty: ts.factory.createReturnStatement(),
            success: ts.factory.createTrue(),
            failure: (input, expected) =>
                create_throw_error(importer, input, expected),
        });

    const explore_objects =
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            meta: Metadata,
            explore: FeatureProgrammer.IExplore,
        ) => {
            if (meta.objects.length === 1)
                return decode_object(importer)(
                    input,
                    meta.objects[0]!,
                    explore,
                );

            return ts.factory.createCallExpression(
                ts.factory.createIdentifier(`${UNIONERS}${meta.union_index!}`),
                undefined,
                [input],
            );
        };

    /* -----------------------------------------------------------
        CONFIGURATIONS
    ----------------------------------------------------------- */
    const FUNCTORS = "$co";
    const UNIONERS = "$cu";

    const CONFIG = (
        project: IProject,
        importer: FunctionImporter,
    ): FeatureProgrammer.IConfig => ({
        types: {
            input: (type, name) =>
                ts.factory.createTypeReferenceNode(
                    name ?? TypeFactory.getFullName(project.checker)(type),
                ),
            output: (type, name) =>
                ts.factory.createTypeReferenceNode(
                    `typia.Primitive<${
                        name ?? TypeFactory.getFullName(project.checker)(type)
                    }>`,
                ),
        },
        functors: FUNCTORS,
        unioners: UNIONERS,
        trace: false,
        path: false,
        initializer,
        decoder: decode(project, importer),
        objector: OBJECTOR(project, importer),
        assignments: [],
    });

    const OBJECTOR = (
        project: IProject,
        importer: FunctionImporter,
    ): FeatureProgrammer.IConfig.IObjector => ({
        checker: IsProgrammer.decode(project, importer),
        decoder: decode_object(importer),
        joiner: CloneJoiner.object,
        unionizer: decode_union_object(IsProgrammer.decode_object(importer))(
            decode_object(importer),
        )((exp) => exp)((value, expected) =>
            create_throw_error(importer, value, expected),
        ),
        failure: (input, expected) =>
            create_throw_error(importer, input, expected),
    });

    const initializer: FeatureProgrammer.IConfig["initializer"] =
        ({ checker }) =>
        (type) => {
            const collection = new MetadataCollection();
            const meta = MetadataFactory.analyze(checker)({
                resolve: true,
                constant: true,
            })(collection)(type);
            return [collection, meta];
        };

    const create_throw_error = (
        importer: FunctionImporter,
        value: ts.Expression,
        expected: string,
    ) =>
        ts.factory.createExpressionStatement(
            ts.factory.createCallExpression(
                importer.use("throws"),
                [],
                [
                    ts.factory.createObjectLiteralExpression(
                        [
                            ts.factory.createPropertyAssignment(
                                "expected",
                                ts.factory.createStringLiteral(expected),
                            ),
                            ts.factory.createPropertyAssignment("value", value),
                        ],
                        true,
                    ),
                ],
            ),
        );
}
