import type { manifestEntity} from "../../boot/loader/manifest/manifest.entity.js";
import type { routeEntity } from "../../boot/loader/route/route.entity.js";
import http from "http"
export interface ctxEntity {
    req: http.IncomingMessage;
    res: http.ServerResponse;
    manifest: manifestEntity;
    route:routeEntity;
}