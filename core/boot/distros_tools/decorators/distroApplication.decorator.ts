import { loadBases } from "../util/loadBases";
import { userEntity } from "../entitys/user.entity";

// name must be the same as the distro folder name

export function DistroApplication(name: string) {
    return function (constructor: any) {
        return class extends constructor{
            distro_name = name;
            bases_location = "userland/distros/" + name + "/bases/";
            user = {} as userEntity;
            bases = loadBases(constructor.prototype.bases_location, constructor.prototype.ctx);
        }
    };
}

