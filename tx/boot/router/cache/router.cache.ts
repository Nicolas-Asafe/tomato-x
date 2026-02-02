import fs from "fs/promises";
import path from "path";
import type { routeEntity } from "../../loader/route/route.entity.js";

const CACHE_FILE = "_routes_cache.json";

type RouteCacheData = {
    routes: routeEntity[];
};

export async function loadRouteCache(cacheDir: string): Promise<routeEntity[] | null> {
    const cachePath = path.join(cacheDir, CACHE_FILE);
    try {
        const raw = await fs.readFile(cachePath, "utf-8");
        const data: RouteCacheData = JSON.parse(raw);
        if (!Array.isArray(data.routes)) return null;
        return data.routes;
    } catch (err) {
        return null;
    }
}

export async function saveRouteCache(cacheDir: string, routes: routeEntity[]) {
    const cachePath = path.join(cacheDir, CACHE_FILE);

    const data: RouteCacheData = { routes };
    await fs.writeFile(cachePath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getOrCreateRouteCache(
    cacheDir: string,
    loader: () => Promise<routeEntity[]>
): Promise<routeEntity[]> {
    const cached = await loadRouteCache(cacheDir);
    if (cached) return cached;

    const routes = await loader();
    await saveRouteCache(cacheDir, routes);
    return routes;
}
