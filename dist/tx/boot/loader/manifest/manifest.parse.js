import { validatorOfKeys } from "../../../shared/validator_keys/validator.js";
export function manifestParse(manifest) {
    const manifestValidKeys = [
        { name: "author", type: "string", required: true },
        { name: "version", type: "string", required: true },
        { name: "port", type: "number", required: true },
        { name: "render_directory", type: "string", required: true },
        { name: "logProject", type: "boolean", required: true }
    ];
    validatorOfKeys(manifestValidKeys, manifest, "TomatoManifestParse");
}
//# sourceMappingURL=manifest.parse.js.map