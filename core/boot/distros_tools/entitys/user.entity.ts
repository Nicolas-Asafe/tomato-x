import { routeEntity } from "core/boot/loader/route/route.entity";
import { manifestEntity } from "../../loader/manifest/manifest.entity";
import { distroEntity } from "core/boot/loader/distros/distro.entity";
import { Application } from "express";

export interface userEntity {
    manifest:manifestEntity;
    projectPath:string;
    routes:routeEntity[];
    distros:distroEntity[];
    server:Application
}