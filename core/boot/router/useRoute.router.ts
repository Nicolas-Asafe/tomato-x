import { ctxEntity } from "../distros_tools/entitys/ctx.entity";
import { routeEntity } from "../loader/route/route.entity";
import { Request,Response,Express } from "express";
import { manifestEntity } from "../loader/manifest/manifest.entity";
import { findBaseOfDistro } from "./findBase.router";
import { successEntity } from "../../shared/loggers/success/success.entity";
import { toConsole } from "../../shared/loggers/logger";
import { createCtx } from "./createCtx.router";

export function useRoute(
    app: Express,
    route: routeEntity,
    distros: any[],
    manifest: manifestEntity,
) {
    const method = route.method.toLowerCase() as keyof Express;
    app[method](route.path, (req: Request, res: Response) => {       
        const baseClass = findBaseOfDistro(distros,route.base).details.baseClass
        baseClass.ctx = createCtx(req,res,manifest,route)
        const baseExecuted:successEntity = baseClass.exec()
        if (!baseExecuted.ok){ 
            toConsole(baseExecuted,`${baseExecuted.details.where}`,`error to execute base: ${baseExecuted.details.error}`)
            return;
        }
        toConsole(baseExecuted,`${baseExecuted.details.where}`,`base executed: ${baseExecuted.details.message}`)
    });
}

