import { ctxEntity } from "../entitys/ctx.entity"
import { TomatoUtils } from "../../../tomato-contracts"

export class BaseModel{
    public exec():void{}
    public keys:readonly TomatoUtils.Key[] = []
    public where:string
    protected logic(){}
    protected parse(params:any){
        return TomatoUtils.ValidatorKeys(this.keys, params, this.where)
    }
    public ctx:ctxEntity
    constructor(ctx:ctxEntity,where:string,keys:readonly TomatoUtils.Key[]){
        this.ctx = ctx
        this.where = where 
        this.keys = keys
    }
    public setCtx(newCtx:ctxEntity){
        this.ctx = newCtx
    }
}