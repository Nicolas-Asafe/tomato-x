import {TomatoEntitys,TomatoDecorators} from "tomato-contracts"
import path from "path";
@TomatoDecorators.DistroApplicationDecorator({
    __distro_name:"tomato",
    __compatibility_version:"26.2.0.3"
    ,__version:"1.0.0"
})
export default class TomatoDistroApp {
    constructor(public readonly user:TomatoEntitys.User = {} as TomatoEntitys.User) {
        user.server.get("/welcome",(req,res)=>{
            res.sendFile(path.resolve("usrl/distros/tomato/public/welcome.html"))
        })
    }
}