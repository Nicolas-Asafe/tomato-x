import fs from "fs/promises"
import path from "path"
import { routeEntity } from "../../loader/route/route.entity"
import { jsonRead } from "tx/shared/read/json.read"

export async function walkerRouter(
    app: any,
    renderDirPath: string,
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
            const routeJson = await (await jsonRead(currentPath))

            const route:routeEntity = routeJson;
            route.file_path= `${currentPath}`
            route.path= `${routeApiPath}`
            routes.push(route)

        }
    }

    return routes
}

