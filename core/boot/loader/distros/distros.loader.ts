import { userEntity } from "../../distros_tools/entitys/user.entity";
import fs from "fs/promises";
import { loadDistro } from "./util/distro.loader.util";
import { distroEntity } from "./distro.entity";

export async function loadDistros(user: userEntity){
    const distros = []
    const distroNames = await fs.readdir("./usrl/distros/")
    for(const distroname of distroNames){
        
        const distroInstance = await loadDistro(distroname, user);
        if (!distroInstance.ok) throw new Error(`the distro '${distroname}' not has a instance`)

        const distro:distroEntity = distroInstance.details.instance;
        if (distro.__compatibility_version != user.engine.version) throw new Error(`the distro ${distroname} is not compatible with user engine (${user.engine.version} != ${distro.__compatibility_version})`)

        distros.push(distro);
    }
    return distros
}