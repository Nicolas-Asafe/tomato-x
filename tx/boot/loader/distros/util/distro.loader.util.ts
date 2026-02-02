import type {userEntity} from "../../../../distros_tools/entitys/user.entity.js"
import { loadBases } from "../../base/base.loader.js"
import { verifyDistro } from "./verifyDistro.util.js"
import { fileURLToPath, pathToFileURL } from "url"
import path from "path"

const __dirname = path.dirname(fileURLToPath(import.meta.url))
const rootDir = path.resolve(__dirname, '../../../../../..')

export async function loadDistro(distroname:string,user:userEntity){
    const distroPath = path.resolve(rootDir, `dist/usrl/distros/${distroname}/app.distro.js`)
    await verifyDistro(path.resolve(rootDir, `usrl/distros/${distroname}/app.distro.ts`),distroname)
    const distroModule = await import(pathToFileURL(distroPath).href)

    const distro = distroModule.default
    const distroInstance = new distro(user)

    distroInstance.__bases = await loadBases(distroInstance.__bases_location,distroname);
    distroInstance.__distro_name = distroname
    return distroInstance
}