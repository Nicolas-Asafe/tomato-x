import fs from "fs/promises"
import path from "path"
import { loadRoute } from "../loader/route/route.loader"
import { toConsole } from "../../shared/loggers/logger"
import { useRoute } from "./useRoute.router"
import { routeEntity } from "../loader/route/route.entity"
import { userEntity } from "../distros_tools/entitys/user.entity"
import { distroEntity } from "../loader/distros/distro.entity"

export async function walkerRouter(
    app: any,
    renderDirPath: string,
    distros: distroEntity[],
    user: userEntity,
    renderRootPath: string = renderDirPath
) {
    const renderDir = await fs.readdir(renderDirPath, { withFileTypes: true })
    const routes: routeEntity[] = []
    for (const dirent of renderDir) {
        const currentPath = path.join(renderDirPath, dirent.name)
        if (dirent.isDirectory()) {
            const childRoutes = await walkerRouter(
                app,
                currentPath,
                distros,
                user,
                renderRootPath
            )
            routes.push(...childRoutes)
            continue
        }
        if (dirent.isFile() && dirent.name === "index.json") {
            const relativeDir = path.relative(
                renderRootPath,
                path.dirname(currentPath)
            )
            const routeApiPath = relativeDir.replace(/\\/g, "/")
            const loadRouteResponse = await loadRoute(
                currentPath,
                routeApiPath,
                distros
            )
            if (!loadRouteResponse.ok) {
                toConsole(
                    loadRouteResponse,
                    "TomatoLoadRoute",
                    `Error loading route from ${currentPath}. Err: ${loadRouteResponse.details.error.message}`
                )
                continue
            }
            const route: routeEntity = loadRouteResponse.details.route
            useRoute(app, route, distros, user)
            toConsole(
                loadRouteResponse,
                "TomatoWalkerRouter",
                `Route loaded from ${currentPath}`
            )

            routes.push(route)
        }
    }

    return routes
}

