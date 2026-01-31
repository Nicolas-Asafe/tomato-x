import { findBaseOfDistro } from "tx/boot/router/renderRoutes/findBase.router"
import { routeEntity } from "./route.entity"
import { parseRoute } from "./route.parse"
import { distroEntity } from "../distros/distro.entity"
import { baseEntity } from "../base/base.entity"

export function loadRoute(
  json: any,
  pathIndex: string,
  distros: distroEntity[]
): routeEntity {
  json.file_path = pathIndex
  json.path = "/" + json.path
  
  parseRoute(json)
  const base: baseEntity = findBaseOfDistro(distros, json.base)
  json.baseInstance = base
  base.parse(json.params)

  return json as routeEntity
}