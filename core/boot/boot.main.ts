import { runHttp } from "../infra/http/run.http";
import { server } from "../infra/http/server";
import { userEntity } from "./distros_tools/entitys/user.entity";
import { loadDistros } from "./loader/distros/distros.loader";
import { manifestEntity } from "./loader/manifest/manifest.entity";
import { loadManifest } from "./loader/manifest/manifest.loader";
import { walkerRouter } from "./router/walker.router";

export async function boot(nameProject:string){
    const pathProject = `./userland/projects/${nameProject}`
    const manifestResponse = await loadManifest(pathProject)
    const manifest:manifestEntity = manifestResponse.details.manifest
    const user:userEntity = {manifest:manifest}
    const loadDistroResponse = await loadDistros(user)
    const distros = loadDistroResponse.details.distros
    await walkerRouter(server, `${pathProject}/${manifest.render_directory}`,distros,user)
    runHttp(manifest,server)
}