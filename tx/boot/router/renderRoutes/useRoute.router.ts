import { routeEntity } from "../../loader/route/route.entity";
import { Request, Response, Express, Application } from "express";
import { ctxEntity } from "tx/distros_tools/entitys/ctx.entity";
import { userEntity } from "tx/distros_tools/entitys/user.entity";
import { events } from "tx/events/events";

export function useRoute(
    app: Application,
    route: routeEntity,
    user: userEntity,
) {
    const method = route.method.toLowerCase() as keyof Express;
    app[method](route.path, async (req: Request, res: Response) => {
        const start = process.hrtime.bigint()
        events.emit("routeServer","STARTING",{route:route.path})
        route.baseInstance.setCtx({ manifest: user.manifest, req, res, route })
        await route.baseInstance.exec()
        events.emit("routeServer","RUNNING",{route:route.path})
        const end = process.hrtime.bigint()
        const ms = Number(end - start) / 1_000_000
        process.stdout.write(`[the resquest of ${route.path} (${route.method}) took ${ms.toFixed(2)}ms].\n`)
        events.emit("routeServer","FINISH",{route:route.path})
    });
}

