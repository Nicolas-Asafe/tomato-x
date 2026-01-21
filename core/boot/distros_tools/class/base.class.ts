import { successEntity } from "../../../shared/loggers/success/success.entity"
import { ctxEntity } from "../entitys/ctx.entity"
import { TomatoUtils } from "tomato-contracts"

export class BaseModel{
    public exec():successEntity{return {} as successEntity}
    public keys:TomatoUtils.Key[] = []
    public where:string
    protected logic(){}
    protected parse():successEntity{
        return TomatoUtils.ValidatorKeys(this.keys, this.ctx.route.params, this.where)
    }
    public ctx:ctxEntity
    constructor(ctx:ctxEntity,where:string,keys:TomatoUtils.Key[]){
        this.ctx = ctx
        this.where = where 
        this.keys = keys
    }
    public setCtx(newCtx:ctxEntity){
        this.ctx = newCtx
    }
}