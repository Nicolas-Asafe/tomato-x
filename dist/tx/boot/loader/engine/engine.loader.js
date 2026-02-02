import { verifyEngineExists } from "./util/verifyEngineExists.util.js";
import { jsonRead } from "../../../shared/read/json.read.js";
export async function loadEngine() {
    const path = "./engine_details.json";
    await verifyEngineExists(path);
    const engineJson = await jsonRead(path);
    if (!engineJson.version || !engineJson.name_version || !engineJson.projectToLoad) {
        throw new Error("engine details file requires 'version','name_version' and 'projectToLoad' fields.");
    }
    return engineJson;
}
//# sourceMappingURL=engine.loader.js.map