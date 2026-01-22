import { runHttp } from "../infra/http/run.http";
import { server } from "../infra/http/server";
import { userEntity } from "./distros_tools/entitys/user.entity";
import { loadDistros } from "./loader/distros/distros.loader";
import { manifestEntity } from "./loader/manifest/manifest.entity";
import { loadManifest } from "./loader/manifest/manifest.loader";
import { renderRoutes } from "./router/renderRoutes.router";

export async function boot(nameProject:string){
    const pathProject = `./usrl/projects/${nameProject}`
    const manifestResponse = await loadManifest(pathProject)
    const manifest:manifestEntity = manifestResponse.details.manifest
    let user = {} as userEntity
    user["manifest"] = manifest
    user["projectPath"] = pathProject
    user["server"] = server
    const loadDistroResponse = await loadDistros(user)
    const distros = loadDistroResponse.details.distros
    user["distros"] = distros
    const routes = await renderRoutes(server,manifest,user,distros)
    user["routes"] = routes
    runHttp(manifest,server)
}