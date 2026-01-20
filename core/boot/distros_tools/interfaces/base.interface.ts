import { log } from "../../../shared/loggers/log.logger";
import { ctxEntity } from "../entitys/ctx.entity";

export interface IBase {
    ctx:ctxEntity;
    exec(): log | void;
    parse(): log;
    logic(): log;
}