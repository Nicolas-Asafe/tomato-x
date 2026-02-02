export function deepFreeze(obj) {
    Object.freeze(obj);
    for (const key of Object.keys(obj)) {
        const value = obj[key];
        if (value !== null &&
            typeof value === "object" &&
            !Object.isFrozen(value)) {
            deepFreeze(value);
        }
    }
    return obj;
}
//# sourceMappingURL=deepFreeze.freeze.js.map