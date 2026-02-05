import type { userEntity } from "../../../distros_tools/entitys/user.entity.js";
import { walkerRouter } from "./walker.router.js";
import { getOrCreateRouteCache } from "../cache/router.cache.js";
import fs from "fs/promises";
import fsWatch from "fs"; 
import path from "path";

const CACHE_DIR = "./tx/boot/router/cache";
const CACHE_FILE = "_routes_cache.json";

let routesCacheWatcherStarted = false;
export async function declareRoutes(projectPath:string,render_directory:string) {
    const renderPath = path.join(projectPath, render_directory);

    if (!routesCacheWatcherStarted) {
        startRoutesWatcher(renderPath);
        routesCacheWatcherStarted = true;
    }
    const routes = await getOrCreateRouteCache(CACHE_DIR, async () => {
        return walkerRouter(renderPath);
    });

    return routes;
}

function startRoutesWatcher(dirToWatch: string) {
    fsWatch.watch(dirToWatch, { recursive: true }, async (eventType, filename) => {
        if (!filename) return;
        // console.log(`[ROUTES CACHE] Change detected: ${filename}, invalidating cache`);
        try {
            await fs.unlink(path.join(CACHE_DIR, CACHE_FILE));
        } catch {}
    });
}
