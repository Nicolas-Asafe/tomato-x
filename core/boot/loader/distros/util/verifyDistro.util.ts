import fs from "fs/promises"
import {fail} from "../../../../shared/loggers/logger"
import { codes } from "../../../../shared/codes"
export async function verifyDistro(path:string){
    try{
       await fs.access(path)
    }catch(err){
        return fail({code:codes.DISTRO_NOT_FOUND,ok:false,details:{error:err}})
    }
}