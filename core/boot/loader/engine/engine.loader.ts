import { toConsole } from "core/shared/loggers/logger";
import { verifyEngineExists } from "./util/verifyEngineExists.util";
import { jsonRead } from "core/shared/read/json.read";
import { failEntity } from "core/shared/loggers/fail/fail.entity";

export async function loadEngine(){
    const path = "./engine_details.json"
    const engineExists = await verifyEngineExists(path)
    if (!engineExists.ok){
        toConsole(engineExists,"TomatoEngineLoader","The engine details file does not exist.");
        return engineExists;
    }
    const engineJsonResponse = await jsonRead(path)
    if (!engineJsonResponse.ok){
        toConsole(engineJsonResponse,"TomatoEngineLoader","Error reading the engine details file.");
        return engineJsonResponse;
    }
    const engine = engineJsonResponse.details.json;
    if (!engine.version || !engine.name_version){
        const errorMsg = "Engine details file requires 'version' and 'name_version' fields.";
        const err = {ok:false,details:{error:errorMsg}} as failEntity;
        toConsole(err,"TomatoEngineLoader",errorMsg);
        return err;
    }
    return engine
}