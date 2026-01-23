import fs from "fs/promises"
import path from "path"
import { routeEntity } from "../../loader/route/route.entity"
import { userEntity } from "../../distros_tools/entitys/user.entity"
import { distroEntity } from "../../loader/distros/distro.entity"
import { jsonRead } from "core/shared/read/json.read"

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
            const routeJson = await (await jsonRead(currentPath)).details.json
            const route = {
                method: routeJson.method,
                base: routeJson.base,
                params: routeJson.params,
                file_path: `${currentPath}`,
                path: `${routeApiPath}`,
            } as routeEntity
            routes.push(route)
        }
    }

    return routes
}

