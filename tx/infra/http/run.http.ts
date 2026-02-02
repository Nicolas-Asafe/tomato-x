import type { Application } from "express";
import type { manifestEntity } from "../../boot/loader/manifest/manifest.entity.js";


export function runHttp(manifest: manifestEntity, application: Application) {
    try {
        application.listen(
            manifest.port, 
            () => console.log(`api of ${manifest.author} listening on http://localhost:${manifest.port}`))
    } catch (err) {
        const message = err instanceof Error ? err.message : String(err)
        console.log(`Error to listening API on http://localhost:${manifest.port}, err: ${message}`)
    }
}