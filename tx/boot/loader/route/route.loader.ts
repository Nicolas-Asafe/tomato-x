import { findBaseOfDistro } from "tx/boot/router/renderRoutes/findBase.router";
import { routeEntity } from "./route.entity";
import { parseRoute } from "./route.parse";
import { distroEntity } from "../distros/distro.entity";
import { baseEntity } from "../base/base.entity";

export async function loadRoute(json: any, pathIndex: string, distros: distroEntity[]) {
    await parseRoute(json)
    const base = findBaseOfDistro(distros, json.base)
    const route = {
        method: json.method,
        base: json.base,
        params: json.params,
        path: `/${json.path}`,
        file_path: pathIndex,
    } as routeEntity

    let baseInstance: baseEntity = base
    route.baseInstance = baseInstance
    route.baseInstance.parse(route.params)

    return route
}