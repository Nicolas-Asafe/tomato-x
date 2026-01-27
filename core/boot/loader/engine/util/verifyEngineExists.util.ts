import { statfs } from "node:fs/promises";
import { codes } from "../../../../shared/codes";
import { success,fail } from "../../../../shared/loggers/logger";

export async function verifyEngineExists(pathEngine:string){
    try{
        await statfs(pathEngine)
        return success({code:codes.ENGINE_FOUND,ok:true})
    }catch(err){
        return fail({code:codes.ENGINE_NOT_FOUND,ok:false,details:{error:"engine details not found in root"}})
    }
}