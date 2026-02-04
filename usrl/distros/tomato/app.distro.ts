import {TomatoDecorators, type TomatoEntitys} from "../../../tomato-contracts.js"
@TomatoDecorators.DistroApplicationDecorator({
    __distro_name:"tomato",
    __compatibility_version:"26.2.4.5"
    ,__version:"1.0.0"
})
export default class TomatoDistroApp {
    constructor(public readonly user:TomatoEntitys.User = {} as TomatoEntitys.User) {}
}