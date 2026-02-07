import { TomatoBase, TomatoDecorators, type TomatoEntitys, TomatoUtils } from "../../../../tomato-contracts.js";
interface ResponseJsonBaseConfigs {
   messageToSend:string,
   statusCodeToSend:number,
}
@TomatoDecorators.BaseDecorator("responsejson.base")
export default class ResponseJson extends TomatoBase.BaseModelClass {
    constructor(ctx: TomatoEntitys.Ctx) {
        const keys: readonly TomatoUtils.Key[] = [
            { name: "messageToSend", type: "string" },
            { name: "statusCodeToSend", type: "number" }
        ]
        super(ctx, "TomatoBaseResponseJson", keys)
    }
    exec(): void {
        this.logic()
    }
    logic(): void {
        const base_config:ResponseJsonBaseConfigs = this.ctx.route.base_config
        const body = JSON.stringify({
            message: base_config.messageToSend,
            date: new Date().toISOString()
        });
        this.ctx.res.statusCode = base_config.statusCodeToSend;
        this.ctx.res.setHeader("Content-Type", "application/json");
        this.ctx.res.setHeader("Content-Length", Buffer.byteLength(body));
        this.ctx.res.end(body);
    }
}