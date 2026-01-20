import { Application } from "express";
import { manifest } from "../../boot/loader/manifest/manifest.entity";
import { success, toConsole } from "../../shared/loggers/logger";
import { codes } from "../../shared/codes";

export function runHttp(manifest_api: manifest, application: Application) {
    const manifest: manifest = manifest_api
    try {
        application.listen(manifest.port, () => {
            toConsole({ code: codes.API_LISTENING, ok: true }, "TomatoRunApi", `API listening on http://localhost:${manifest.port}`);
        })
    } catch (err) {
        toConsole({ code: codes.ERROR_TO_LISTENING_API, ok: false, }, "TomatoRunApi", `Error to listening API on http://localhost:${manifest.port}`);
    }
}