import { routeEntity } from "../loader/route/route.entity";
import { Request,Response,Express } from "express";
import { findBaseOfDistro } from "./findBase.router";
import { successEntity } from "../../shared/loggers/success/success.entity";
import { toConsole } from "../../shared/loggers/logger";
import { createCtx } from "./createCtx.router";
import { userEntity } from "../distros_tools/entitys/user.entity";

export function useRoute(
    app: Express,
    route: routeEntity,
    distros: any[],
    user: userEntity,
) {
    const method = route.method.toLowerCase() as keyof Express;
    app[method](route.path, (req: Request, res: Response) => {       
        route.baseInstance.setCtx(createCtx(req,res,user.manifest,route))
        const baseExecuted:successEntity = route.baseInstance.exec()
        if (!baseExecuted.ok){ 
            toConsole(baseExecuted,`${baseExecuted.details.where}`,`error to execute base: ${baseExecuted.details.error}`)
            return;
        }
        toConsole(baseExecuted,`${baseExecuted.details.where}`,`base executed: ${baseExecuted.details.message}`)
    });
}

