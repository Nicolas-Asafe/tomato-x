import { key } from "../../../shared/validator_keys/key.entity"
import { validatorKeys } from "../../../shared/validator_keys/validator"
import { routeEntity } from "./route.entity"

export async function parseRoute(jsonContent: routeEntity){
    const keys:key[] = [
        { name: "method", type: "string" },
        { name: "base", type: "string" },
        { name: "params", type: "object" }
    ]
    return validatorKeys(keys,jsonContent,"TomatoParseRoute")
}
