import { findBaseOfDistro } from "core/boot/router/findBase.router";
import { codes } from "../../../shared/codes";
import { success } from "../../../shared/loggers/logger";
import { jsonRead } from "../../../shared/read/json.read";
import { routeEntity } from "./route.entity";
import { parseRoute } from "./route.parse";
import { distroEntity } from "../distros/distro.entity";
import { successEntity } from "core/shared/loggers/success/success.entity";

export async function loadRoute(pathIndex:string,pathApiNow:string,distros:distroEntity[]){
    const jsonReadResponse = await jsonRead(pathIndex)
    if(!jsonReadResponse.ok) return jsonReadResponse;
    const jsonContent = jsonReadResponse.details.json;
    const jsonParseResponse = await parseRoute(jsonContent)
    if (!jsonParseResponse.ok) return jsonParseResponse;
    const baseResponse = findBaseOfDistro(distros,jsonContent.base)
    if (!baseResponse.ok) return baseResponse;
    const baseInstance = baseResponse.details.baseClass 
    const route:routeEntity = {
        method: jsonContent.method,
        base: jsonContent.base,
        params: jsonContent.params,
        path: `/${pathApiNow}`,
        file_path:pathIndex,
        baseInstance:baseInstance
    }
    return {ok:true,code:codes.ROUTE_LOADED,details:{route:route}} as successEntity
}