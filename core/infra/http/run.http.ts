import { Application } from "express";
import { manifestEntity } from "../../boot/loader/manifest/manifest.entity";


export function runHttp(manifest_api: manifestEntity, application: Application) {
    const manifest: manifestEntity = manifest_api
    try {
        application.listen(manifest.port, () => console.log(`API listening on http://localhost:${manifest.port}`))
    } catch (err) {
        console.log(`Error to listening API on http://localhost:${manifest.port}, err: ${err.message}`)
    }
}