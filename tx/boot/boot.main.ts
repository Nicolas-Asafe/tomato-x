import { runHttp } from "../infra/http/run.http"
import { renderRoutes } from "./router/renderRoutes/renderRoutes.router"
import { loadDistros } from "./loader/distros/distros.loader"
import { declareRoutes } from "./router/declareRoutes/declare.routes"
import { loadManifest } from "./loader/manifest/manifest.loader"
import { loadEngine } from "./loader/engine/engine.loader"
import { Application } from "express"
import express from "express"
import { userEntity } from "../distros_tools/entitys/user.entity"
import { events } from "tx/events/events"

export async function boot(nameProject: string) {
    const start = process.hrtime.bigint() 
    events.emit("boot","STARTING",{})
    const server: Application = express()
    server.use(express.json())
    const engine = await loadEngine()
    const project = engine.projectToLoad ?? nameProject
    const pathProject =
    `./usrl/projects/${project}`
    const [manifest] = await Promise.all([
        loadManifest(pathProject),
    ])
    let user = {
        manifest:manifest,
        engine:engine,
        server:server,
        projectPath:pathProject,
    } as userEntity
    const [routesDeclared, distros] = await Promise.all([
        declareRoutes(user),
        loadDistros(user),
    ])
    user.routes = routesDeclared
    user.distros = distros
    if (manifest.logProject) {
        console.log(`====================== PROJECT_${project} ======================`)
        console.log(`ENGINE= { v: '${engine.version}', nv: '${engine.name_version}' }`)
        console.log(
            "DISTROS=",
            distros.map(d => ({ n: d.__distro_name, v: d.__version }))
        )
        console.log(
            "ROUTES=",
            routesDeclared.map(r => ({ p: r.path, m: r.method, b: r.base }))
        )
        console.log(`GLOBAL= ${user.global ?? "empty"}`)
        console.log(`PROJECT PATH= ${user.projectPath}`)
        console.log("===================================================================")
    }

    renderRoutes(server, user, routesDeclared, distros)
    runHttp(manifest, server)

    const end = process.hrtime.bigint() 
    const ms = Number(end - start) / 1_000_000

    console.log(`boot time: ${ms.toFixed(2)} ms.`)
    events.emit("boot","RUNNING",{msToLoad:ms})
    for (const sig of ["SIGINT", "SIGTERM"]) {
    process.on(sig, () => {
        events.emit("boot", "FINISH", { signal: sig })
        process.exit()
    })
}}
