import { statfs } from "node:fs/promises";

export async function verifyManifestExists(pathManifest:string){
    try{
        await statfs(pathManifest)
    }catch(err){
        throw new Error(`Manifest not found in root project; err:${err.message}`)
    }
}