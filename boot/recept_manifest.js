import path from "path";
import { fileURLToPath } from "url";
import {readJSON} from "../util/readjson.js";
const __dirname = path.dirname(fileURLToPath(import.meta.url));

export const recept_manifest= async () => {
  const manifestPath = path.join(__dirname, "../user/projects/manifest.json");
  const manifest = await readJSON(manifestPath);
  return manifest;
}
