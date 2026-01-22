import {TomatoEntitys,TomatoDecorators} from "tomato-contracts"
import path from "path";
@TomatoDecorators.DistroApplicationDecorator("tomato")
export default class TomatoDistroApp {
    constructor(public readonly user:TomatoEntitys.User = {} as TomatoEntitys.User) {
        user.server.get("/welcome",(req,res)=>{
            res.sendFile(path.resolve("usrl/distros/tomato/public/welcome.html"))
        })
    }
}