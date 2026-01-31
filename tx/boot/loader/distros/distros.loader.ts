import { userEntity } from "tx/distros_tools/entitys/user.entity";
import fs from "fs/promises";
import { loadDistro } from "./util/distro.loader.util";
import { distroEntity } from "./distro.entity";

export async function loadDistros(user: userEntity){
    const distros = []
    const distroNames = await fs.readdir("./usrl/distros/")
    for(const distroname of distroNames){
        
        const distro:distroEntity = await loadDistro(distroname, user);
        if (!distro) throw new Error(`the distro '${distroname}' not has a instance`)
        if (distro.__compatibility_version != user.engine.version) throw new Error(
            `the distro ${distroname} is not compatible with user engine (${user.engine.version} != ${distro.__compatibility_version})`
        )
        distros.push(distro);
        process.stdout.write(`distro [${distroname}] loaded.\n`)
    }
    return distros
}