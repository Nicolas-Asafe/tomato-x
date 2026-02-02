import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";
export async function loadBases(location, distroname) {
    const dir = await fs.readdir(location, { withFileTypes: true });
    const loaders = [];
    for (const d of dir) {
        if (!d.isFile() || !d.name.endsWith(".base.js"))
            continue;
        const basePath = path.resolve(location, d.name);
        loaders.push(import(pathToFileURL(basePath).href).then((mod) => {
            const base = new mod.default();
            base.distro = distroname;
            base.location = location;
            return base;
        }));
    }
    return Promise.all(loaders);
}
//# sourceMappingURL=base.loader.js.map