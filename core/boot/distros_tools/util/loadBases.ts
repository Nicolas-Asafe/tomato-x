import { ctxEntity } from "../entitys/ctx.entity";
import fs from "fs/promises"

export async function loadBases(location:string,ctx:ctxEntity){
    const dir = await fs.readdir(location, { withFileTypes: true })
    const bases_path = [];
    const bases = [];
    for (const dirent of dir) {
        if (dirent.isFile() && dirent.name.endsWith(".base.ts")) {
            bases_path.push(dirent.name);
        }
    }
    for (const base_path of bases_path) {
        const baseModule = await import(`../../../${location}${base_path}`);
        const baseClass = baseModule.default;
        const baseInstance = new baseClass(ctx);
        bases.push(baseInstance);
    }
}