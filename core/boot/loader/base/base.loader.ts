import fs from "fs/promises"
import { baseEntity } from "./base.entity";

export async function loadBases(location:string,distroname:string){
    const dir = await fs.readdir(location, { withFileTypes: true })
    const bases_path = [];
    const bases = [];
    for (const dirent of dir) {
        if (dirent.isFile() && dirent.name.endsWith(".base.ts")) {
            bases_path.push(dirent.name);
        }
    }
    for (const base_path of bases_path) {
        const baseModule = await import(`../../../../${location}${base_path}`);
        if (!baseModule) throw new Error(`the base module ${base_path} not found`)

        const baseClass = baseModule.default;
        const baseInstance = new baseClass()

        const base = {
            __name:baseInstance.__name,
            distro:distroname,
            exec:baseInstance.exec,
            parse:baseInstance.parse,
            logic:baseInstance.logic,
            location:location,
            setCtx:baseInstance.setCtx,
            keys:baseInstance.keys,
        } as baseEntity
        bases.push(base);
    }
    return bases;
}