import { runHttp } from "../infra/http/run.http.js"
import { renderRoutes } from "./router/renderRoutes/renderRoutes.router.js"
import { loadDistros } from "./loader/distros/distros.loader.js"
import { declareRoutes } from "./router/declareRoutes/declare.routes.js"
import { loadManifest } from "./loader/manifest/manifest.loader.js"
import { loadEngine } from "./loader/engine/engine.loader.js"
import type { Application } from "express"
import express from "express"
import type { userEntity } from "../distros_tools/entitys/user.entity.js"
import { events } from "../events/events.js"

export async function boot(nameProject: string) {
    const start = process.hrtime.bigint() 
    events.emit("boot","STARTING",{})
    const server: Application = express()
    server.use(express.json())
    const engine = await loadEngine()
    const project = engine.projectToLoad ?? nameProject
    const pathProject =
    `./usrl/projects/${project}`
    let user = {
        engine:engine,
        server:server,
        projectPath:pathProject,
        render_directory:""
    } as userEntity
    const [manifest,routesDeclared, distros] = await Promise.all([
        loadManifest(pathProject),
        declareRoutes(user),
        loadDistros(user),
    ])
    user = {...user, routes:routesDeclared,distros:distros,manifest:manifest}
    if (manifest.logProject) {
        console.log(`====================== PROJECT_${project} ======================`)
        console.log(`ENGINE= { v: '${engine.version}', nv: '${engine.name_version}' }`)
        console.log(
            "DISTROS=",
            distros.map((d: any) => ({ n: d.__distro_name, v: d.__version }))
        )
        console.log(
            "ROUTES=",
            routesDeclared.map((r: any) => ({ p: r.path, m: r.method, b: r.base }))
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
