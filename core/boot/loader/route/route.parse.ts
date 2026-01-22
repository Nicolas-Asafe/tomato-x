import { codes } from "../../../shared/codes"
import { fail, success } from "../../../shared/loggers/logger"
import { key } from "../../../shared/validator_keys/key.entity"
import { validatorKeys } from "../../../shared/validator_keys/validator"
import { routeEntity } from "./route.entity"

export async function parseRoute(jsonContent: routeEntity) {
    const keys: key[] = [
        { name: "method", type: "string" },
        { name: "base", type: "string" },
        { name: "params", type: "object" }
    ]
    const methodParsed = parseMethod(jsonContent)
    if (!methodParsed.ok) return methodParsed
    if (!jsonContent.base.includes(":") || !jsonContent.base.endsWith(".base")) return fail({code:codes.INVALID_BASE,ok:false,details:{error:{message:"Base must have this format: '<distro>:<basename>.action'"}}})
    return validatorKeys(keys, jsonContent, "TomatoParseRoute")
}

export function parseMethod(route:routeEntity) {
    const methodLower = route.method.toLowerCase()
    const methods = ["get", "post", "put", "patch", "options", "delete"]
    if (methods.find(m=>m==methodLower) == undefined) return fail({code:codes.INVALID_METHOD,ok:false,details:{error:{message:`invalid method in route ${route.file_path} (method invalid:${route.method})`}}})
    return success({ok:true,code:codes.METHOD_PARSED})
}