import {TomatoEntitys,TomatoDecorators} from "tomato-contracts"

@TomatoDecorators.DistroApplicationDecorator("tomato")
export default class TomatoDistroApp {
    constructor(public readonly user:TomatoEntitys.User = {} as TomatoEntitys.User) {}
}