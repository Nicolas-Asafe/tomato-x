import { TomatoBase } from "../../../../tomato-contracts.js";
import type { TomatoEntitys } from "../../../../tomato-contracts.js";
export default class ResponseJson extends TomatoBase.BaseModelClass {
    ctx: TomatoEntitys.Ctx;
    constructor(ctx: TomatoEntitys.Ctx);
    exec(): void;
    logic(): void;
}
//# sourceMappingURL=responsejson.base.d.ts.map