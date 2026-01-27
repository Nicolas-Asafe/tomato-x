import { verifyEngineExists } from "./util/verifyEngineExists.util";
import { jsonRead } from "core/shared/read/json.read";

export async function loadEngine(){
    const path = "./engine_details.json"
    await verifyEngineExists(path)
    const engineJson = await jsonRead(path)
    if (!engineJson.version || !engineJson.name_version){
        throw new Error("Engine details file requires 'version' and 'name_version' fields.")
    }
    return engineJson
}