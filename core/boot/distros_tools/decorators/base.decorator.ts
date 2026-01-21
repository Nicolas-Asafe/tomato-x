export function Base(name: string) {
    return function (constructor: any) {
        if (!name) throw new Error(`The base name is required`)
        if (typeof name != "string") throw new Error("The base name must be string")
        if (!name.endsWith(".base")) throw new Error(`The base name ${name} needs ends with .base`)
        constructor.prototype.__name = name;
    }
}
