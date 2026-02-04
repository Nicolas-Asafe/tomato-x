import { TomatoBase, TomatoDecorators, type TomatoEntitys, TomatoUtils } from "../../../../tomato-contracts.js";

@TomatoDecorators.BaseDecorator("responsejson.base")
export default class ResponseJson extends TomatoBase.BaseModelClass {
    constructor(ctx: TomatoEntitys.Ctx) {
        const keys: readonly TomatoUtils.Key[] = [
            { name: "message", type: "string" }
        ]
        super(ctx, "TomatoBaseResponseJson", keys)
    }
    exec(): void {
        this.logic()
    }
    logic(): void {
        const body = JSON.stringify({
            message: this.ctx.route.params.message,
            date: new Date().toISOString()
        });
        this.ctx.res.statusCode = 200;
        this.ctx.res.setHeader("Content-Type", "application/json");
        this.ctx.res.setHeader("Content-Length", Buffer.byteLength(body));
        this.ctx.res.end(body);
    }
}