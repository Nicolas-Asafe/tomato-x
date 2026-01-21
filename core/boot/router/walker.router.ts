import fs from "fs/promises"
import { loadRoute } from "../loader/route/route.loader"
import { toConsole } from "../../shared/loggers/logger"
import { useRoute } from "./useRoute.router"
import { routeEntity } from "../loader/route/route.entity"
import { userEntity } from "../distros_tools/entitys/user.entity"
import { distroEntity } from "../loader/distros/distro.entity"

export async function walkerRouter(app: any, renderDirPath:  string,distros: distroEntity[],user:userEntity) {
    const renderDir = await fs.readdir(renderDirPath, { withFileTypes: true })
    const routes = []
    for (const dirent of renderDir) {
        if (dirent.isDirectory()) {
            await walkerRouter(app, `${renderDirPath}/${dirent.name}`,distros,user)
        } 
        if (dirent.isFile() && dirent.name=="index.json") {
            const routePath = `${renderDirPath}/${dirent.name}`
            const routeApiPath = dirent.parentPath.split("/").reverse()
            const loadRouteResponse = await loadRoute(routePath,routeApiPath[0],distros)
            if (!loadRouteResponse.ok) {
                toConsole(loadRouteResponse,"TomatoLoadRoute",`Error loading route from ${routePath}. Err: ${loadRouteResponse.details.error.message}`)
                continue;
            }
            const route:routeEntity = loadRouteResponse.details.route
            console.log(route)
            useRoute(app,route,distros,user)
            toConsole(loadRouteResponse,"TomatoWalkerRouter",`Route loaded from ${routePath}`)
            routes.push(route)
        }
    }
    return routes
}

