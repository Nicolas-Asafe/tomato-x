import type { userEntity } from "../../../distros_tools/entitys/user.entity.js";
import fs from "fs/promises";
import { loadDistro } from "./util/distro.loader.util.js";
import type { distroEntity } from "./distro.entity.js";

export async function loadDistros(user: userEntity): Promise<distroEntity[]> {
    const names = await fs.readdir("usrl/distros")
    const distros = await Promise.all(
        names.map(async (name) => {
            const distro = await loadDistro(name, user)
            if (distro.__compatibility_version !== user.engine.version) {
                throw new Error(
                    `distro ${name} incompatible (${user.engine.version} != ${distro.compatibilityVersion})`
                )
            }
            return distro
        })
    )
    process.stdout.write(`(${distros.length}) distros loaded.\n`)
    return distros
}
