import { findBaseOfDistro } from "../../router/renderRoutes/findBase.router.js";
import { parseRoute } from "./route.parse.js";
export function loadRoute(json, pathIndex, distros) {
    json.file_path = pathIndex;
    json.path = "/" + json.path;
    parseRoute(json);
    const base = findBaseOfDistro(distros, json.base);
    json.baseInstance = base;
    base.parse(json.params);
    return json;
}
//# sourceMappingURL=route.loader.js.map