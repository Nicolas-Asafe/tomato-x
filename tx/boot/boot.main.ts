import { runHttp } from "../infra/http/run.http";
import { userEntity } from "../distros_tools/entitys/user.entity";
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

export async function boot(nameProject: string) {
    let user = {} as userEntity
    const engine: engineEntity = await loadEngine()
    const pathProject = `./usrl/projects/${engine.projectToLoad?engine.projectToLoad:nameProject}`
    const manifest: manifestEntity = await loadManifest(pathProject)

    user.manifest = manifest
    user.engine = engine
    user.projectPath = pathProject
    user.server = server

    const routesDeclared: routeEntity[] = await declareRoutes(user)
    user.routes = routesDeclared

    const distros: distroEntity[] = await loadDistros(user)
    user.distros = distros
    if (manifest.logProject) {
        console.log(`======================PROJECT_${nameProject}==========================`)
        console.log(`ENGINE= {v: '${engine.version}' nv: '${engine.name_version}'}`)
        console.log("DISTROS= "+distros.map(d => `\n{n:'${d.__distro_name}',v:'${d.__version}'}\n`))
        console.log(`ROUTES= ${user.routes.map(r => `\n{p:'${r.path}',m:'${r.method}'}\n`)}`)
        console.log(`GLOBAL= {${user.global || "empty"}}`)
        console.log(`PROJECT PATH= ${user.projectPath}`)
        console.log("==============================================================")
    }
    await renderRoutes(server, user, routesDeclared, distros)
    runHttp(manifest, server)
}