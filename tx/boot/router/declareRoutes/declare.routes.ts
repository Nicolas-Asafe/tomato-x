import { userEntity } from "tx/distros_tools/entitys/user.entity";
import { walkerRouter } from "./walker.router";

export async function declareRoutes(user:userEntity){
    let path:string = `${user.projectPath}${user.manifest.render_directory}`
    return  await walkerRouter(user.server,path)
}