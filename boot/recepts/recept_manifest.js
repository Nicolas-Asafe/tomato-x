import path from "path";
import { fileURLToPath } from "url";
import { readJSON } from "../../util/readjson.js";
import { manifest } from "../../models/manifest.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const recept_manifest = async (projectname) => {
  const manifestPath = path.join(__dirname, "../../user/projects/" + projectname + "/manifest.json");
  const data = await readJSON(manifestPath);
 
  return new manifest(
    data.port ?? null,
    data.author ?? null,
    data.hello_route ?? null,
    data.running_message ?? null,
    data.rendered_directory ?? null,
    data.distros ?? []
  );
}
