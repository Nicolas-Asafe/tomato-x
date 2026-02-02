import http from "http";
export const routes = new Map();
export const server = http.createServer((req, res) => {
    const key = `${req.method} ${req.url}`;
    const handler = routes.get(key);
    if (!handler) {
        res.statusCode = 404;
        return res.end("not found");
    }
    handler(req, res);
});
export function runHttp(manifest) {
    try {
        server.listen(manifest.port, () => process.stdout.write(`api of ${manifest.author} listening on http://localhost:${manifest.port} \n`));
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        process.stdout.write(`Error to listening API on http://localhost:${manifest.port}, err: ${message} \n`);
    }
}
//# sourceMappingURL=run.http.js.map