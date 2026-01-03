/**
 * Response Model: Represents a response handler for successful request completion.
 * Response handlers format and send data back to the client after action execution.
 * They receive the context with processed data and metadata, then send an HTTP response
 * with the appropriate status code and formatted JSON payload.
 * Lazy-loaded to improve application startup time - only loaded when first executed.
 */

export default class Response {
  constructor(name, distro, loader) {
    this.name = name
    this.distro = distro
    this.loader = loader
    this.handler = null
    this.failed = false
    this.completname = `${distro}:response_${name}`
  }

  async load() {
    if (this.failed) {
      throw new Error(`[Response ${this.completname}] previously failed to load`)
    }

    const mod = await this.loader()

    if (!mod?.default || typeof mod.default !== "function") {
      this.failed = true
      throw new Error(
        `[Response ${this.completname}] default export must be a function`
      )
    }

    this.handler = mod.default
  }

  async execute(ctx) {
    if (!this.handler) await this.load()
    return this.handler(ctx)
  }
}
