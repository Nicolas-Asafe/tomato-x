import { key } from "../../../shared/validator_keys/key.entity";
import { validatorKeys } from "../../../shared/validator_keys/validator";
import { manifest } from "./manifest.entity";

export function manifestParse(manifest:manifest){
    const manifestValidKeys:key[] = [
        {name:"author",type:"string"},
        {name:"version",type:"string"},
        {name:"distros",type:"object"},
        {name:"distros_config",type:"object"},
        {name:"port",type:"number"},
        {name:"render_directory",type:"string"},   
    ]
    const valid = validatorKeys(manifestValidKeys,manifest,"TomatoManifestParse")
    if(valid?.ok == false) return valid;
    return valid
}