import { toConsole } from "../shared/loggers/logger";
import { loadManifest } from "./loader/manifest/manifest.loader";

export async function boot(nameProject:string){
    const pathProject = `./userland/projects/${nameProject}`
    const manifest = await loadManifest(pathProject)
    toConsole(manifest,"TomatoBootStrap","Manifest loaded successfully")
}