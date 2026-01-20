import { successEntity } from "../../../shared/loggers/success/success.entity"
import { ctxEntity } from "../entitys/ctx.entity"

export class BaseModel{
    public exec():successEntity{return {} as successEntity}
    protected logic(){}
    protected parse():successEntity{return {} as successEntity}
    protected ctx:ctxEntity
    constructor(ctx:ctxEntity){this.ctx = ctx}
    public setCtx(newCtx:ctxEntity){
        this.ctx = newCtx
    }
}