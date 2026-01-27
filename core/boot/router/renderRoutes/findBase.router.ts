import { distroEntity } from "../../loader/distros/distro.entity"

export function findBaseOfDistro(distros:distroEntity[],base:string){
    const distroName = base.split(":")[0]
    const baseName = base.split(":")[1]

    const distroInstace = distros.find(d=>d.__distro_name == distroName)
    if (!distroInstace) throw new Error(`the distro '${distroName}' not exists`)

    const baseClass = distroInstace.__bases.find(b=>b.__name == baseName)
    if (!baseClass) throw new Error(`the base '${base}' not exists`)
        
    return baseClass
}