import ts from "typescript";

import { ExpressionFactory } from "../factories/ExpressionFactory";
import { IdentifierFactory } from "../factories/IdentifierFactory";
import { MetadataCollection } from "../factories/MetadataCollection";
import { MetadataFactory } from "../factories/MetadataFactory";
import { StatementFactory } from "../factories/StatementFactory";
import { TypeFactory } from "../factories/TypeFactory";
import { ValueFactory } from "../factories/ValueFactory";

import { IJsDocTagInfo } from "../metadata/IJsDocTagInfo";
import { IMetadataTag } from "../metadata/IMetadataTag";
import { Metadata } from "../metadata/Metadata";
import { MetadataArray } from "../metadata/MetadataArray";
import { MetadataObject } from "../metadata/MetadataObject";
import { MetadataTuple } from "../metadata/MetadataTuple";

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
import { decode_union_object } from "./internal/decode_union_object";
import { wrap_metadata_rest_tuple } from "./internal/wrap_metadata_rest_tuple";

export namespace CheckerProgrammer {
    export interface IConfig {
        prefix: string;
        path: boolean;
        trace: boolean;
        equals: boolean;
        numeric: boolean;
        addition?: () => ts.Statement[];
        decoder?: () => FeatureProgrammer.Decoder<Metadata, ts.Expression>;
        combiner: IConfig.Combiner;
        atomist: (
            explore: IExplore,
        ) => (check: ICheckEntry) => (input: ts.Expression) => ts.Expression;
        joiner: IConfig.IJoiner;
        success: ts.Expression;
        assignments: ts.Statement[]; //增加对象赋值的处理代码逻辑；用于字段值引用
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
            FeatureProgrammer.write(project)(
                configure(project)(config)(importer),
            )(importer);

    export const write_object_functions =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
            FeatureProgrammer.write_object_functions(
                configure(project)(config)(importer),
            )(importer);

    export const write_union_functions =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
            FeatureProgrammer.write_union_functions(
                configure(project)({ ...config, numeric: false })(importer),
            );

    export const write_array_functions =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (collection: MetadataCollection): ts.VariableStatement[] =>
            collection
                .arrays()
                .filter((a) => a.recursive)
                .map((array, i) =>
                    StatementFactory.constant(
                        `${config.prefix}a${i}`,
                        ts.factory.createArrowFunction(
                            undefined,
                            undefined,
                            FeatureProgrammer.parameterDeclarations(config)(
                                TypeFactory.keyword("any"),
                            )(ts.factory.createIdentifier("input")),
                            TypeFactory.keyword("any"),
                            undefined,
                            decode_array_inline(project)(config)(importer)(
                                ts.factory.createIdentifier("input"),
                                array,
                                {
                                    tracable: config.trace,
                                    source: "function",
                                    from: "array",
                                    postfix: "",
                                },
                                [],
                                [],
                            ),
                        ),
                    ),
                );

    export const write_tuple_functions =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (collection: MetadataCollection): ts.VariableStatement[] =>
            collection
                .tuples()
                .filter((t) => t.recursive)
                .map((tuple, i) =>
                    StatementFactory.constant(
                        `${config.prefix}t${i}`,
                        ts.factory.createArrowFunction(
                            undefined,
                            undefined,
                            FeatureProgrammer.parameterDeclarations(config)(
                                TypeFactory.keyword("any"),
                            )(ts.factory.createIdentifier("input")),
                            TypeFactory.keyword("any"),
                            undefined,
                            decode_tuple_inline(project)(config)(importer)(
                                ts.factory.createIdentifier("input"),
                                tuple,
                                {
                                    tracable: config.trace,
                                    source: "function",
                                    from: "array",
                                    postfix: "",
                                },
                                [],
                                [],
                            ),
                        ),
                    ),
                );

    const configure =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter): FeatureProgrammer.IConfig => ({
            types: {
                input: () => TypeFactory.keyword("any"),
                output: (type, name) =>
                    ts.factory.createTypePredicateNode(
                        undefined,
                        "input",
                        ts.factory.createTypeReferenceNode(
                            name ??
                                TypeFactory.getFullName(project.checker)(type),
                        ),
                    ),
            },
            trace: config.trace,
            path: config.path,
            prefix: config.prefix,
            initializer:
                ({ checker }) =>
                (type) => {
                    const collection: MetadataCollection =
                        new MetadataCollection();
                    const meta: Metadata = MetadataFactory.analyze(checker)({
                        resolve: false,
                        constant: true,
                        absorb: true,
                        validate: (meta) => {
                            if (
                                meta.arrays.length > 1 &&
                                meta.arrays.some((a) => a.recursive)
                            )
                                throw new Error(
                                    `Repeated union array types are not supported yet.`,
                                );
                        },
                    })(collection)(type);
                    return [collection, meta];
                },
            addition: config.addition,
            decoder: () =>
                config.decoder?.() ?? decode(project)(config)(importer),
            objector: {
                checker: () =>
                    config.decoder?.() ?? decode(project)(config)(importer),
                decoder: () => decode_object(config)(importer),
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
                                  expression: decode_object(config)(importer)(
                                      input,
                                      obj,
                                      explore,
                                  ),
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
            generator: {
                unions: config.numeric
                    ? () =>
                          FeatureProgrammer.write_union_functions(
                              configure(project)({ ...config, numeric: false })(
                                  importer,
                              ),
                          )
                    : undefined,
                arrays: () => write_array_functions(project)(config)(importer),
                tuples: () => write_tuple_functions(project)(config)(importer),
            },
            assignments: config.assignments,
        });

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
            if (checkOptional || meta.nullable)
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
            for (const native of meta.natives) {
                // 当属性定义为prisma类似的cretaed?: Date | string类型的时候，会先判断是否为string，下面的转化不会做；
                // 由于是在check_native内部判断是是否是Date类型并进行的值转化，所以暂时在这里做一个顺序调整，将判断时间的放到字符串前面去；
                if (
                    meta.atomics.length === 1 &&
                    meta.atomics[0] === "string" &&
                    native === "Date"
                ) {
                    //在string的判断前面插入
                    binaries.splice(binaries.length - 1, 0, {
                        expression:
                            check_native(explore)(importer)(native)(input),
                        combined: false,
                    });
                } else {
                    // 其它情况依然用push追加到后面去；
                    binaries.push({
                        expression:
                            check_native(explore)(importer)(native)(input),
                        combined: false,
                    });
                }
            }

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
                            meta.maps,
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
                        .map((elem) => elem.name)
                        .join(" | "),
                );
                if (meta.arrays.length === 0)
                    if (meta.tuples.length === 1)
                        install(
                            decode_tuple(project)(config)(importer)(
                                input,
                                meta.tuples[0]!,
                                {
                                    ...explore,
                                    from: "array",
                                },
                                metaTags,
                                jsDocTags,
                            ),
                        );
                    // TUPLE ONLY
                    else
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
                else if (meta.arrays.some((elem) => elem.value.any))
                    install(null);
                else if (meta.tuples.length === 0)
                    if (meta.arrays.length === 1)
                        // ARRAY ONLY
                        install(
                            decode_array(project)(config)(importer)(
                                input,
                                meta.arrays[0]!,
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
                            explore_arrays(project)(config)(importer)(
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
                        explore_arrays_and_tuples(project)(config)(importer)(
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

    const decode_array =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            array: MetadataArray,
            explore: IExplore,
            metaTags: IMetadataTag[],
            jsDocTags: IJsDocTagInfo[],
        ) => {
            if (array.recursive === false)
                return decode_array_inline(project)(config)(importer)(
                    input,
                    array,
                    explore,
                    metaTags,
                    jsDocTags,
                );

            explore = {
                ...explore,
                source: "function",
                from: "array",
            };
            return ts.factory.createLogicalOr(
                ts.factory.createCallExpression(
                    ts.factory.createIdentifier(
                        importer.useLocal(`${config.prefix}a${array.index}`),
                    ),
                    undefined,
                    FeatureProgrammer.argumentsArray(config)({
                        ...explore,
                        source: "function",
                        from: "array",
                    })(input),
                ),
                config.joiner.failure(input, array.name, explore),
            );
        };

    const decode_array_inline =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
            FeatureProgrammer.decode_array({
                prefix: config.prefix,
                trace: config.trace,
                path: config.path,
                decoder: () => decode(project)(config)(importer),
            })(importer)(config.joiner.array);

    const decode_tuple =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            tuple: MetadataTuple,
            explore: IExplore,
            tagList: IMetadataTag[],
            jsDocTags: ts.JSDocTagInfo[],
        ): ts.Expression => {
            if (tuple.recursive === false)
                return decode_tuple_inline(project)(config)(importer)(
                    input,
                    tuple,
                    explore,
                    tagList,
                    jsDocTags,
                );
            explore = {
                ...explore,
                source: "function",
                from: "array",
            };
            return ts.factory.createLogicalOr(
                ts.factory.createCallExpression(
                    ts.factory.createIdentifier(
                        importer.useLocal(`${config.prefix}t${tuple.index}`),
                    ),
                    undefined,
                    FeatureProgrammer.argumentsArray(config)({
                        ...explore,
                        source: "function",
                    })(input),
                ),
                config.joiner.failure(input, tuple.name, explore),
            );
        };

    const decode_tuple_inline =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            tuple: MetadataTuple,
            explore: IExplore,
            tagList: IMetadataTag[],
            jsDocTags: ts.JSDocTagInfo[],
        ): ts.Expression => {
            const binaries: ts.Expression[] = tuple.elements
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
                                : `"[${index}]"`,
                        },
                        tagList,
                        jsDocTags,
                    ),
                );
            const rest: ts.Expression | null =
                tuple.elements.length && tuple.elements.at(-1)!.rest !== null
                    ? decode(project)(config)(importer)(
                          ts.factory.createCallExpression(
                              IdentifierFactory.access(input)("slice"),
                              undefined,
                              [
                                  ts.factory.createNumericLiteral(
                                      tuple.elements.length - 1,
                                  ),
                              ],
                          ),
                          wrap_metadata_rest_tuple(
                              tuple.elements.at(-1)!.rest!,
                          ),
                          {
                              ...explore,
                              start: tuple.elements.length - 1,
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
                    ...(rest === null
                        ? tuple.elements.every((t) => t.optional === false)
                            ? [
                                  {
                                      combined: false,
                                      expression:
                                          ts.factory.createStrictEquality(
                                              arrayLength,
                                              ts.factory.createNumericLiteral(
                                                  tuple.elements.length,
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
                                                  tuple.elements.filter(
                                                      (t) =>
                                                          t.optional === false,
                                                  ).length,
                                              ),
                                              arrayLength,
                                          ),
                                          ts.factory.createGreaterThanEquals(
                                              ts.factory.createNumericLiteral(
                                                  tuple.elements.length,
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
                `[${tuple.elements.map((t) => t.getName()).join(", ")}]`,
            );
        };

    /* -----------------------------------------------------------
        UNION TYPE EXPLORERS
    ----------------------------------------------------------- */
    const explore_sets =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            sets: Metadata[],
            explore: IExplore,
            tags: IMetadataTag[],
            jsDocTags: IJsDocTagInfo[],
        ): ts.Expression =>
            ts.factory.createCallExpression(
                UnionExplorer.set({
                    checker: decode(project)(config)(importer),
                    decoder: decode_array(project)(config)(importer),
                    empty: config.success,
                    success: config.success,
                    failure: (input, expected, explore) =>
                        ts.factory.createReturnStatement(
                            config.joiner.failure(input, expected, explore),
                        ),
                })([])(input, sets, explore, tags, jsDocTags),
                undefined,
                undefined,
            );

    const explore_maps =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            maps: Metadata.Entry[],
            explore: IExplore,
            tags: IMetadataTag[],
            jsDocTags: IJsDocTagInfo[],
        ): ts.Expression =>
            ts.factory.createCallExpression(
                UnionExplorer.map({
                    checker: (input, entry, explore) => {
                        const func = decode(project)(config)(importer);
                        return ts.factory.createLogicalAnd(
                            func(
                                ts.factory.createElementAccessExpression(
                                    input,
                                    0,
                                ),
                                entry[0],
                                {
                                    ...explore,
                                    postfix: `${explore.postfix}[0]`,
                                },
                                [],
                                [],
                            ),
                            func(
                                ts.factory.createElementAccessExpression(
                                    input,
                                    1,
                                ),
                                entry[1],
                                {
                                    ...explore,
                                    postfix: `${explore.postfix}[1]`,
                                },
                                [],
                                [],
                            ),
                        );
                    },
                    decoder: decode_array(project)(config)(importer),
                    empty: config.success,
                    success: config.success,
                    failure: (input, expected, explore) =>
                        ts.factory.createReturnStatement(
                            config.joiner.failure(input, expected, explore),
                        ),
                })([])(input, maps, explore, tags, jsDocTags),
                undefined,
                undefined,
            );

    const explore_tuples =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            tuples: MetadataTuple[],
            explore: IExplore,
            tags: IMetadataTag[],
            jsDocTags: IJsDocTagInfo[],
        ): ts.Expression =>
            explore_array_like_union_types(config)(importer)(
                UnionExplorer.tuple({
                    checker: decode_tuple(project)(config)(importer),
                    decoder: decode_tuple(project)(config)(importer),
                    empty: config.success,
                    success: config.success,
                    failure: (input, expected, explore) =>
                        ts.factory.createReturnStatement(
                            config.joiner.failure(input, expected, explore),
                        ),
                }),
            )(input, tuples, explore, tags, jsDocTags);

    const explore_arrays =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            arrays: MetadataArray[],
            explore: IExplore,
            tags: IMetadataTag[],
            jsDocTags: IJsDocTagInfo[],
        ): ts.Expression =>
            explore_array_like_union_types(config)(importer)(
                UnionExplorer.array({
                    checker: decode(project)(config)(importer),
                    decoder: decode_array(project)(config)(importer),
                    empty: config.success,
                    success: config.success,
                    failure: (input, expected, explore) =>
                        ts.factory.createReturnStatement(
                            config.joiner.failure(input, expected, explore),
                        ),
                }),
            )(input, arrays, explore, tags, jsDocTags);

    const explore_arrays_and_tuples =
        (project: IProject) =>
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (
            input: ts.Expression,
            elements: Array<MetadataArray | MetadataTuple>,
            explore: IExplore,
            tags: IMetadataTag[],
            jsDocTags: IJsDocTagInfo[],
        ): ts.Expression =>
            explore_array_like_union_types(config)(importer)(
                UnionExplorer.array_or_tuple({
                    checker: (front, target, explore, tags, jsDocTags, array) =>
                        target instanceof MetadataTuple
                            ? decode_tuple(project)(config)(importer)(
                                  front,
                                  target,
                                  explore,
                                  tags,
                                  jsDocTags,
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
                        target instanceof MetadataTuple
                            ? decode_tuple(project)(config)(importer)(
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
                }),
            )(input, elements, explore, tags, jsDocTags);

    const explore_array_like_union_types =
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        <T extends MetadataArray | MetadataTuple>(
            factory: (
                parameters: ts.ParameterDeclaration[],
            ) => (
                input: ts.Expression,
                elements: T[],
                explore: IExplore,
                tags: IMetadataTag[],
                jsDocTags: IJsDocTagInfo[],
            ) => ts.ArrowFunction,
        ) =>
        (
            input: ts.Expression,
            elements: T[],
            explore: IExplore,
            tags: IMetadataTag[],
            jsDocTags: IJsDocTagInfo[],
        ): ts.Expression => {
            const arrow =
                (parameters: ts.ParameterDeclaration[]) =>
                (explore: IExplore) =>
                (input: ts.Expression): ts.ArrowFunction =>
                    factory(parameters)(
                        input,
                        elements,
                        explore,
                        tags,
                        jsDocTags,
                    );
            if (elements.every((e) => e.recursive === false))
                ts.factory.createCallExpression(
                    arrow([])(explore)(input),
                    undefined,
                    [],
                );
            explore = {
                ...explore,
                source: "function",
                from: "array",
            };
            return ts.factory.createLogicalOr(
                ts.factory.createCallExpression(
                    ts.factory.createIdentifier(
                        importer.emplaceUnion(
                            config.prefix,
                            elements.map((e) => e.name).join(" | "),
                            () =>
                                arrow(
                                    FeatureProgrammer.parameterDeclarations(
                                        config,
                                    )(TypeFactory.keyword("any"))(
                                        ts.factory.createIdentifier("input"),
                                    ),
                                )({
                                    ...explore,
                                    postfix: "",
                                })(ts.factory.createIdentifier("input")),
                        ),
                    ),
                    undefined,
                    FeatureProgrammer.argumentsArray(config)(explore)(input),
                ),
                config.joiner.failure(
                    input,
                    elements.map((e) => e.name).join(" | "),
                    explore,
                ),
            );
        };

    const explore_objects =
        (config: IConfig) =>
        (importer: FunctionImporter) =>
        (input: ts.Expression, meta: Metadata, explore: IExplore) =>
            meta.objects.length === 1
                ? decode_object(config)(importer)(
                      input,
                      meta.objects[0]!,
                      explore,
                  )
                : ts.factory.createCallExpression(
                      ts.factory.createIdentifier(
                          importer.useLocal(
                              `${config.prefix}u${meta.union_index!}`,
                          ),
                      ),
                      undefined,
                      FeatureProgrammer.argumentsArray(config)(explore)(input),
                  );
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
