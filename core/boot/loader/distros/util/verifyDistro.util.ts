import fs from "fs/promises"
export async function verifyDistro(path:string,distroname:string){
    try{
       await fs.access(path)
    }catch(err){
       throw new Error(`the distro ${distroname} not found`)
    }
}