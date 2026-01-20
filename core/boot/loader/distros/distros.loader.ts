import { userEntity } from "../../distros_tools/entitys/user.entity";
import fs from "fs/promises";
import { loadDistro } from "./util/distro.loader.util";
import { codes } from "../../../shared/codes";
import { successEntity } from "../../../shared/loggers/success/success.entity";

export async function loadDistros(user: userEntity){
    const distros = []
    const distroNames = await fs.readdir("./userland/distros/")
    for(const distroname of distroNames){
        const distroInstance = await loadDistro(distroname, user);
        distros.push(distroInstance);
    }
    return {code: codes.DISTRO_LOADED,details:{distros:distros},ok:true} as successEntity;
}