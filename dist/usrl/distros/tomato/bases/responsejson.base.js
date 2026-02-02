var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { TomatoBase, TomatoDecorators, TomatoUtils } from "../../../../tomato-contracts.js";
let ResponseJson = class ResponseJson extends TomatoBase.BaseModelClass {
    ctx;
    constructor(ctx) {
        const keys = [
            { name: "message", type: "string" }
        ];
        super(ctx, "TomatoBaseResponseJson", keys);
        this.ctx = ctx;
    }
    exec() {
        this.logic();
    }
    logic() {
        const res = this.ctx.res;
        const users = [];
        for (let i = 0; i < 1000; i++) {
            users.push({ id: i, name: `User${i}`, active: i % 2 === 0 });
        }
        const body = JSON.stringify(users);
        res.setHeader("Content-Type", "application/json");
        res.setHeader("Content-Length", Buffer.byteLength(body));
        res.end(body);
    }
};
ResponseJson = __decorate([
    TomatoDecorators.BaseDecorator("responsejson.base"),
    __metadata("design:paramtypes", [Object])
], ResponseJson);
export default ResponseJson;
//# sourceMappingURL=responsejson.base.js.map