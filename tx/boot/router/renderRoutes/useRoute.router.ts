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
        const ctx:ctxEntity = {manifest:user.manifest,req,res,route}      
        route.baseInstance.setCtx(ctx)
        route.baseInstance.exec()
    });
}

