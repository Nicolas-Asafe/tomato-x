import { statfs } from "node:fs/promises";
import { codes } from "../../../../shared/codes";
import { success,fail } from "../../../../shared/loggers/logger";

export async function verifyManifestExists(pathManifest:string){
    try{
        await statfs(pathManifest)
        return success({code:codes.MANIFEST_FOUND,ok:true})
    }catch(err){
        return fail({code:codes.MANIFEST_NOT_FOUND,ok:false,details:{error:err}})
    }
}