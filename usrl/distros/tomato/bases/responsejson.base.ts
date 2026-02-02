import { TomatoBase, TomatoDecorators, TomatoUtils } from "../../../../tomato-contracts.js";
import type { TomatoEntitys } from "../../../../tomato-contracts.js";

@TomatoDecorators.BaseDecorator("responsejson.base")
export default class ResponseJson extends TomatoBase.BaseModelClass {
    public ctx: TomatoEntitys.Ctx;
    constructor(ctx: TomatoEntitys.Ctx) {
        const keys:readonly TomatoUtils.Key[] = [
            { name: "message", type: "string" }
        ] 
        super(ctx, "TomatoBaseResponseJson", keys)
        this.ctx = ctx
    }
    exec(): void {
        this.logic()
    }
    logic(): void {
        this.ctx.res.status(200).json({
            message: this.ctx.route.params.message,
            date: new Date().toISOString()
        })
    }
}