import type { baseEntity } from "./base.entity.js";
import fs from "fs/promises";
import path from "path";
import { pathToFileURL } from "url";

export async function loadBases(
  location: string,
  distroname: string
): Promise<baseEntity[]> {
  const dir = await fs.readdir(location, { withFileTypes: true });
  const loaders: Promise<baseEntity>[] = [];

  for (const d of dir) {
    if (!d.isFile() || !d.name.endsWith(".base.js")) continue;

    const basePath = path.resolve(location, d.name);

    loaders.push(
      import(pathToFileURL(basePath).href).then((mod) => {
        const base: baseEntity = new mod.default();
        base.distro = distroname;
        base.location = location;
        return base;
      })
    );
  }

  return Promise.all(loaders);
}
