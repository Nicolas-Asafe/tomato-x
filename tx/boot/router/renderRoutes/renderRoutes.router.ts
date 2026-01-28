import { loadRoute } from "tx/boot/loader/route/route.loader";
import { userEntity } from "tx/distros_tools/entitys/user.entity";
import { distroEntity } from "../../loader/distros/distro.entity";
import { routeEntity } from "tx/boot/loader/route/route.entity";
import { useRoute } from "./useRoute.router";
import {Application} from "express";

export async function renderRoutes(server:Application,user:userEntity,routesDeclared:routeEntity[],distros:distroEntity[]){
    const routes = routesDeclared
    routes.forEach(async (r) => {
     const route = await loadRoute(r,r.file_path,distros)
     console.log(`route loaded: [${route.method.toUpperCase()}] ${route.path}`)
     useRoute(server,route,user)
    })
}