import { userEntity } from "core/boot/distros_tools/entitys/user.entity";
import { walkerRouter } from "./walker.router";

export async function declareRoutes(user:userEntity){
    let path:string = `${user.projectPath}${user.manifest.render_directory}`
    const routes = await walkerRouter(user.server,path,user.distros,user)
    return routes
}