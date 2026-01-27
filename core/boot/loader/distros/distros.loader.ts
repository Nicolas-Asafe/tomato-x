import { userEntity } from "../../distros_tools/entitys/user.entity";
import fs from "fs/promises";
import { loadDistro } from "./util/distro.loader.util";
import { codes } from "../../../shared/codes";
import { successEntity } from "../../../shared/loggers/success/success.entity";
import { failEntity } from "core/shared/loggers/fail/fail.entity";
import { toConsole } from "core/shared/loggers/logger";
import { distroEntity } from "./distro.entity";

export async function loadDistros(user: userEntity){
    const distros = []
    const distroNames = await fs.readdir("./usrl/distros/")
    for(const distroname of distroNames){
        const distroInstance = await loadDistro(distroname, user);
        if (!distroInstance.ok){
            const err = {details:{error:`the distro '${distroname}' not has a instance`,ok:false,code:codes.DISTRO_NOT_FOUND}} as failEntity;
            toConsole(err,"TomatoDistroLoader",err.details.error)
            process.exit(0) 
        };
        const distro:distroEntity = distroInstance.details.instance;
        if (distro.__compatibility_version != user.engine.version){
            const err = {details:{error:`the distro ${distroname} is not compatible with user engine (${user.engine.version} != ${distro.__compatibility_version})`},code:codes.NON_COMPATIBLE_VERSION} as failEntity;
            toConsole(err,"TomatoDistroLoader",err.details.error);
        }
        distros.push(distro);
    }
    return {code: codes.DISTRO_LOADED,details:{distros:distros},ok:true} as successEntity;
}