import { loadRoute } from "../../loader/route/route.loader.js";
import type { userEntity } from "../../../distros_tools/entitys/user.entity.js";
import type { distroEntity } from "../../loader/distros/distro.entity.js";
import type { routeEntity } from "../../loader/route/route.entity.js";
import { useRoute } from "./useRoute.router.js";
import type {Application} from "express";
import { events } from "../../../events/events.js";

export function renderRoutes(server:Application,user:userEntity,routesDeclared:routeEntity[],distros:distroEntity[]){
    events.emit("renderRoutes","STARTING",{})
    const routes = routesDeclared
    let routesLoaded = 0
    routes.forEach( (r) => {
     events.emit("loadRoute","STARTING",{route:r})
     const route = loadRoute(r,r.file_path,distros)
    //  process.stdout.write(`route loaded: [${route.method.toUpperCase()}] ${route.path}.\n`)
     useRoute(server,route,user)
     routesLoaded+=1
     events.emit("loadRoute","FINISH",{route:r})
    })
    process.stdout.write(`(${routesLoaded}) routes loaded.\n`)
}