import { TomatoBase, TomatoBaseReturns, TomatoDecorators, TomatoEntitys, TomatoLoggers, TomatoUtils } from "tomato-contracts";

@TomatoDecorators.BaseDecorator("responsejson.base")
export default class ResponseJson extends TomatoBase.BaseModelClass {
    constructor(ctx: TomatoEntitys.Ctx) { super(ctx) }

    exec(): TomatoLoggers.SuccessEntity {
        const parsed = this.parse()
        if (!parsed.ok) {
            this.ctx.res.status(400).json(parsed)
            return TomatoLoggers.failLogger({
                ok: false,
                code:TomatoUtils.Codes.BASE_ERROR,
                details: {
                    error: parsed.details.error.message,
                    where: "ResponseJsonBaseParse"
                } as TomatoBaseReturns.Error
            })
        }
        this.logic()
        return TomatoLoggers.successLogger({
            ok:true,
            code:TomatoUtils.Codes.BASE_EXECUTED,
            details:{
             message:"ResponseJson executed",where:"ResponseJsonBaseLogic"   
            } as TomatoBaseReturns.Success
        })
    }
    logic(): void {
        this.ctx.res.status(200).json({
            message:this.ctx.route.params.message,
            date:new Date().toISOString()
        })
    }
    parse(): TomatoLoggers.SuccessEntity {
        const keys: TomatoUtils.Key[] = [
            { name: "message", type: "string" }
        ]
        return TomatoUtils.ValidatorKeys(keys, this.ctx.route.params, "ResponseJsonBase")
    }
}