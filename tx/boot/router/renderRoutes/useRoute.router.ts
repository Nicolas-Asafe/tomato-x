import { routeEntity } from "../../loader/route/route.entity";
import { Request,Response,Express, Application } from "express";
import { userEntity } from "tx/distros_tools/entitys/user.entity";
import { ctxEntity } from "tx/distros_tools/entitys/ctx.entity";

export function useRoute(
    app: Application,
    route: routeEntity,
    user: userEntity,
) {
    const method = route.method.toLowerCase() as keyof Express;
    app[method](route.path, (req: Request, res: Response) => {
        const start = process.hrtime.bigint()
        route.baseInstance.setCtx({manifest:user.manifest,req,res,route})
        route.baseInstance.exec()
        const end = process.hrtime.bigint()
        const ms = Number(end-start) / 1_000_000
        process.stdout.write(`[the resquest of ${route.path} (${route.method}) took ${ms.toFixed(2)}ms].\n`)
    });
}

