import { userEntity } from "../../distros_tools/entitys/user.entity";
import fs from "fs/promises";
import { loadDistro } from "./util/distro.loader.util";
import { success } from "../../../shared/loggers/logger";
import { codes } from "../../../shared/codes";

export async function loadDistros(user: userEntity){
    const distros = []
    const distroNames = await fs.readdir("./userland/distros/")
    for(const distroname of distroNames){
        const distroInstance = loadDistro(distroname, user);
        distros.push(distroInstance);
    }
    return success({code: codes.DISTRO_LOADED,details:{distros:distros},ok:true});
}