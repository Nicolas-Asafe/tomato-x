import path from "path";
import { codes } from "../../../shared/codes";
import { success, toConsole } from "../../../shared/loggers/logger";
import { jsonRead } from "../../../shared/read/json.read";
import { manifestParse } from "./manifest.parse";
import { verifyManifestExists } from "./utils/verifyManifestExists.utils";

export async function loadManifest(pathProject: string) {
    const manifestPath = path.join(pathProject, "manifest.json");

    const exists = await verifyManifestExists(manifestPath);
    if (!exists.ok) {
        toConsole(exists, "TomatoManifestExists", exists.details.error.message)
        process.exit(0)
    };

    const readResult = await jsonRead(manifestPath);
    if (!readResult.ok) {
        toConsole(readResult, "TomatoManifestRead", readResult.details.error.message)
        process.exit(0)
    };
    const parseResult = manifestParse(readResult.details.json);
    if (!parseResult.ok) {
        toConsole(parseResult, "TomatoManifestParse", parseResult.details.error.message)
        process.exit(0)
    };

    const manifest = readResult.details.json;
    Object.freeze(manifest);

    return success({
        code: codes.MANIFEST_LOADED,
        details: { manifest },
        ok: true
    });
}
