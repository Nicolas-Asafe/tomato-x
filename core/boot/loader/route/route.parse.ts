import { codes } from "../../../shared/codes"
import { fail } from "../../../shared/loggers/logger"
import { key } from "../../../shared/validator_keys/key.entity"
import { validatorKeys } from "../../../shared/validator_keys/validator"
import { routeEntity } from "./route.entity"

export async function parseRoute(jsonContent: routeEntity){
    const keys:key[] = [
        { name: "method", type: "string" },
        { name: "base", type: "string" },
        { name: "params", type: "object" }
    ]
    if (!jsonContent.base.endsWith(".base")) return fail({code:codes.INVALID_BASE,ok:false,details:{error:{message:"Base must ends with .base and exists"}}})
    return validatorKeys(keys,jsonContent,"TomatoParseRoute")
}
