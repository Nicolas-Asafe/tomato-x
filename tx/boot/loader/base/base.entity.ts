import { key } from "tx/shared/validator_keys/key.entity";
import { ctxEntity }  from "tx/distros_tools/entitys/ctx.entity";

export interface baseEntity {
    __name: string;
    distro: string;
    location: string;
    ctx:ctxEntity;
    keys:key[];
    exec():void;
    parse(params:any):void;
    logic():void;
    setCtx(ctx:ctxEntity):Function
}