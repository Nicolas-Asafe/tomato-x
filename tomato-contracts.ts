import { BaseModel } from "tx/distros_tools/class/base.class"
import { manifestEntity } from "tx/boot/loader/manifest/manifest.entity"
import { distroEntity } from "tx/boot/loader/distros/distro.entity"
import { routeEntity } from "tx/boot/loader/route/route.entity"
import { ctxEntity } from "tx/distros_tools/entitys/ctx.entity"
import { userEntity } from "tx/distros_tools/entitys/user.entity"
import { Base } from "tx/distros_tools/decorators/base.decorator"
import { DistroApplication } from "tx/distros_tools/decorators/distroApplication.decorator"
import { jsonRead } from "tx/shared/read/json.read"
import { deepFreeze } from "tx/shared/freeze/deepFreeze.freeze"
import { validatorOfKeys } from "tx/shared/validator_keys/validator"
import { key } from "tx/shared/validator_keys/key.entity"


/* ======================================================
   ENTITIES
====================================================== */
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
}
