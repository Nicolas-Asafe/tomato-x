import { log } from "../../../shared/loggers/log.logger";
import { ctxEntity } from "../entitys/ctx.entity";

export interface Base {
    exec(ctx: ctxEntity): log | void;
    parse(ctx: ctxEntity): log;
    logic(ctx: ctxEntity): log;
}