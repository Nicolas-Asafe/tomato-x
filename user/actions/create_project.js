import fs from "fs/promises"
import path from "path"

export default async function createProject(nameproject = "") {
  try {
    if (!nameproject.trim()) {
      throw new Error("Project name is required")
    }
 
    if (nameproject.includes("."))
      throw new Error("Project name cannot contain '.'")

    if (nameproject.includes("/"))
      throw new Error("Project name cannot contain '/'")

    const basePath = path.join(process.cwd(), "user","projects", nameproject)

    try {
      await fs.access(basePath)
      console.log("Project detected")
      return
    } catch {
    }

    await fs.mkdir(basePath, { recursive: true })

    await fs.writeFile(
      path.join(basePath, "package.json"),
      JSON.stringify(
        {
          scripts: {
            start: "node ../../../main.js"
          }
        },
        null,
        2
      )
    )

    await fs.writeFile(
      path.join(basePath, "manifest.json"),
      JSON.stringify(
        {
          port: 8000,
          running_message: "Server running in port 8000",
          author: nameproject,
          rendered_directory: "./",
          distros:["generic"]
        },
        null,
        2
      )
    )

    console.log(`Project '${nameproject}' created successfully`)
  } catch (error) {
    console.error("Error creating project:", error.message)
  }
}
