/**
 * Generic Distro Door: Entry point and factory for the generic distro plugin.
 * This class uses the singleton pattern to ensure only one instance of the generic
 * distro exists. It provides access to all generic actions, responses, catch-responses,
 * parameters, and type validators through a unified interface. Each method validates
 * input and provides clear error messages for missing resources.
 */

import GenericActions from "./actions/door.js"
import GenericResponses from "./responses/door.js"
import GenericCatchResponses from "./catchresponses/door.js"
import GenericParams from "./params/door.js"
import GenericTypes from "./types/door.js"
import GenericConfig from "./configs.js"

export default class GenericBaseDoor {
  constructor(configs = null) {
    if (!GenericBaseDoor.instance) {
      this.name = "generic"
      this.actions = new GenericActions()
      this.responses = new GenericResponses()
      this.catchResponses = new GenericCatchResponses()
      this.params = new GenericParams()
      this.types = new GenericTypes()
      this.configs = new GenericConfig(configs)
      GenericBaseDoor.instance = this
    }
    console.log("[GenericBaseDoor] Generic distro initialized")
    console.log("[Test Param]:", this.configs.test_param)
    return GenericBaseDoor.instance
  }

  hasAction(name) {
    if (!name || typeof name !== "string") {
      throw new Error("[GenericBaseDoor] Action name must be a non-empty string")
    }
    return this.actions.has(name)
  }

  getAction(name) {
    if (!this.hasAction(name)) {
      throw new Error(`[GenericBaseDoor] Action "${name}" not found in generic distro`)
    }
    return this.actions.get(name)
  }

  hasResponse(name) {
    if (!name || typeof name !== "string") {
      throw new Error("[GenericBaseDoor] Response name must be a non-empty string")
    }
    return this.responses.has(name)
  }

  getResponse(name) {
    if (!this.hasResponse(name)) {
      throw new Error(`[GenericBaseDoor] Response "${name}" not found in generic distro`)
    }
    return this.responses.get(name)
  }

  hasCatchResponse(name) {
    if (!name || typeof name !== "string") {
      throw new Error("[GenericBaseDoor] Catch response name must be a non-empty string")
    }
    return this.catchResponses.has(name)
  }

  getCatchResponse(name) {
    if (!this.hasCatchResponse(name)) {
      throw new Error(`[GenericBaseDoor] Catch response "${name}" not found in generic distro`)
    }
    return this.catchResponses.get(name)
  }

  hasParam(name) {
    if (!name || typeof name !== "string") {
      throw new Error("[GenericBaseDoor] Param name must be a non-empty string")
    }
    return this.params.has(name)
  }

  getParam(name) {
    if (!this.hasParam(name)) {
      throw new Error(`[GenericBaseDoor] Param "${name}" not found in generic distro`)
    }
    return this.params.get(name)
  }

  hasType(name) {
    if (!name || typeof name !== "string") {
      throw new Error("[GenericBaseDoor] Type name must be a non-empty string")
    }
    return this.types.has(name)
  }

  getType(name) {
    if (!this.hasType(name)) {
      throw new Error(`[GenericBaseDoor] Type "${name}" not found in generic distro`)
    }
    return this.types.get(name)
  }
}
