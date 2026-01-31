import { baseEntity } from "./base.entity"
import fs from "fs/promises"

export async function loadBases(
  location: string,
  distroname: string
): Promise<baseEntity[]> {

  const dir = await fs.readdir(location, { withFileTypes: true })

  const loaders = []

  for (let i = 0; i < dir.length; i++) {
    const d = dir[i]
    if (d.isFile() && d.name.endsWith(".base.ts")) {
      loaders.push(
        import(`../../../../${location}${d.name}`).then(mod => {
          const base: baseEntity = new mod.default()
          base.distro = distroname
          base.location = location
          return base
        })
      )
    }
  }

  return Promise.all(loaders)
}