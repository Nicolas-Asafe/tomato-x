import { validatorOfKeys } from "../../../shared/validator_keys/validator.js";
const ROUTE_KEYS = [
    { name: "method", type: "string", required: true },
    { name: "base", type: "string", required: true },
    { name: "params", type: "object", required: true },
    { name: "path", type: "string", required: true },
    { name: "file_path", type: "string", required: true },
];
const METHODS = {
    get: 1,
    post: 1,
    put: 1,
    patch: 1,
    options: 1,
    delete: 1,
};
export function parseRoute(jsonContent) {
    const m = jsonContent.method.toLowerCase();
    if (METHODS[m] !== 1) {
        throw new SyntaxError(`invalid method in route ${jsonContent.file_path} (method invalid:${jsonContent.method})`);
    }
    const base = jsonContent.base;
    if (base.indexOf(":") === -1 ||
        !base.endsWith(".base")) {
        throw new SyntaxError("Base must have this format: '<distro>:<basename>.base'");
    }
    return validatorOfKeys(ROUTE_KEYS, jsonContent, "TomatoParseRoute");
}
//# sourceMappingURL=route.parse.js.map