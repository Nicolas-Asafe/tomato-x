import { loadBases } from "../util/loadBases";
import { ctxEntity } from "../entitys/ctx.entity";

// name must be the same as the distro folder name

export function DistroApplication(name: string) {
    return function (constructor: Function) {
        constructor.prototype.name = name;
        constructor.prototype.bases_location = "userland/distros/" + name + "/bases/";
        constructor.prototype.ctx = {} as ctxEntity;
        constructor.prototype.bases = loadBases(constructor.prototype.bases_location, constructor.prototype.ctx);
    };
}

