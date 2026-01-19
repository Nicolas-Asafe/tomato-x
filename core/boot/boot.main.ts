import { runHttp } from "../infra/http/run.http";
import { server } from "../infra/http/server";
import { userEntity } from "./distros_tools/entitys/user.entity";
import { loadDistros } from "./loader/distros/distros.loader";
import { manifest } from "./loader/manifest/manifest.entity";
import { loadManifest } from "./loader/manifest/manifest.loader";
import { walkerRouter } from "./router/walker.router";

export async function boot(nameProject:string){
    const pathProject = `./userland/projects/${nameProject}`
    const manifestResponse = await loadManifest(pathProject)
    const manifest:manifest = manifestResponse.details.manifest
    const user:userEntity = {manifest:manifest}
    const distros = loadDistros(user)
    await walkerRouter(server, distros, `${pathProject}/${manifest.render_directory}`)
    runHttp(manifest,server)
}