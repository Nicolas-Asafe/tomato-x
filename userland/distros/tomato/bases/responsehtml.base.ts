import { ctxEntity } from "../../../../core/boot/distros_tools/entitys/ctx.entity";
import { Base } from "../../../../core/boot/distros_tools/interfaces/baseClass.interface";
import { log } from "../../../../core/shared/loggers/log.logger";

export default class ResponseHtmlBase implements Base {
    public ctx: ctxEntity;
    constructor(ctx: ctxEntity) {
        this.ctx = ctx;
    }
    exec(): void {
        console.log("ResponseHtmlBase exec");
    }
    logic(): log {
        console.log("ResponseHtmlBase logic");
        return {} as log;
    }
    parse(): log {
        console.log("ResponseHtmlBase parse");
        return {} as log;
    }
}