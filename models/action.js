/**
 * Action Model: Represents an executable action within a distro.
 * Actions are the core business logic that process incoming requests.
 * Each action loads a handler function dynamically and executes it with a context object.
 * The context contains request data, response object, route configuration, and metadata.
 * Actions are lazy-loaded to improve performance - only loaded when first executed.
 */

export default class Action {
  constructor(name, distro, loader, catchresponse, response) {
    this.name = name
    this.distro = distro
    this.loader = loader
    this.handler = null
    this.failed = false
    this.completname = `${distro}:action_${name}`
    this.catchresponse = catchresponse
    this.response = response
  }

  async load() {
    if (this.failed) {
      throw new Error(`[Action ${this.completname}] previously failed to load`)
    }

    const mod = await this.loader()

    if (!mod?.default || typeof mod.default !== "function") {
      this.failed = true
      throw new Error(
        `[Action ${this.completname}] default export must be a function`
      )
    }

    this.handler = mod.default
  }

  async execute(ctx) {
    if (!this.handler) await this.load()
    return this.handler(ctx)
  }
}
