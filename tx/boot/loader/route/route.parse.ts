import { key } from "../../../shared/validator_keys/key.entity"
import { validatorOfKeys } from "../../../shared/validator_keys/validator"
import { routeEntity } from "./route.entity"

export async function parseRoute(jsonContent: routeEntity) {
    const keys: key[] = [
        { name: "method", type: "string" },
        { name: "base", type: "string" },
        { name: "params", type: "object" },
        { name: "path", type: "string" },
        { name: "file_path", type: "string" },
    ]
    parseMethod(jsonContent)
    if (!jsonContent.base.includes(":") || !jsonContent.base.endsWith(".base")) throw new SyntaxError(
        "Base must have this format: '<distro>:<basename>.base'"
    )
    return validatorOfKeys(keys, jsonContent, "TomatoParseRoute")
}

export function parseMethod(route:routeEntity) {
    const methodLower = route.method.toLowerCase()
    const methods = ["get", "post", "put", "patch", "options", "delete"]
    if (methods.find(m=>m==methodLower) == undefined) throw new SyntaxError(
        `invalid method in route ${route.file_path} (method invalid:${route.method})`
    )
}