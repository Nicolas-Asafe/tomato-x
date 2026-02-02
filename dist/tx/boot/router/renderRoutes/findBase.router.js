export function findBaseOfDistro(distros, base) {
    const [distroName, baseName] = base.split(":");
    const distroMap = new Map(distros.map((d) => [d.__distro_name, d]));
    const distroInstance = distroMap.get(distroName);
    if (!distroInstance)
        throw new Error(`The distro '${distroName}' does not exist`);
    const baseMap = new Map(distroInstance.__bases.map((b) => [b.__name, b]));
    const baseClass = baseMap.get(baseName);
    if (!baseClass)
        throw new Error(`The base '${base}' does not exist`);
    return baseClass;
}
//# sourceMappingURL=findBase.router.js.map