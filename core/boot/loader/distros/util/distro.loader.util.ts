import {userEntity} from "../../../distros_tools/entitys/user.entity"
import { loadBases } from "../../base/base.loader"
import { verifyDistro } from "./verifyDistro.util"

export async function loadDistro(distroname:string,user:userEntity){
    const distroPath = `usrl/distros/${distroname}/app.distro.ts`
    await verifyDistro(distroPath,distroname)
    const distroModule = await import(distroPath)

    const distro = distroModule.default
    const distroInstance = new distro(user)

    distroInstance.__bases = await loadBases(distroInstance.__bases_location,distroname);
    distroInstance.__distro_name = distroname
    return distroInstance
}