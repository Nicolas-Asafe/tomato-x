import { init_api } from "./init_api.js"

export const boot = async (projectname) =>{
    if (!projectname) throw new Error("Project name is required")
    await init_api(projectname)
}