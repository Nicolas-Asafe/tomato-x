import { statfs } from "node:fs/promises";
export async function verifyManifestExists(pathManifest) {
    try {
        await statfs(pathManifest);
    }
    catch (err) {
        const message = err instanceof Error ? err.message : String(err);
        throw new Error(`Manifest not found in root project; err:${message}`);
    }
}
//# sourceMappingURL=verifyManifestExists.utils.js.map