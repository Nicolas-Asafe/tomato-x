import { loadRoute } from "core/boot/loader/route/route.loader";
import { userEntity } from "../../distros_tools/entitys/user.entity";
import { distroEntity } from "../../loader/distros/distro.entity";
import { routeEntity } from "core/boot/loader/route/route.entity";
import { useRoute } from "./useRoute.router";
import {Application} from "express";
import { toConsole } from "core/shared/loggers/logger";

export async function renderRoutes(server:Application,user:userEntity,routesDeclared:routeEntity[],distros:distroEntity[]){
    const routes = routesDeclared
    routes.forEach(async (r) => {
     const routeResponse = await loadRoute(r,r.file_path,distros)
     if(!routeResponse.ok) {
        toConsole(routeResponse,`TomatoRouteLoader`,`error to load route: ${routeResponse.details.error.message}`)
        return
     }
     toConsole(routeResponse,`TomatoRouteLoader`,`route loaded: [${routeResponse.details.route.method.toUpperCase()}] ${routeResponse.details.route.path}`)
     useRoute(server,routeResponse.details.route,user)
    })
}