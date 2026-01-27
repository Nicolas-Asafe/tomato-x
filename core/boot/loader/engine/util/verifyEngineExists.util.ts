import { statfs } from "node:fs/promises";

export async function verifyEngineExists(pathEngine:string){
    try{
        await statfs(pathEngine)
    }catch(err){
        throw new Error("engine details not found in root")
    }
}