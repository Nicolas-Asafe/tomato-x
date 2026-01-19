import { ctxEntity } from "../../../../core/boot/distros_tools/entitys/ctx.entity";
import { Base } from "../../../../core/boot/distros_tools/interfaces/baseClass.interface";
import { log } from "../../../../core/shared/loggers/log.logger";

export default class ResponseHtmlBase implements Base {
    constructor(ctx: ctxEntity) {}
    exec(ctx: ctxEntity): void {
        console.log("ResponseHtmlBase exec");
    }
    logic(ctx: ctxEntity): log {
        console.log("ResponseHtmlBase logic");
        return {} as log;
    }
    parse(ctx: ctxEntity): log {
        console.log("ResponseHtmlBase parse");
        return {} as log;
    }
}