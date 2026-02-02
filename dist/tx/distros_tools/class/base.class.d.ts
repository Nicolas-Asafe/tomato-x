import type { ctxEntity } from "../entitys/ctx.entity.js";
import { TomatoUtils } from "../../../tomato-contracts.js";
export declare class BaseModel {
    exec(): void;
    keys: readonly TomatoUtils.Key[];
    where: string;
    protected logic(): void;
    protected parse(params: any): true;
    ctx: ctxEntity;
    constructor(ctx: ctxEntity, where: string, keys: readonly TomatoUtils.Key[]);
    setCtx(newCtx: ctxEntity): void;
}
//# sourceMappingURL=base.class.d.ts.map