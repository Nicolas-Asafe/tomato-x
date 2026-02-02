import fs from "fs/promises";
import path from "path";
const CACHE_FILE = "_routes_cache.json";
export async function loadRouteCache(cacheDir) {
    const cachePath = path.join(cacheDir, CACHE_FILE);
    try {
        const raw = await fs.readFile(cachePath, "utf-8");
        const data = JSON.parse(raw);
        if (!Array.isArray(data.routes))
            return null;
        return data.routes;
    }
    catch (err) {
        return null;
    }
}
export async function saveRouteCache(cacheDir, routes) {
    const cachePath = path.join(cacheDir, CACHE_FILE);
    const data = { routes };
    await fs.writeFile(cachePath, JSON.stringify(data, null, 2), "utf-8");
}
export async function getOrCreateRouteCache(cacheDir, loader) {
    const cached = await loadRouteCache(cacheDir);
    if (cached)
        return cached;
    const routes = await loader();
    await saveRouteCache(cacheDir, routes);
    return routes;
}
//# sourceMappingURL=router.cache.js.map