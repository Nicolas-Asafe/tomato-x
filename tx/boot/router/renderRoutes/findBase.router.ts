import { distroEntity } from "tx/boot/loader/distros/distro.entity";

export function findBaseOfDistro(distros: distroEntity[], base: string) {
    const [distroName, baseName] = base.split(":");

    const distroMap = new Map(distros.map(d => [d.__distro_name, d]));
    const distroInstance = distroMap.get(distroName);
    if (!distroInstance) throw new Error(`The distro '${distroName}' does not exist`);

    const baseMap = new Map(distroInstance.__bases.map(b => [b.__name, b]));
    const baseClass = baseMap.get(baseName);
    if (!baseClass) throw new Error(`The base '${base}' does not exist`);

    return baseClass;
}
