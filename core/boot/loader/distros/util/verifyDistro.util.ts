import fs from "fs/promises"
import {fail, success} from "../../../../shared/loggers/logger"
import { codes } from "../../../../shared/codes"
export async function verifyDistro(path:string){
    try{
       await fs.access(path)
       return success({code:codes.DISTRO_LOADED,ok:true})
    }catch(err){
       return fail({code:codes.DISTRO_NOT_FOUND,ok:false,details:{error:err}})
    }
}