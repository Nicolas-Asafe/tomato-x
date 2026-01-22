import { successEntity } from "core/shared/loggers/success/success.entity"
import {userEntity} from "../../../distros_tools/entitys/user.entity"
import { loadBases } from "../../base/base.loader"
import { verifyDistro } from "./verifyDistro.util"
export async function loadDistro(distroname:string,user:userEntity){
    const path = `usrl/distros/${distroname}/app.distro.ts`
    const distroModuleExists = await verifyDistro(path)
    if (!distroModuleExists.ok) return distroModuleExists;
    const distroModule = await import(path)
    const Distro = distroModule.default
    const instance = new Distro(user)
    instance.__bases = await loadBases(instance.__bases_location,distroname);
    instance.__distro_name = distroname
    return {ok:true,details:{instance:instance}} as successEntity
}