import { loadRoute } from "../../loader/route/route.loader.js";
import { useRoute } from "./useRoute.router.js";
import { events } from "../../../events/events.js";
export function renderRoutes(user, routesDeclared, distros) {
    events.emit("renderRoutes", "STARTING", {});
    const routes = routesDeclared;
    let routesLoaded = 0;
    routes.forEach((r) => {
        events.emit("loadRoute", "STARTING", { route: r });
        const route = loadRoute(r, r.file_path, distros);
        //  process.stdout.write(`route loaded: [${route.method.toUpperCase()}] ${route.path}.\n`)
        useRoute(route, user);
        routesLoaded += 1;
        events.emit("loadRoute", "FINISH", { route: r });
    });
    process.stdout.write(`(${routesLoaded}) routes loaded.\n`);
}
//# sourceMappingURL=renderRoutes.router.js.map