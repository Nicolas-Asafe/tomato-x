import type {TomatoEntitys} from "../../../tomato-contracts.js"
import {TomatoDecorators} from "../../../tomato-contracts.js"
import path from "path";
@TomatoDecorators.DistroApplicationDecorator({
    __distro_name:"tomato",
    __compatibility_version:"26.2.3.5"
    ,__version:"1.0.0"
})
export default class TomatoDistroApp {
    constructor(public readonly user:TomatoEntitys.User = {} as TomatoEntitys.User) {
        user.server.get("/welcome",(req: any,res: any)=>{
            res.sendFile(path.resolve("usrl/distros/tomato/public/welcome.html"))
        })
    }
}