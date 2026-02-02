import { TomatoUtils } from "../../../tomato-contracts.js";
export class BaseModel {
    exec() { }
    keys = [];
    where;
    logic() { }
    parse(params) {
        return TomatoUtils.ValidatorKeys(this.keys, params, this.where);
    }
    ctx;
    constructor(ctx, where, keys) {
        this.ctx = ctx;
        this.where = where;
        this.keys = keys;
    }
    setCtx(newCtx) {
        this.ctx = newCtx;
    }
}
//# sourceMappingURL=base.class.js.map