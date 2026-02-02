import type { key } from "../../../shared/validator_keys/key.entity.js";
import type { ctxEntity } from "../../../distros_tools/entitys/ctx.entity.js";
export interface baseEntity {
    __name: string;
    distro: string;
    location: string;
    ctx: ctxEntity;
    keys: key[];
    exec(): void;
    parse(params: any): void;
    logic(): void;
    setCtx(ctx: ctxEntity): Function;
}
//# sourceMappingURL=base.entity.d.ts.map