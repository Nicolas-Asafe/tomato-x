// name must be the same as the distro folder name

export function DistroApplication(name: string) {
    return function (constructor: Function) {
        constructor.prototype.__distro_name = name;
        constructor.prototype.__bases_location = "usrl/distros/" + name + "/bases/";
        constructor.prototype.__bases = []
    };
}

