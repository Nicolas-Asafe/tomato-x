import { key } from "../../../shared/validator_keys/key.entity";
import { validatorOfKeys } from "../../../shared/validator_keys/validator";
import { manifestEntity } from "./manifest.entity";

export function manifestParse(manifest:manifestEntity){
    const manifestValidKeys:key[] = [
        {name:"author",type:"string"},
        {name:"version",type:"string"},
        {name:"port",type:"number"},
        {name:"render_directory",type:"string"},
        {name:"logProject",type:"boolean"}
    ]
    validatorOfKeys(manifestValidKeys,manifest,"TomatoManifestParse")
}