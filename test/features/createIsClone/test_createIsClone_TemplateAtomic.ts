import typia from "typia";

import { TemplateAtomic } from "../../structures/TemplateAtomic";
import { _test_isClone } from "../internal/_test_isClone";

export const test_createIsClone_TemplateAtomic = _test_isClone(
    "TemplateAtomic",
    TemplateAtomic.generate,
    typia.createIsClone<TemplateAtomic>(),
    TemplateAtomic.SPOILERS,
);