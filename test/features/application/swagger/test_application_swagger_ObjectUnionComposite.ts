import TSON from "../../../../src";
import { ObjectUnionComposite } from "../../../structures/ObjectUnionComposite";
import { _test_application } from "../../internal/_test_application";

export const test_application_swagger_ObjectUnionComposite = 
    _test_application("swagger")(
        "ObjectUnionComposite",
        TSON.application<[ObjectUnionComposite], "swagger">(),{schemas: [
        {
            type: "array",
            items: {
                oneOf: [
                    {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint"
                    },
                    {
                        $ref: "#/components/schemas/ObjectUnionComposite.ILine"
                    },
                    {
                        $ref: "#/components/schemas/ObjectUnionComposite.ITriangle"
                    },
                    {
                        $ref: "#/components/schemas/ObjectUnionComposite.IRectangle"
                    },
                    {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPolyline"
                    },
                    {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPolygon"
                    },
                    {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPointedShape"
                    },
                    {
                        $ref: "#/components/schemas/ObjectUnionComposite.ICircle"
                    }
                ]
            },
            nullable: false
        }
    ],
    components: {
        schemas: {
            "ObjectUnionComposite.IPoint": {
                type: "object",
                properties: {
                    x: {
                        type: "number",
                        nullable: false,
                        "x-typia-required": true
                    },
                    y: {
                        type: "number",
                        nullable: false,
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "x",
                    "y"
                ],
                "x-typia_jsDocTags": []
            },
            "ObjectUnionComposite.ILine": {
                type: "object",
                properties: {
                    p1: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    },
                    p2: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "p1",
                    "p2"
                ],
                "x-typia_jsDocTags": []
            },
            "ObjectUnionComposite.ITriangle": {
                type: "object",
                properties: {
                    p1: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    },
                    p2: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    },
                    p3: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "p1",
                    "p2",
                    "p3"
                ],
                "x-typia_jsDocTags": []
            },
            "ObjectUnionComposite.IRectangle": {
                type: "object",
                properties: {
                    p1: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    },
                    p2: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    },
                    p3: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    },
                    p4: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "p1",
                    "p2",
                    "p3",
                    "p4"
                ],
                "x-typia_jsDocTags": []
            },
            "ObjectUnionComposite.IPolyline": {
                type: "object",
                properties: {
                    points: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                            "x-typia-required": true
                        },
                        nullable: false,
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "points"
                ],
                "x-typia_jsDocTags": []
            },
            "ObjectUnionComposite.IPolygon": {
                type: "object",
                properties: {
                    outer: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPolyline",
                        "x-typia-required": true
                    },
                    inner: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ObjectUnionComposite.IPolyline",
                            "x-typia-required": true
                        },
                        nullable: false,
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "outer",
                    "inner"
                ],
                "x-typia_jsDocTags": []
            },
            "ObjectUnionComposite.IPointedShape": {
                type: "object",
                properties: {
                    outer: {
                        type: "array",
                        items: {
                            $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                            "x-typia-required": true
                        },
                        nullable: false,
                        "x-typia-required": true
                    },
                    inner: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "outer",
                    "inner"
                ],
                "x-typia_jsDocTags": []
            },
            "ObjectUnionComposite.ICircle": {
                type: "object",
                properties: {
                    centroid: {
                        $ref: "#/components/schemas/ObjectUnionComposite.IPoint",
                        "x-typia-required": true
                    },
                    radius: {
                        type: "number",
                        nullable: false,
                        "x-typia-required": true
                    }
                },
                nullable: false,
                required: [
                    "centroid",
                    "radius"
                ],
                "x-typia_jsDocTags": []
            }
        }
    },
    purpose: "swagger",
    prefix: "#/components/schemas"
}
);