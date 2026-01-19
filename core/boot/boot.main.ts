import { runHttp } from "../infra/http/run.http";
import { server } from "../infra/http/server";
import { manifest } from "./loader/manifest/manifest.entity";
import { loadManifest } from "./loader/manifest/manifest.loader";
import { walkerRouter } from "./router/walker.router";

export async function boot(nameProject:string){
    const pathProject = `./userland/projects/${nameProject}`
    const manifestResponse = await loadManifest(pathProject)
    const manifest:manifest = manifestResponse.details.manifest
    await walkerRouter(server, `${pathProject}/${manifest.render_directory}`)
    runHttp(manifest,server)
}