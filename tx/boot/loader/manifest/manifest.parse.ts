import type { key } from "../../../shared/validator_keys/key.entity.js";
import { validatorOfKeys } from "../../../shared/validator_keys/validator.js";
import type { manifestEntity } from "./manifest.entity.js";

export function manifestParse(manifest:manifestEntity){
    const manifestValidKeys:readonly key[] = [
        {name:"author",type:"string",required:true},
        {name:"version",type:"string",required:true},
        {name:"port",type:"number",required:true},
        {name:"render_directory",type:"string",required:true},
        {name:"logProject",type:"boolean",required:true}
    ]
    validatorOfKeys(manifestValidKeys,manifest,"TomatoManifestParse")
}