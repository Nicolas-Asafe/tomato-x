import { findBaseOfDistro } from "core/boot/router/renderRoutes/findBase.router";
import { codes } from "../../../shared/codes";
import { routeEntity } from "./route.entity";
import { parseRoute } from "./route.parse";
import { distroEntity } from "../distros/distro.entity";
import { successEntity } from "core/shared/loggers/success/success.entity";
import { ctxEntity } from "core/boot/distros_tools/entitys/ctx.entity";
import { failEntity } from "core/shared/loggers/fail/fail.entity";
import { toConsole } from "core/shared/loggers/logger";
import { baseEntity } from "../base/base.entity";

export async function loadRoute(json: any, pathIndex: string, distros: distroEntity[]) {
    const jsonContent = json;
    const jsonParseResponse = await parseRoute(jsonContent)
    if (!jsonParseResponse.ok) return jsonParseResponse;
    const baseResponse = findBaseOfDistro(distros, jsonContent.base)
    if (!baseResponse.ok) return baseResponse;

    const route = {
        method: jsonContent.method,
        base: jsonContent.base,
        params: jsonContent.params,
        path: `/${json.path}`,
        file_path: pathIndex,
    } as routeEntity


    const ctx = { route: route } as ctxEntity
    let baseInstance: baseEntity = baseResponse.details.baseClass
    baseInstance.ctx = ctx
    baseInstance.keys = baseInstance.keys
    route.baseInstance = baseInstance

    const baseParsed: successEntity = route.baseInstance.parse()
    if (!baseParsed.ok) {
        const err = { ok: false, code: codes.BASE_ERROR, details: { error: { message: `error to parse params in base ${route.base}: ` + baseParsed.details.error.message } } } as failEntity
        toConsole(err, "TomatoRouteLoader");
        return err
    }

    return { ok: true, code: codes.ROUTE_LOADED, details: { route: route } } as successEntity
}