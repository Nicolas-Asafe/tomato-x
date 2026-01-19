import fs from "fs/promises"
import { loadRoute } from "../loader/route/route.loader"
import { toConsole } from "../../shared/loggers/logger"

export async function walkerRouter(app: any, renderDirPath:  string) {
    const renderDir = await fs.readdir(renderDirPath, { withFileTypes: true })
    for (const dirent of renderDir) {
        if (dirent.isDirectory()) {
            await walkerRouter(app, `${renderDirPath}/${dirent.name}`)
        } 
        if (dirent.isFile() && dirent.name=="index.json") {
            const routePath = `${renderDirPath}/${dirent.name}`
            const loadRouteResponse = await loadRoute(routePath, renderDirPath.split("/")[0])
            if (!loadRouteResponse.ok) {
                toConsole(loadRouteResponse,"TomatoWalkerRouter",`Error loading route from ${routePath}. Err: ${loadRouteResponse.details.error.message}`)
                continue;
            }
            toConsole(loadRouteResponse,"TomatoWalkerRouter",`Route loaded from ${routePath}`)
        }
    }
}

