import { userEntity } from "../distros_tools/entitys/user.entity";
import { distroEntity } from "../loader/distros/distro.entity";
import { manifestEntity } from "../loader/manifest/manifest.entity";
import { walkerRouter } from "./walker.router";

export async function renderRoutes(server:Express.Application,manifest:manifestEntity,user:userEntity,distros:distroEntity[]){
    const path = `${user.projectPath}/${manifest.render_directory}`
    await walkerRouter(server,path,distros,user)
}