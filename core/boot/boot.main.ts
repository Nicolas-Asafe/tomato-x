import { jsonRead } from "core/shared/read/json.read";
import { runHttp } from "../infra/http/run.http";
import { server } from "../infra/http/server";
import { userEntity } from "./distros_tools/entitys/user.entity";
import { loadDistros } from "./loader/distros/distros.loader";
import { manifestEntity } from "./loader/manifest/manifest.entity";
import { loadManifest } from "./loader/manifest/manifest.loader";
import { routeEntity } from "./loader/route/route.entity";
import { declareRoutes } from "./router/declareRoutes/declare.routes";
import { renderRoutes } from "./router/renderRoutes/renderRoutes.router";
import { loadEngine } from "./loader/engine/engine.loader";
import { engineEntity } from "./loader/engine/engine.entity";

export async function boot(nameProject:string){
    let user = {} as userEntity
    const pathProject = `./usrl/projects/${nameProject}`
    const manifestResponse = await loadManifest(pathProject)
    const manifest:manifestEntity = manifestResponse.details.manifest
    const engine:engineEntity = await loadEngine()
    user.manifest = manifest
    user.engine = engine
    user.projectPath = pathProject
    user.server = server
    const routesDeclared:routeEntity[] = await declareRoutes(user)
    user.routes = routesDeclared
    const loadDistroResponse = await loadDistros(user)
    const distros = loadDistroResponse.details.distros
    user.distros = distros
    await renderRoutes(server,user,routesDeclared,distros)
    runHttp(manifest,server)
}