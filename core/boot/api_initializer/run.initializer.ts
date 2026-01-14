import { Application } from "express";
import { success } from "../../shared/loggers/success/success.entity";
import { manifest } from "../loader/manifest/manifest.entity";
import { toConsole } from "../../shared/loggers/logger";
import { codes } from "../../shared/codes";

export function runApi(manifest_api: manifest, application: Application) {
    const manifest: manifest = manifest_api
    application.listen(manifest.port, () => {
        toConsole(
            {
                code: codes.API_LISTENING,
                ok: true
            },
            "TomatoRunApi",
            `API listening on http://localhost:${manifest.port}`
        );

    })
}