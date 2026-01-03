/**
 * Type Model: Represents a data type validator for route parameters and responses.
 * Type validators ensure that data conforms to expected formats (string, integer, etc).
 * They are dynamically loaded from distro type files and validate context data
 * according to framework requirements. Each type defines validation rules and constraints.
 * Lazy-loaded to optimize performance - loaded only when validation is needed.
 */

export default class Type {
  constructor(name, distro, loader) {
    this.name = name
    this.distro = distro
    this.loader = loader
    this.handler = null
    this.failed = false
    this.completname = `${distro}:type_${name}`
  }

  async load() {
    if (this.failed) {
      throw new Error(`[Type ${this.completname}] previously failed to load`)
    }

    const mod = await this.loader()

    if (!mod?.default || typeof mod.default !== "function") {
      this.failed = true
      throw new Error(
        `[Type ${this.completname}] default export must be a function`
      )
    }

    this.handler = mod.default
  }

  async validate(ctx) {
    if (!this.handler) await this.load()
    return this.handler(ctx)
  }
}
