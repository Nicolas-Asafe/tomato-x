import type { Application,Request,Response } from "express";
import type { routeEntity } from "../../loader/route/route.entity.js";
import type { userEntity } from "../../../distros_tools/entitys/user.entity.js";
import { events } from "../../../events/events.js";

type HttpMethod =
  | "get"
  | "post"
  | "put"
  | "delete"
  | "patch"
  | "options"
  | "head";

export function useRoute(
  app: Application,
  route: routeEntity,
  user: userEntity
) {
  const method = route.method.toLowerCase() as HttpMethod;

  app[method](route.path, async (req: Request, res: Response, next) => {
    const start = process.hrtime.bigint();

    try {
      events.emit("routeServer", "STARTING", { route: route.path });

      route.baseInstance.setCtx({
        manifest: user.manifest,
        req,
        res,
        route,
      });

      await route.baseInstance.exec();

      events.emit("routeServer", "RUNNING", { route: route.path });
    } catch (err) {
      return next(err);
    } finally {
      const end = process.hrtime.bigint();
      const ms = Number(end - start) / 1_000_000;

      if (process.env.NODE_ENV !== "production") {
        console.log(
          `request ${route.method} ${route.path} took ${ms.toFixed(2)}ms.`
        );
      }

      events.emit("routeServer", "FINISH", { route: route.path });
    }
  });
}
