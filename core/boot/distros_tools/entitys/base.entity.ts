import { ctxEntity } from "./ctx.entity";

export interface baseEntity {
    name: string;
    distro: string;
    location: string;
    exec(ctx:ctxEntity): void;
}