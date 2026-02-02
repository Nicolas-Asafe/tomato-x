export function Base(name) {
    return function (constructor) {
        if (!name)
            throw new Error(`The base name is required`);
        if (typeof name != "string")
            throw new Error("The base name must be string");
        if (!name.endsWith(".base"))
            throw new Error(`The base name ${name} needs ends with .base`);
        constructor.prototype.__name = name;
    };
}
//# sourceMappingURL=base.decorator.js.map