import { successEntity } from "../../../shared/loggers/success/success.entity";
import { ctxEntity } from "../../distros_tools/entitys/ctx.entity";

export interface baseEntity {
    __name: string;
    distro: string;
    location: string;
    ctx:ctxEntity;
    exec(): successEntity;
    parse():successEntity;
    logic():successEntity;
    setCtx(ctx:ctxEntity):Function
}