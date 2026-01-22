import { TomatoBase, TomatoBaseReturns, TomatoDecorators, TomatoEntitys, TomatoLoggers, TomatoUtils } from "tomato-contracts";

@TomatoDecorators.BaseDecorator("responsejson.base")
export default class ResponseJson extends TomatoBase.BaseModelClass {
    constructor(ctx: TomatoEntitys.Ctx) {
        super(ctx, "TomatoBaseResponseJson", [{ name: "message", type: "string" }] as TomatoUtils.Key[])
    }
    exec(): TomatoLoggers.SuccessEntity {
        this.logic()
        return TomatoLoggers.successLogger({
            ok: true,
            code: TomatoUtils.Codes.BASE_EXECUTED,
            details: {
                message: "ResponseJson executed", where: "ResponseJsonBaseLogic"
            } as TomatoBaseReturns.Success
        })
    }
    logic(): void {
        this.ctx.res.status(200).json({
            message: this.ctx.route.params.message,
            date: new Date().toISOString()
        })
    }
}