import type * as Express from "express";
import type { manifestEntity} from "../../boot/loader/manifest/manifest.entity.js";
import type { routeEntity } from "../../boot/loader/route/route.entity.js";
export interface ctxEntity {
    req: Express.Request;
    res: Express.Response;
    manifest: manifestEntity;
    route:routeEntity;
}