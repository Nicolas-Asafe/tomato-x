import path from "path";
import { jsonRead } from "../../../shared/read/json.read";
import { manifestParse } from "./manifest.parse";
import { verifyManifestExists } from "./utils/verifyManifestExists.utils";

export async function loadManifest(pathProject: string) {
    const manifestPath = path.join(pathProject, "manifest.json");
    await verifyManifestExists(manifestPath);

    const manifestJson = await jsonRead(manifestPath);
    manifestParse(manifestJson);
    Object.freeze(manifestJson);
    return manifestJson
}
