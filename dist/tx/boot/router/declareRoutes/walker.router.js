import fs from "fs/promises";
import path from "path";
import { jsonRead } from "../../../shared/read/json.read.js";
export async function walkerRouter(app, renderDirPath, renderRootPath = renderDirPath) {
    const renderDir = await fs.readdir(renderDirPath, { withFileTypes: true });
    const routes = [];
    const tasks = renderDir.map(async (dirent) => {
        const currentPath = path.join(renderDirPath, dirent.name);
        if (dirent.isDirectory()) {
            const childRoutes = await walkerRouter(app, currentPath, renderRootPath);
            routes.push(...childRoutes);
            return;
        }
        if (dirent.isFile() && dirent.name === "index.json") {
            const relativeDir = path.relative(renderRootPath, path.dirname(currentPath));
            const routeApiPath = relativeDir.replace(/\\/g, "/");
            const routeJson = await jsonRead(currentPath);
            const route = routeJson;
            route.file_path = currentPath;
            route.path = routeApiPath;
            routes.push(route);
        }
    });
    await Promise.allSettled(tasks);
    return routes;
}
//# sourceMappingURL=walker.router.js.map