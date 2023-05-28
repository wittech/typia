import ts from "typescript";

import { ExpressionFactory } from "../factories/ExpressionFactory";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { MetadataCollection } from "../factories/MetadataCollection";
import { MetadataFactory } from "../factories/MetadataFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { ValueFactory } from "../factories/ValueFactory";

import { IMetadataTag } from "../metadata/IMetadataTag";
import { Metadata } from "../metadata/Metadata";
import { MetadataObject } from "../metadata/MetadataObject";

import { IProject } from "../transformers/IProject";

import { FeatureProgrammer } from "./FeatureProgrammer";
import { AtomicPredicator } from "./helpers/AtomicPredicator";
import { FunctionImporter } from "./helpers/FunctionImporeter";
import { ICheckEntry } from "./helpers/ICheckEntry";
import { IExpressionEntry } from "./helpers/IExpressionEntry";
import { OptionPredicator } from "./helpers/OptionPredicator";
import { UnionExplorer } from "./helpers/UnionExplorer";
import { check_array } from "./internal/check_array";
import { check_array_length } from "./internal/check_array_length";
import { check_bigint } from "./internal/check_bigint";
import { check_boolean } from "./internal/check_boolean";
import { check_decimal } from "./internal/check_decimal";
import { check_native } from "./internal/check_native";
import { check_number } from "./internal/check_number";
import { check_string } from "./internal/check_string";
import { check_template } from "./internal/check_template";
import { check_union_tuple } from "./internal/check_union_tuple";
import { decode_union_object } from "./internal/decode_union_object";

export namespace CheckerProgrammer {
    export interface IConfig {
        assignments: ts.Statement[]; //增加对象赋值的处理代码逻辑；用于字段值引用
        functors: string;
        unioners: string;
        path: boolean;
        trace: boolean;
        equals: boolean;
        numeric: boolean;
        addition?: () => ts.Statement[];
        decoder?: FeatureProgrammer.Decoder<Metadata, ts.Expression>;
        combiner: IConfig.Combiner;
        atomist: (
            explore: IExplore,
        ) => (check: ICheckEntry) => (input: ts.Expression) => ts.Expression;
        joiner: IConfig.IJoiner;
        success: ts.Expression;
    }
    export namespace IConfig {
        export interface Combiner {
            (explorer: IExplore): {
                (logic: "and" | "or"): {
                    (
                        input: ts.Expression,
                        binaries: IBinary[],
                        expected: string,
                    ): ts.Expression;
                };
            };
        }
        export interface IJoiner {
            object(
                input: ts.Expression,
                entries: IExpressionEntry[],
            ): ts.Expression;
            array(input: ts.Expression, arrow: ts.ArrowFunction): ts.Expression;
            tuple?(exprs: ts.Expression[]): ts.Expression;

            failure(
                value: ts.Expression,
                expected: string,
                explore?: FeatureProgrammer.IExplore,
            ): ts.Expression;
            is?(expression: ts.Expression): ts.Expression;
            required?(exp: ts.Expression): ts.Expression;
            full?: (
                condition: ts.Expression,
            ) => (
                input: ts.Expression,
                expected: string,
                explore: IExplore,
            ) => ts.Expression;
        }
    }
    export type IExplore = FeatureProgrammer.IExplore;

    export interface IBinary {
        expression: ts.Expression;
        combined: boolean;
    }

    /* -----------------------------------------------------------
        WRITERS
    ----------------------------------------------------------- */
    export const write =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
            FeatureProgrammer.analyze(project)(
                configure(project)(config)(importer),
            )(importer);

    export const write_functors =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
            FeatureProgrammer.write_functors(
                configure(project)(config)(importer),
            )(importer);

    export const write_unioners = (
        project: IProject,
        config: IConfig,
        importer: FunctionImporter,
    ) =>
        FeatureProgrammer.write_unioners(
            configure(project)({ ...config, numeric: false })(importer),
        )(importer);

    const configure =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter): FeatureProgrammer.IConfig => {
            const output: FeatureProgrammer.IConfig = {
                types: {
                    input: () => TypeFactory.keyword("any"),
                    output: (type, name) =>
                        ts.factory.createTypePredicateNode(
                            undefined,
                            "input",
                            ts.factory.createTypeReferenceNode(
                                name ??
                                    TypeFactory.getFullName(project.checker)(
                                        type,
                                    ),
                            ),
                        ),
                },
                trace: config.trace,
                path: config.path,
                functors: config.functors,
                unioners: config.unioners,
                assignments: config.assignments,
                initializer:
                    ({ checker }) =>
                    (type) => {
                        const collection: MetadataCollection =
                            new MetadataCollection();
                        const meta: Metadata = MetadataFactory.analyze(checker)(
                            {
                                resolve: false,
                                constant: true,
                            },
                        )(collection)(type);
                        return [collection, meta];
                    },
                addition: config.addition,
                decoder: config.decoder ?? decode(project)(config)(importer),
                objector: {
                    checker:
                        config.decoder ?? decode(project)(config)(importer),
                    decoder: decode_object(config)(importer),
                    joiner: config.joiner.object,
                    unionizer: config.equals
                        ? decode_union_object(decode_object(config)(importer))(
                              (input, obj, explore) =>
                                  decode_object(config)(importer)(input, obj, {
                                      ...explore,
                                      tracable: true,
                                  }),
                          )(config.joiner.is ?? ((expr) => expr))(
                              (value, expected) =>
                                  ts.factory.createReturnStatement(
                                      config.joiner.failure(value, expected),
                                  ),
                          )
                        : (input, targets, explore) =>
                              config.combiner(explore)("or")(
                                  input,
                                  targets.map((obj) => ({
                                      expression: decode_object(config)(
                                          importer,
                                      )(input, obj, explore),
                                      combined: true,
                                  })),
                                  `(${targets.map((t) => t.name).join(" | ")})`,
                              ),
                    failure: (value, expected) =>
                        ts.factory.createReturnStatement(
                            config.joiner.failure(value, expected),
                        ),
                    is: config.joiner.is,
                    required: config.joiner.required,
                    full: config.joiner.full,
                    type: TypeFactory.keyword("boolean"),
                },
            };
            if (config.numeric === true)
                output.generator = {
                    unioners: FeatureProgrammer.write_unioners(
                        configure(project)({ ...config, numeric: false })(
                            importer,
                        ),
                    )(importer),
                };
            return output;
        };

    /* -----------------------------------------------------------
        DECODERS
    ----------------------------------------------------------- */
    /**
     * @internal
     */
    export const decode =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            meta: Metadata,
            explore: IExplore,
            metaTags: IMetadataTag[],
            jsDocTags: ts.JSDocTagInfo[],
        ): ts.Expression => {
            if (meta.any) return config.success;

            const top: IBinary[] = [];
            const binaries: IBinary[] = [];
            const add = create_add(binaries)(input);
            const getConstantValue = (
                value: number | string | bigint | boolean,
            ) =>
                typeof value === "string"
                    ? ts.factory.createStringLiteral(value)
                    : ts.factory.createIdentifier(value.toString());

            //----
            // CHECK OPTIONAL
            //----
            // @todo -> should be elaborated
            const checkOptional: boolean = meta.empty() || meta.isUnionBucket();

            // NULLABLE
            if (
                checkOptional ||
                meta.nullable
                // || (meta.objects.length && meta.size() !== meta.objects.length)
            )
                (meta.nullable ? add : create_add(top)(input))(
                    meta.nullable,
                    ValueFactory.NULL(),
                );

            // UNDEFINDABLE
            if (checkOptional || !meta.required)
                (meta.required ? create_add(top)(input) : add)(
                    !meta.required,
                    ValueFactory.UNDEFINED(),
                );

            // FUNCTIONAL
            if (meta.functional === true)
                if (
                    OptionPredicator.functional(project.options) ||
                    meta.size() !== 1
                )
                    add(
                        true,
                        ts.factory.createStringLiteral("function"),
                        ValueFactory.TYPEOF(input),
                    );
                else
                    binaries.push({
                        combined: false,
                        expression: config.success,
                    });

            //----
            // VALUES
            //----
            // CONSTANT VALUES
            for (const constant of meta.constants)
                if (AtomicPredicator.constant(meta)(constant.type))
                    for (const val of constant.values)
                        add(true, getConstantValue(val));

            // ATOMIC VALUES
            for (const type of meta.atomics) {
                if (AtomicPredicator.atomic(meta)(type) === false) continue;
                else if (type === "number")
                    binaries.push({
                        expression: config.atomist(explore)(
                            check_number(project, config.numeric)(importer)(
                                metaTags,
                            )(jsDocTags)(input),
                        )(input),
                        combined: false,
                    });
                else if (type === "bigint")
                    binaries.push({
                        expression: config.atomist(explore)(
                            check_bigint(importer)(metaTags)(jsDocTags)(input),
                        )(input),
                        combined: false,
                    });
                else if (type === "string")
                    binaries.push({
                        expression: config.atomist(explore)(
                            check_string(importer)(metaTags)(jsDocTags)(input),
                        )(input),
                        combined: false,
                    });
                else if (type === "boolean")
                    binaries.push({
                        expression: check_boolean(explore)(importer)(input),
                        combined: false,
                    });
                else
                    add(
                        true,
                        ts.factory.createStringLiteral(type),
                        ValueFactory.TYPEOF(input),
                    );
                //处理metaTags中包括值的处理逻辑；@data引用别的属性的值；
                for (const tag of metaTags) {
                    if (tag.kind === "data") {
                        //如果当前属性的值是引用于别的属性，要判断是否存在.，如果没有点说明就直接赋值即可；如果有点说明是某个对象中的值，需要额外进行处理；
                        //const props = tag.value.split(".");
                        // for (const prop of props) {
                        // }
                        //参考：https://github.com/meriyah/meriyah/wiki/ESTree-Node-Types-Table
                        const assignment = ts.factory.createExpressionStatement(
                            ts.factory.createAssignment(
                                input,
                                ts.factory.createIdentifier(
                                    `input.${tag.value}`,
                                ),
                            ),
                        );
                        config.assignments.push(assignment);
                    }
                }
            }

            // TEMPLATE LITERAL VALUES
            if (meta.templates.length)
                if (AtomicPredicator.template(meta))
                    binaries.push({
                        expression: config.atomist(explore)(
                            check_template(importer)(metaTags)(jsDocTags)(
                                meta.templates,
                            )(input),
                        )(input),
                        combined: false,
                    });

            // NATIVE CLASSES
            for (const native of meta.natives)
                binaries.push({
                    expression: check_native(explore)(importer)(native)(input),
                    combined: false,
                });

            //----
            // INSTANCES
            //----
            interface IInstance {
                pre: ts.Expression;
                body: ts.Expression | null;
                expected: string;
            }
            const instances: IInstance[] = [];
            const prepare =
                (pre: ts.Expression, expected: string) =>
                (body: ts.Expression | null) =>
                    instances.push({
                        pre,
                        expected,
                        body,
                    });

            // SETS
            if (meta.sets.length) {
                const install = prepare(
                    check_native(explore)(importer)("Set")(input),
                    meta.sets
                        .map((elem) => `Set<${elem.getName()}>`)
                        .join(" | "),
                );
                if (meta.sets.some((elem) => elem.any)) install(null);
                else
                    install(
                        explore_sets(project)(config)(importer)(
                            input,
                            meta.sets,
                            {
                                ...explore,
                                from: "array",
                            },
                            [],
                            [],
                        ),
                    );
            }

            // MAPS
            if (meta.maps.length) {
                const install = prepare(
                    check_native(explore)(importer)("Map")(input),
                    meta.maps
                        .map(({ key, value }) => `Map<${key}, ${value}>`)
                        .join(" | "),
                );
                if (meta.maps.some((elem) => elem.key.any && elem.value.any))
                    install(null);
                else
                    install(
                        explore_maps(project)(config)(importer)(
                            input,
                            meta.maps.map((m) => [m.key, m.value]),
                            {
                                ...explore,
                                from: "array",
                            },
                            [],
                            [],
                        ),
                    );
            }

            // ARRAYS AND TUPLES
            if (meta.tuples.length + meta.arrays.length > 0) {
                const install = prepare(
                    config.atomist(explore)(
                        check_array(importer)(
                            meta.tuples.length === 0 ? metaTags : [],
                        )(jsDocTags)(input),
                    )(input),
                    [...meta.tuples, ...meta.arrays]
                        .map((elem) =>
                            Array.isArray(elem)
                                ? `[${elem
                                      .map((elem) => elem.getName())
                                      .join(", ")}]`
                                : `Array<${elem.getName()}>`,
                        )
                        .join(" | "),
                );
                if (meta.arrays.length === 0)
                    install(
                        explore_tuples(project)(config)(importer)(
                            input,
                            meta.tuples,
                            {
                                ...explore,
                                from: "array",
                            },
                            metaTags,
                            jsDocTags,
                        ),
                    );
                else if (meta.arrays.some((elem) => elem.any)) install(null);
                else if (meta.tuples.length === 0)
                    // ARRAY ONLY
                    install(
                        explore_arrays(project, config, importer)(
                            input,
                            meta.arrays,
                            {
                                ...explore,
                                from: "array",
                            },
                            metaTags,
                            jsDocTags,
                        ),
                    );
                else
                    install(
                        explore_arrays_and_tuples(project, config, importer)(
                            input,
                            [...meta.tuples, ...meta.arrays],
                            explore,
                            metaTags,
                            jsDocTags,
                        ),
                    );
            }

            // OBJECT
            if (meta.objects.length > 0) {
                //判断是否是Decimal类型；
                const metaObj = meta.objects[0];
                if (metaObj?.name === "Decimal") {
                    //对decimal做特殊处理；
                    binaries.push({
                        expression: check_decimal(explore)(importer)(input),
                        combined: false,
                    });
                } else {
                    prepare(
                        ExpressionFactory.isObject({
                            checkNull: true,
                            checkArray: meta.objects.some((obj) =>
                                obj.properties.every(
                                    (prop) =>
                                        !prop.key.isSoleLiteral() ||
                                        !prop.value.required,
                                ),
                            ),
                        })(input),
                        meta.objects.map((obj) => obj.name).join(" | "),
                    )(
                        explore_objects(config)(importer)(input, meta, {
                            ...explore,
                            from: "object",
                        }),
                    );
                }
            }

            if (instances.length) {
                const transformer =
                    (
                        merger: (
                            x: ts.Expression,
                            y: ts.Expression,
                        ) => ts.Expression,
                    ) =>
                    (ins: IInstance) =>
                        ins.body
                            ? {
                                  expression: merger(ins.pre, ins.body),
                                  combined: true,
                              }
                            : {
                                  expression: ins.pre,
                                  combined: false,
                              };
                if (instances.length === 1)
                    binaries.push(
                        transformer((pre, body) =>
                            config.combiner(explore)("and")(
                                input,
                                [pre, body].map((expression) => ({
                                    expression,
                                    combined: expression !== pre,
                                })),
                                meta.getName(),
                            ),
                        )(instances[0]!),
                    );
                else
                    binaries.push({
                        expression: config.combiner(explore)("or")(
                            input,
                            instances.map(
                                transformer(ts.factory.createLogicalAnd),
                            ),
                            meta.getName(),
                        ),
                        combined: true,
                    });
            }

            //----
            // COMBINE CONDITIONS
            //----
            return top.length && binaries.length
                ? config.combiner(explore)("and")(
                      input,
                      [
                          ...top,
                          {
                              expression: config.combiner(explore)("or")(
                                  input,
                                  binaries,
                                  meta.getName(),
                              ),
                              combined: true,
                          },
                      ],
                      meta.getName(),
                  )
                : binaries.length
                ? config.combiner(explore)("or")(
                      input,
                      binaries,
                      meta.getName(),
                  )
                : config.success;
        };

    export const decode_tuple =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (checkLength: boolean) =>
        (
            input: ts.Expression,
            tuple: Array<Metadata>,
            explore: IExplore,
            tagList: IMetadataTag[],
            jsDocTags: ts.JSDocTagInfo[],
        ): ts.Expression => {
            const binaries: ts.Expression[] = tuple
                .filter((meta) => meta.rest === null)
                .map((meta, index) =>
                    decode(project)(config)(importer)(
                        ts.factory.createElementAccessExpression(input, index),
                        meta,
                        {
                            ...explore,
                            from: "array",
                            postfix: explore.postfix.length
                                ? `${explore.postfix.slice(0, -1)}[${index}]"`
                                : `[${index}]`,
                        },
                        tagList,
                        jsDocTags,
                    ),
                );
            const rest: ts.Expression | null =
                tuple.length && tuple[tuple.length - 1]!.rest !== null
                    ? decode(project)(config)(importer)(
                          ts.factory.createCallExpression(
                              IdentifierFactory.access(input)("slice"),
                              undefined,
                              [
                                  ts.factory.createNumericLiteral(
                                      tuple.length - 1,
                                  ),
                              ],
                          ),
                          (() => {
                              const wrapper: Metadata = Metadata.initialize();
                              wrapper.arrays.push(
                                  tuple[tuple.length - 1]!.rest!,
                              );
                              return wrapper;
                          })(),
                          {
                              ...explore,
                              start: tuple.length - 1,
                          },
                          tagList,
                          jsDocTags,
                      )
                    : null;

            const arrayLength = ts.factory.createPropertyAccessExpression(
                input,
                "length",
            );
            return config.combiner(explore)("and")(
                input,
                [
                    ...(checkLength && rest === null
                        ? tuple.every((t) => t.optional === false)
                            ? [
                                  {
                                      combined: false,
                                      expression:
                                          ts.factory.createStrictEquality(
                                              arrayLength,
                                              ts.factory.createNumericLiteral(
                                                  tuple.length,
                                              ),
                                          ),
                                  },
                              ]
                            : [
                                  {
                                      combined: false,
                                      expression: ts.factory.createLogicalAnd(
                                          ts.factory.createLessThanEquals(
                                              ts.factory.createNumericLiteral(
                                                  tuple.filter(
                                                      (t) =>
                                                          t.optional === false,
                                                  ).length,
                                              ),
                                              arrayLength,
                                          ),
                                          ts.factory.createGreaterThanEquals(
                                              ts.factory.createNumericLiteral(
                                                  tuple.length,
                                              ),
                                              arrayLength,
                                          ),
                                      ),
                                  },
                              ]
                        : []),
                    ...(config.joiner.tuple
                        ? [
                              {
                                  expression: config.joiner.tuple(binaries),
                                  combined: true,
                              },
                          ]
                        : binaries.map((expression) => ({
                              expression,
                              combined: true,
                          }))),
                    ...(rest !== null
                        ? [
                              {
                                  expression: rest,
                                  combined: true,
                              },
                          ]
                        : []),
                ],
                `[${tuple.map((t) => t.getName()).join(", ")}]`,
            );
        };

    const decode_array =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
            FeatureProgrammer.decode_array({
                trace: config.trace,
                path: config.path,
                decoder: decode(project)(config)(importer),
            })(importer)(config.joiner.array);

    export const decode_object =
        (config: IConfig) => (importer: FunctionImporter) => {
            const func = FeatureProgrammer.decode_object(config)(importer);
            return (
                input: ts.Expression,
                obj: MetadataObject,
                explore: IExplore,
            ) => {
                obj.validated = true;
                return func(input, obj, explore);
            };
        };

    const explore_sets =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
            UnionExplorer.set({
                checker: decode(project)(config)(importer),
                decoder: decode_array(project)(config)(importer),
                empty: config.success,
                success: config.success,
                failure: (input, expected, explore) =>
                    ts.factory.createReturnStatement(
                        config.joiner.failure(input, expected, explore),
                    ),
            });

    const explore_maps =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
            UnionExplorer.map({
                checker: (input, entry, explore) => {
                    const func = decode(project)(config)(importer);
                    return ts.factory.createLogicalAnd(
                        func(
                            ts.factory.createElementAccessExpression(input, 0),
                            entry[0],
                            { ...explore, postfix: `${explore.postfix}[0]` },
                            [],
                            [],
                        ),
                        func(
                            ts.factory.createElementAccessExpression(input, 1),
                            entry[1],
                            { ...explore, postfix: `${explore.postfix}[1]` },
                            [],
                            [],
                        ),
                    );
                },
                decoder: (input, target, explore) =>
                    decode_array(project)(config)(importer)(
                        input,
                        Metadata.create({
                            any: false,
                            nullable: false,
                            required: true,
                            optional: false,
                            functional: false,
                            resolved: null,
                            constants: [],
                            atomics: [],
                            templates: [],
                            rest: null,
                            arrays: [],
                            tuples: [target],
                            objects: [],
                            natives: [],
                            sets: [],
                            maps: [],
                        }),
                        explore,
                        [],
                        [],
                    ),
                empty: config.success,
                success: config.success,
                failure: (input, expected, explore) =>
                    ts.factory.createReturnStatement(
                        config.joiner.failure(input, expected, explore),
                    ),
            });

    const explore_tuples =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
            UnionExplorer.tuple({
                checker: check_union_tuple(project)(config)(importer),
                decoder: decode_tuple(project)(config)(importer)(true),
                empty: config.success,
                success: config.success,
                failure: (input, expected, explore) =>
                    ts.factory.createReturnStatement(
                        config.joiner.failure(input, expected, explore),
                    ),
            });

    const explore_arrays = (
        project: IProject,
        config: IConfig,
        importer: FunctionImporter,
    ) =>
        UnionExplorer.array({
            checker: decode(project)(config)(importer),
            decoder: decode_array(project)(config)(importer),
            empty: config.success,
            success: config.success,
            failure: (input, expected, explore) =>
                ts.factory.createReturnStatement(
                    config.joiner.failure(input, expected, explore),
                ),
        });

    const explore_arrays_and_tuples = (
        project: IProject,
        config: IConfig,
        importer: FunctionImporter,
    ) =>
        UnionExplorer.array_or_tuple({
            checker: (front, target, explore, tags, jsDocTags, array) =>
                Array.isArray(target)
                    ? check_union_tuple(project)(config)(importer)(
                          front,
                          target,
                          explore,
                          tags,
                          jsDocTags,
                          array,
                      )
                    : config.atomist(explore)({
                          expression: decode(project)(config)(importer)(
                              front,
                              target,
                              explore,
                              tags,
                              jsDocTags,
                          ),
                          tags: check_array_length(tags)(array),
                      })(array),
            decoder: (input, target, explore, tags, jsDocTags) =>
                Array.isArray(target)
                    ? decode_tuple(project)(config)(importer)(true)(
                          input,
                          target,
                          explore,
                          tags,
                          jsDocTags,
                      )
                    : decode_array(project)(config)(importer)(
                          input,
                          target,
                          explore,
                          tags,
                          jsDocTags,
                      ),
            empty: config.success,
            success: config.success,
            failure: (input, expected, explore) =>
                ts.factory.createReturnStatement(
                    config.joiner.failure(input, expected, explore),
                ),
        });

    const explore_objects =
        (config: IConfig) => (importer: FunctionImporter) => {
            const objector = decode_object(config)(importer);

            return (
                input: ts.Expression,
                meta: Metadata,
                explore: IExplore,
            ) => {
                if (meta.objects.length === 1)
                    return objector(input, meta.objects[0]!, explore);

                return ts.factory.createCallExpression(
                    ts.factory.createIdentifier(
                        importer.useLocal(
                            `${config.unioners}${meta.union_index!}`,
                        ),
                    ),
                    undefined,
                    FeatureProgrammer.get_object_arguments(config)(explore)(
                        input,
                    ),
                );
            };
        };
}

const create_add =
    (binaries: CheckerProgrammer.IBinary[]) =>
    (defaultInput: ts.Expression) =>
    (
        exact: boolean,
        left: ts.Expression,
        right: ts.Expression = defaultInput,
    ) => {
        const factory = exact
            ? ts.factory.createStrictEquality
            : ts.factory.createStrictInequality;
        binaries.push({
            expression: factory(left, right),
            combined: false,
        });
    };
