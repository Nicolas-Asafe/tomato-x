import { loadRoute } from "tx/boot/loader/route/route.loader";
import { userEntity } from "tx/distros_tools/entitys/user.entity";
import { distroEntity } from "../../loader/distros/distro.entity";
import { routeEntity } from "tx/boot/loader/route/route.entity";
import { useRoute } from "./useRoute.router";
import {Application} from "express";
import { events } from "tx/events/events";

export function renderRoutes(server:Application,user:userEntity,routesDeclared:routeEntity[],distros:distroEntity[]){
    events.emit("renderRoutes","STARTING",{})
    const routes = routesDeclared
    routes.forEach( (r) => {
     events.emit("loadRoute","STARTING",{route:r})
     const route = loadRoute(r,r.file_path,distros)
     process.stdout.write(`route loaded: [${route.method.toUpperCase()}] ${route.path}.\n`)
     useRoute(server,route,user)
     events.emit("loadRoute","FINISH",{route:r})
    })
}