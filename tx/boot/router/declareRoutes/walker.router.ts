import fs from "fs/promises";
import path from "path";
import type { routeEntity } from "../../loader/route/route.entity.js";
import { jsonRead } from "../../../shared/read/json.read.js";

export async function walkerRouter(
    renderDirPath: string,
    renderRootPath: string = renderDirPath
): Promise<routeEntity[]> {

    const renderDir = await fs.readdir(renderDirPath, { withFileTypes: true });
    const routes: routeEntity[] = [];

    const tasks = renderDir.map(async (dirent) => {
        const currentPath = path.join(renderDirPath, dirent.name);

        if (dirent.isDirectory()) {
            const childRoutes = await walkerRouter(currentPath, renderRootPath);
            routes.push(...childRoutes);
            return;
        }

        if (dirent.isFile() && dirent.name === "index.json") {
            const relativeDir = path.relative(renderRootPath, path.dirname(currentPath));
            const routeApiPath = relativeDir.replace(/\\/g, "/");

            const routeJson = await jsonRead(currentPath);
            const route: routeEntity = routeJson;
            route.file_path = currentPath;
            route.path = routeApiPath;
            routes.push(route);
        }
    });

    await Promise.allSettled(tasks); 
    return routes;
}
