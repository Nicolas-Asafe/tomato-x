import { key } from "core/shared/validator_keys/key.entity";
import { ctxEntity } from "../../distros_tools/entitys/ctx.entity";

export interface baseEntity {
    __name: string;
    distro: string;
    location: string;
    ctx:ctxEntity;
    keys:key[];
    exec():void;
    parse():void;
    logic():void;
    setCtx(ctx:ctxEntity):Function
}