import { key } from "./key.entity";

export function validatorOfKeys(
    keys: readonly key[],
    data: any,
    where: string
) {
    if (data === null || typeof data !== "object") {
        throw new SyntaxError(`The data to valid in ${where} is invalid`);
    }

    const keyMap = new Map<string, key>();

    for (const k of keys) {
        keyMap.set(k.name, k);
    }
    for (const k of keys) {
        const value = data[k.name];

        if (value === undefined) {
            if (k.required) {
                throw new SyntaxError(
                    `The key '${k.name}' of type ${k.type} not found`
                );
            }
            continue;
        }
        if (typeof value !== k.type) {
            throw new TypeError(
                `The key '${k.name}' must be ${k.type}`
            );
        }
    }

    for (const dataKey in data) {
        if (!keyMap.has(dataKey)) {
            throw new SyntaxError(
                `The key '${dataKey}' is invalid`
            );
        }
    }

    return true;
}
