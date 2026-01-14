import { codes } from "../codes";
import { fail, success } from "../loggers/logger";
import { key } from "./key.entity";

export function validatorKeys(keys: key[], dataToValid:any, where: string) {
    for (const key of keys) {
        if (!dataToValid[key.name]) return fail({
            code: codes.INVALID_KEY,
            ok: false,
            details: {
                error: { message: `The key ${key.name}<type:${key.type}> not found` }
            }
        })
        if (typeof dataToValid[key.name] != key.type) return fail({
            code: codes.INVALID_KEY_TYPE,
            ok: false,
            details: {
                error: { message: `The key ${key.name}<type:${key.type}> must be ${key.type}` }
            }
        })
    }
    for (const data_key of Object.keys(dataToValid)) {
        if (!keys.find(k => k.name === data_key)) {
            return fail({
                code: codes.INVALID_KEY,
                ok: false,
                details: {
                    error: { message: `The key ${data_key} is invalid` }
                }
            })
        }
    }
    return success({code:codes.MANIFEST_PARSED,ok:true})
}