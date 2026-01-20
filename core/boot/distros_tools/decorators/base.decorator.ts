export function Base(name: string) {
    return function (constructor: any) {
       constructor.prototype.__name = name;
    }
}
