import { toConsole } from "../shared/loggers/logger";
import { runApi } from "./api_initializer/run.initializer";
import { app } from "./api_initializer/server";
import { loadManifest } from "./loader/manifest/manifest.loader";

export async function boot(nameProject:string){
    const pathProject = `./userland/projects/${nameProject}`
    const manifestResponse = await loadManifest(pathProject)
    const manifest = manifestResponse.details.manifest
    runApi(manifest,app)
}