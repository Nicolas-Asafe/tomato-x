import { DistroApplication } from "../../../core/boot/distros_tools/decorators/distroApplication.decorator";
import { userEntity } from "../../../core/boot/distros_tools/entitys/user.entity";

@DistroApplication("tomato") 
export default class TomatoDistroApp {
    constructor(public readonly user:userEntity = {} as userEntity) {}
}