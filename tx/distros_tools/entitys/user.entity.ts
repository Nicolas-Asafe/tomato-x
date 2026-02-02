import type { routeEntity } from "../../boot/loader/route/route.entity.js";
import type { manifestEntity } from "../../boot/loader/manifest/manifest.entity.js";
import type { distroEntity } from "../../boot/loader/distros/distro.entity.js";
import type { Application } from "express";
import type { engineEntity } from "../../boot/loader/engine/engine.entity.js";

export interface userEntity {
    manifest:manifestEntity;
    projectPath:string;
    routes:routeEntity[];
    distros:distroEntity[];
    server:Application;
    global?:any;
    engine:engineEntity;
    render_directory:string
}