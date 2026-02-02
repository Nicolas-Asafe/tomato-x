import { routes } from "../../../infra/tmxhttp/run.http.js";
export function useRoute(route, user) {
    const method = route.method.toUpperCase();
    const key = `${method} ${route.path}`;
    routes.set(key, async (req, res) => {
        const start = process.hrtime.bigint();
        try {
            route.baseInstance.setCtx({
                manifest: user.manifest,
                req,
                res,
                route,
            });
            await route.baseInstance.exec();
        }
        catch (err) {
            res.statusCode = 500;
            res.end("internal server error");
            return;
        }
        finally {
            if (process.env.NODE_ENV !== "production") {
                const ms = Number(process.hrtime.bigint() - start) / 1_000_000;
                process.stdout.write(`request ${method} ${route.path} took ${ms.toFixed(2)}ms. \n`);
            }
        }
    });
}
//# sourceMappingURL=useRoute.router.js.map