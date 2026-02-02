import type { routeEntity } from "../../loader/route/route.entity.js";
export declare function loadRouteCache(cacheDir: string): Promise<routeEntity[] | null>;
export declare function saveRouteCache(cacheDir: string, routes: routeEntity[]): Promise<void>;
export declare function getOrCreateRouteCache(cacheDir: string, loader: () => Promise<routeEntity[]>): Promise<routeEntity[]>;
//# sourceMappingURL=router.cache.d.ts.map