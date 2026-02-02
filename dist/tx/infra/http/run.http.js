export function runHttp(manifest, application) {
    try {
        application.listen(manifest.port, () => process.stdout.write(`api of ${manifest.author} listening on http://localhost:${manifest.port} \n`));
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        process.stdout.write(`Error to listening API on http://localhost:${manifest.port}, err: ${message} \n`);
    }
}
//# sourceMappingURL=run.http.js.map