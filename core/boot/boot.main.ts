import { runHttp } from "../infra/http/run.http";
import { userEntity } from "./distros_tools/entitys/user.entity";
import { loadDistros } from "./loader/distros/distros.loader";
import { manifestEntity } from "./loader/manifest/manifest.entity";
import { loadManifest } from "./loader/manifest/manifest.loader";
import { routeEntity } from "./loader/route/route.entity";
import { declareRoutes } from "./router/declareRoutes/declare.routes";
import { renderRoutes } from "./router/renderRoutes/renderRoutes.router";
import { loadEngine } from "./loader/engine/engine.loader";
import { engineEntity } from "./loader/engine/engine.entity";
import express from "express"
import { distroEntity } from "./loader/distros/distro.entity";
const server = express()
server.use(express.json())

export async function boot(nameProject:string){
    let user = {} as userEntity
    const pathProject = `./usrl/projects/${nameProject}`
    const manifest:manifestEntity = await loadManifest(pathProject)
    const engine:engineEntity = await loadEngine()
    
    user.manifest = manifest
    user.engine = engine
    user.projectPath = pathProject
    user.server = server

    const routesDeclared:routeEntity[] = await declareRoutes(user)
    user.routes = routesDeclared

    const distros:distroEntity[] = await loadDistros(user)
    user.distros = distros

    await renderRoutes(server,user,routesDeclared,distros)
    runHttp(manifest,server)
}