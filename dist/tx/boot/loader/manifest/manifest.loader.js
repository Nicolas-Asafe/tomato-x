import path from "path";
import { jsonRead } from "../../../shared/read/json.read.js";
import { manifestParse } from "./manifest.parse.js";
import { verifyManifestExists } from "./utils/verifyManifestExists.utils.js";
export async function loadManifest(pathProject) {
    const manifestPath = path.join(pathProject, "manifest.json");
    await verifyManifestExists(manifestPath);
    const manifestJson = await jsonRead(manifestPath);
    manifestParse(manifestJson);
    return manifestJson;
}
//# sourceMappingURL=manifest.loader.js.map