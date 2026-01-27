import { key } from "./key.entity";

export function validatorOfKeys(keys: key[], dataToValid:any, where: string) {
    if (!dataToValid || typeof dataToValid != "object") {
        throw new SyntaxError(`The data to valid in ${where} is invalid`)
    }
    for (const key of keys) {
        if (dataToValid[key.name] == undefined)  throw new SyntaxError(`The key '${key.name}' of type ${key.type} not found`)
            
        if (typeof dataToValid[key.name] != key.type) throw new TypeError( `The key '${key.name}' must be ${key.type}`)
    }
    for (const data_key of Object.keys(dataToValid)) {
        if (!keys.find(k => k.name === data_key)) throw new SyntaxError(`The key '${data_key}' is invalid`)
    }
    return true
}