import type { key } from "./key.entity.js";

export function validatorOfKeys(
  keys: readonly key[],
  data: unknown,
  where: string
): true {
  if (data === null || typeof data !== "object") {
    throw new SyntaxError(`The data to validate in ${where} is invalid`);
  }

  const obj = data as Record<string, unknown>;
  const allowedKeys = new Set<string>();

  for (const k of keys) {
    allowedKeys.add(k.name);

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

  for (const prop of Object.keys(obj)) {
    if (!allowedKeys.has(prop)) {
      throw new SyntaxError(`The key '${prop}' is invalid`);
    }
  }

  return true;
}
