import type { routeEntity } from "../../boot/loader/route/route.entity.js";
import type { manifestEntity } from "../../boot/loader/manifest/manifest.entity.js";
import type { engineEntity } from "../../boot/loader/engine/engine.entity.js";
import http from "http"

export interface userEntity {
    manifest:manifestEntity;
    projectPath:string;
    routes:routeEntity[];
    server:http.Server;
    global?:any;
    engine:engineEntity;
    render_directory:string
}