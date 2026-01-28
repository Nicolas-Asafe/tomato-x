import { verifyEngineExists } from "./util/verifyEngineExists.util";
import { jsonRead } from "tx/shared/read/json.read";

export async function loadEngine(){
    const path = "./engine_details.json"
    await verifyEngineExists(path)
    const engineJson = await jsonRead(path)
    if (!engineJson.version || !engineJson.name_version || !engineJson.projectToLoad){
        throw new Error("engine details file requires 'version','name_version' and 'projectToLoad' fields.")
    }
    return engineJson
}