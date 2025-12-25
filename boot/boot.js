import { init_api } from "./init_api.js"
import { recept_manifest } from "./recept_manifest.js"

export const boot = async () =>{
    init_api(await recept_manifest())
}