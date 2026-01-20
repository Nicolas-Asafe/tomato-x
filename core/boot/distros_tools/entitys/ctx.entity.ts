import * as Express from "express";
import { manifestEntity} from "../../loader/manifest/manifest.entity";
import { routeEntity } from "core/boot/loader/route/route.entity";
export interface ctxEntity {
    req: Express.Request;
    res: Express.Response;
    manifest: manifestEntity;
    route:routeEntity;
}