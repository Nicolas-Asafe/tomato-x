import { BaseModel } from "./tx/distros_tools/class/base.class.js"
import type { manifestEntity } from "./tx/boot/loader/manifest/manifest.entity.js"
import type { distroEntity } from "./tx/boot/loader/distros/distro.entity.js"
import type { routeEntity } from "./tx/boot/loader/route/route.entity.js"
import type { ctxEntity } from "./tx/distros_tools/entitys/ctx.entity.js"
import type { userEntity } from "./tx/distros_tools/entitys/user.entity.js"
import { Base } from "./tx/distros_tools/decorators/base.decorator.js"
import { DistroApplication } from "./tx/distros_tools/decorators/distroApplication.decorator.js"
import { jsonRead } from "./tx/shared/read/json.read.js"
import { deepFreeze } from "./tx/shared/freeze/deepFreeze.freeze.js"
import { validatorOfKeys } from "./tx/shared/validator_keys/validator.js"
import type { key } from "./tx/shared/validator_keys/key.entity.js"
import { events } from "./tx/events/events.js"

export namespace TomatoEntitys {
  export type Manifest = manifestEntity
  export type Route = routeEntity
  export type Distro = distroEntity
  export type Ctx = ctxEntity
  export type User = userEntity
}

export namespace TomatoDecorators {
  export const BaseDecorator = Base
  export const DistroApplicationDecorator = DistroApplication
}
export namespace TomatoBase {
  export const BaseModelClass = BaseModel
}
export namespace TomatoUtils {
  export const readJson = jsonRead
  export const freeze = deepFreeze
  export const ValidatorKeys = validatorOfKeys
  export type Key = key
  export const Events = events
}
