import { findBaseOfDistro } from "../../router/renderRoutes/findBase.router.js"
import type { routeEntity } from "./route.entity.js"
import { parseRoute } from "./route.parse.js"
import type { distroEntity } from "../distros/distro.entity.js"
import type { baseEntity } from "../base/base.entity.js"

export function loadRoute(
  json: routeEntity,
  pathIndex: string,
  distros: distroEntity[]
): routeEntity {
  json.file_path = pathIndex
  json.path = "/" + json.path
  
  parseRoute(json)
  const base = findBaseOfDistro(distros, json.base) as baseEntity
  json.baseInstance = base
  base.parse(json.base_config)

  return json as routeEntity
}