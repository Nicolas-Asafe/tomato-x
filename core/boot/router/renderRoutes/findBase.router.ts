import { codes } from "../../../shared/codes"
import { fail } from "../../../shared/loggers/logger"
import { successEntity } from "../../../shared/loggers/success/success.entity"
import { distroEntity } from "../../loader/distros/distro.entity"

export function findBaseOfDistro(distros:distroEntity[],base:string):successEntity{
    const distroName = base.split(":")[0]
    const baseName = base.split(":")[1]
    const distroInstace = distros.find(d=>d.__distro_name == distroName)
    if (!distroInstace) return fail({code:codes.DISTRO_NOT_FOUND,ok:false,details:{error:{message:`the distro '${distroName}' not exists`}}})
    const baseClass = distroInstace.__bases.find(b=>b.__name == baseName)
    if (!baseClass) return fail({code:codes.BASE_NOT_FOUND,ok:false,details:{error:{message:`the base '${base}' not exists`}}})
    return {code:codes.BASE_FOUND,ok:true,details:{baseClass:baseClass}} as successEntity
}