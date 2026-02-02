// name must be the same as the distro folder name
import { fileURLToPath } from "url";
import path from "path";

interface DistroApplicationParamDecorator {
    __distro_name: string;
    __version:string;
    __compatibility_version:string;
}

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const rootDir = path.resolve(__dirname, "../../../..");

export function DistroApplication(params:DistroApplicationParamDecorator) {
    return function (constructor: Function) {
        constructor.prototype.__distro_name = params.__distro_name;
        constructor.prototype.__bases_location = path.resolve(rootDir, `dist/usrl/distros/${params.__distro_name}/bases`);
        constructor.prototype.__bases = [];
        constructor.prototype.__version = params.__version;
        constructor.prototype.__compatibility_version = params.__compatibility_version;
    };
}

