import { TomatoBase, TomatoDecorators, TomatoEntitys, TomatoUtils } from "../../../../tomato-contracts";

@TomatoDecorators.BaseDecorator("responsejson.base")
export default class ResponseJson extends TomatoBase.BaseModelClass {
    constructor(ctx: TomatoEntitys.Ctx) {
        const keys:TomatoUtils.Key[] = [
            { name: "message", type: "string" }
        ] 
        super(ctx, "TomatoBaseResponseJson", keys)
    }
    exec(): void {
        this.logic()
        console.log("Base responsejson executed")
    }
    logic(): void {
        this.ctx.res.status(200).json({
            message: this.ctx.route.params.message,
            date: new Date().toISOString()
        })
    }
}