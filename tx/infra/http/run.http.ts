import { Application } from "express";
import { manifestEntity } from "../../boot/loader/manifest/manifest.entity";


export function runHttp(manifest: manifestEntity, application: Application) {
    try {
        application.listen(
            manifest.port, 
            () => console.log(`api of ${manifest.author} listening on http://localhost:${manifest.port}`))
    } catch (err) {
        console.log(`Error to listening API on http://localhost:${manifest.port}, err: ${err.message}`)
    }
}