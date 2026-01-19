import {userEntity} from "../../../distros_tools/entitys/user.entity"
import { loadBases } from "./loadBases"
export async function loadDistro(distroname:string,user:userEntity){
    const path = `./userland/distros/${distroname}/app.distro.ts`
    const distroModule = await import(path)
    const Distro = distroModule.default
    const instance = new Distro(user)
    instance.__user = user
    instance.__bases = await loadBases(instance.__bases_location);
    return instance
}