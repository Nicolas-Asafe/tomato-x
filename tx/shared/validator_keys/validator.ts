import { key } from "./key.entity";

export function validatorOfKeys(
    keys: readonly key[],
    data: unknown,
    where: string
): true {
    if (data === null || typeof data !== "object") {
        throw new SyntaxError(`The data to validate in ${where} is invalid`);
    }
    const obj = data as Record<string, unknown>;
    const keyMap = new Map<string, key>();
    for (const k of keys) {
        keyMap.set(k.name, k);
    }
    for (const k of keys) {
        const value = obj[k.name];

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
    for (const prop in obj) {
        if (!keyMap.has(prop)) {
            throw new SyntaxError(`The key '${prop}' is invalid`);
        }
    }

    return true;
}
