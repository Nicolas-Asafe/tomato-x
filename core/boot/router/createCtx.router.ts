import { ctxEntity } from "../distros_tools/entitys/ctx.entity";
import { manifestEntity } from "../loader/manifest/manifest.entity";
import { routeEntity } from "../loader/route/route.entity";
import {Request,Response} from "express"

export function createCtx(req:Request,res:Response,manifest:manifestEntity,route:routeEntity){
    return {manifest,req,res,route} as ctxEntity
}