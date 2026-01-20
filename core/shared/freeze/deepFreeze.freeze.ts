export function deepFreeze<T extends object>(obj: T): T {
  Object.freeze(obj);

  for (const key of Object.keys(obj)) {
    const value = (obj as any)[key];

    if (
      value !== null &&
      typeof value === "object" &&
      !Object.isFrozen(value)
    ) {
      deepFreeze(value);
    }
  }

  return obj;
}
