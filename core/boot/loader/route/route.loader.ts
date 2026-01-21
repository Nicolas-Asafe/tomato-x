import { findBaseOfDistro } from "core/boot/router/findBase.router";
import { codes } from "../../../shared/codes";
import { success, toConsole } from "../../../shared/loggers/logger";
import { jsonRead } from "../../../shared/read/json.read";
import { routeEntity } from "./route.entity";
import { parseRoute } from "./route.parse";
import { distroEntity } from "../distros/distro.entity";
import { successEntity } from "core/shared/loggers/success/success.entity";
import { ctxEntity } from "core/boot/distros_tools/entitys/ctx.entity";
import { failEntity } from "core/shared/loggers/fail/fail.entity";

export async function loadRoute(pathIndex: string, pathApiNow: string, distros: distroEntity[]) {
    const jsonReadResponse = await jsonRead(pathIndex)
    if (!jsonReadResponse.ok) return jsonReadResponse;
    const jsonContent = jsonReadResponse.details.json;
    const jsonParseResponse = await parseRoute(jsonContent)
    if (!jsonParseResponse.ok) return jsonParseResponse;
    const baseResponse = findBaseOfDistro(distros, jsonContent.base)
    if (!baseResponse.ok) return baseResponse;
    let route = {
        method: jsonContent.method,
        base: jsonContent.base,
        params: jsonContent.params,
        path: `/${pathApiNow}`,
        file_path: pathIndex,
    } as routeEntity
    const baseInstance = baseResponse.details.baseClass
    const ctx = {
        route: route
    } as ctxEntity
    baseInstance["ctx"] = ctx
    baseInstance["keys"] = baseInstance.keys
    route["baseInstance"] = baseInstance
    const baseParsed: successEntity = route.baseInstance.parse()
    if (!baseParsed.ok) {
        return { ok: false, code: codes.BASE_ERROR, details: { error: { message: `error to parse params in base ${route.base}: ` + baseParsed.details.error.message } } } as failEntity
    }
    return { ok: true, code: codes.ROUTE_LOADED, details: { route: route } } as successEntity
}