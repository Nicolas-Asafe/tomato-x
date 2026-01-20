import { codes } from "../../../shared/codes";
import { success } from "../../../shared/loggers/logger";
import { jsonRead } from "../../../shared/read/json.read";
import { routeEntity } from "./route.entity";
import { parseRoute } from "./route.parse";

export async function loadRoute(pathIndex:string,pathApiNow:string){
    const jsonReadResponse = await jsonRead(pathIndex)
    if(!jsonReadResponse.ok) return jsonReadResponse;
    const jsonContent = jsonReadResponse.details.json;
    const jsonParseResponse = await parseRoute(jsonContent)
    if (!jsonParseResponse.ok) return jsonParseResponse;
    const route:routeEntity = {
        method: jsonContent.method,
        base: jsonContent.base,
        params: jsonContent.params,
        path: `/${pathApiNow}`,
        file_path:pathIndex
    }
    return success({ok:true,code:codes.ROUTE_LOADED,details:{route:route}})
}