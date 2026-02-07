import { runHttp, server } from "../infra/tmxhttp/run.http.js"
import { renderRoutes } from "./router/renderRoutes/renderRoutes.router.js"
import { loadDistros } from "./loader/distros/distros.loader.js"
import { declareRoutes } from "./router/declareRoutes/declare.routes.js"
import { loadManifest } from "./loader/manifest/manifest.loader.js"
import { loadEngine } from "./loader/engine/engine.loader.js"
import type { userEntity } from "../distros_tools/entitys/user.entity.js"
import { events } from "../events/events.js"
import type { engineEntity } from "./loader/engine/engine.entity.js"
import type { manifestEntity } from "./loader/manifest/manifest.entity.js"
import type { distroEntity } from "./loader/distros/distro.entity.js"

export async function boot() {
    const start = process.hrtime.bigint() 
    events.emit("boot","STARTING",{})

    const engine:engineEntity = await loadEngine()
    const pathProject = `./usrl/projects/${engine.projectToLoad}/`

    const manifest:manifestEntity = await loadManifest(pathProject)

    const renderDirectory = pathProject + manifest.render_directory;
    const routesDeclared = await declareRoutes(renderDirectory)

    const user:userEntity = {
        engine:engine,
        server:server,
        projectPath:pathProject,
        render_directory:renderDirectory,
        manifest:manifest,
        routes:routesDeclared
    }

    const distros = await loadDistros(user)
    
    projectLogger(user,distros)
    renderRoutes(user, routesDeclared, distros)
    runHttp(manifest)

    const end = process.hrtime.bigint() 
    const ms = Number(end - start) / 1_000_000

    process.stdout.write(`boot time: ${ms.toFixed(2)}ms ${Number(ms.toFixed(2))<=26.00?":>":":<"}\n`)
    events.emit("boot","RUNNING",{msToLoad:ms})
}

function projectLogger(user:userEntity,distros:distroEntity[]){
    if (user.manifest.logProject) {
        console.log(`====================== PROJECT_${user.engine.projectToLoad} ======================`)
        console.log(`ENGINE= { v: '${user.engine.version}', nv: '${user.engine.name_version}' }`)
        console.log(
            "DISTROS=",
            distros.map((d: any) => ({ n: d.__distro_name, v: d.__version }))
        )
        console.log(
            "ROUTES=",
            user.routes.map((r: any) => ({ p: r.path, m: r.method, b: r.base }))
        )
        console.log(`GLOBAL= ${user.global ?? "empty"}`)
        console.log(`PROJECT PATH= ${user.projectPath}`)
        console.log("===================================================================")
    }
}