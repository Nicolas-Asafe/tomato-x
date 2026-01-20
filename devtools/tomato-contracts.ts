// ===== CLASSES BASE =====
import { BaseModel } from "../core/boot/distros_tools/class/base.class"

// ===== ENTITIES =====
import { successEntity } from "../core/shared/loggers/success/success.entity"
import { failEntity } from "../core/shared/loggers/fail/fail.entity"
import { manifestEntity } from "../core/boot/loader/manifest/manifest.entity"
import { distroEntity } from "../core/boot/loader/distros/distro.entity"
import { routeEntity } from "../core/boot/loader/route/route.entity"
import { ctxEntity } from "../core/boot/distros_tools/entitys/ctx.entity"
import { userEntity } from "../core/boot/distros_tools/entitys/user.entity"

// ===== DECORATORS =====
import { Base } from "../core/boot/distros_tools/decorators/base.decorator"
import { DistroApplication } from "../core/boot/distros_tools/decorators/distroApplication.decorator"

// ===== RETURNS =====
import { baseErrorReturns } from "../core/boot/distros_tools/interfaces/baseErrorReturns.interface"
import { baseSuccessReturns } from "../core/boot/distros_tools/interfaces/baseSuccessReturns.interface"

// ===== UTILS / SHARED =====
import { jsonRead } from "../core/shared/read/json.read"
import { codes } from "../core/shared/codes"
import { fail, success } from "../core/shared/loggers/logger"
import { deepFreeze } from "../core/shared/freeze/deepFreeze.freeze"
import { validatorKeys } from "../core/shared/validator_keys/validator"
import { key } from "../core/shared/validator_keys/key.entity"


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

/* ======================================================
   DECORATORS
====================================================== */
export namespace TomatoDecorators {
  export const BaseDecorator = Base
  export const DistroApplicationDecorator = DistroApplication
}

/* ======================================================
   LOGGERS
====================================================== */
export namespace TomatoLoggers {
  export type SuccessEntity = successEntity
  export type FailEntity = failEntity

  export const successLogger = success
  export const failLogger = fail
}

/* ======================================================
   BASE RETURNS (CONTRACTS)
====================================================== */
export namespace TomatoBaseReturns {
  export type Success = baseSuccessReturns
  export type Error = baseErrorReturns
}

/* ======================================================
   BASE / CORE
====================================================== */
export namespace TomatoBase {
  export const BaseModelClass = BaseModel
}

/* ======================================================
   UTILS
====================================================== */
export namespace TomatoUtils {
  export const readJson = jsonRead
  export const Codes = codes
  export const freeze = deepFreeze
  export const ValidatorKeys = validatorKeys
  export type Key = key
}
