import { userEntity } from "../entitys/user.entity";

// name must be the same as the distro folder name

export function DistroApplication(name: string) {
    return function (constructor: Function) {
        constructor.prototype.__distro_name = name;
        constructor.prototype.__bases_location = "userland/distros/" + name + "/bases/";
        constructor.prototype.__user = {} as userEntity;
        constructor.prototype.__bases = []
    };
}

