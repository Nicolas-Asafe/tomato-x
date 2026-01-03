/**
 * Route Model: Defines and validates HTTP routes with their configuration.
 * This class manages route properties including path, method, status codes, base action,
 * response handlers, error handlers, and route parameters. All properties are validated
 * according to HTTP standards and framework requirements.
 * 
 * Properties:
 * - path: HTTP route path (must start with /)
 * - method: HTTP method (get, post, put, delete, patch)
 * - status: Default HTTP status code for success responses
 * - base: Action to execute (format: "distro:action_name")
 * - response: Success response handler (format: "distro:response_name")
 * - catch_response: Error response handler (format: "distro:catch_response_name")
 * - params: Static parameters passed to the action (string, number, boolean, or object)
 */

export class Route {
  constructor(
    path = "/",
    method = "get",
    status = 200,
    base = null,
    response = null,
    catch_response = null,
    params = null
  ) {
    this.path = path
    this.method = typeof method === "string" ? method.toLowerCase() : method
    this.status = status
    this.base = base
    this.response = response
    this.catch_response = catch_response
    this.params = params
  }

  validate() {
    const validMethods = ["get", "post", "put", "delete", "patch"]

    if (typeof this.path !== "string") {
      throw new Error(`[Route] Path must be a string`)
    }

    if (!this.path.startsWith("/")) {
      throw new Error(`[Route ${this.path}] Path must start with "/"`)
    }

    if (this.path.includes("//")) {
      throw new Error(`[Route ${this.path}] Path contains duplicated "/"`)
    }

    if (this.path.includes(" ")) {
      throw new Error(`[Route ${this.path}] Path cannot contain spaces`)
    }

    if (!this.method || typeof this.method !== "string") {
      throw new Error(`[Route ${this.path}] Method must be a non-empty string`)
    }

    if (!validMethods.includes(this.method)) {
      throw new Error(
        `[Route ${this.path}] Invalid method "${this.method}". Allowed: ${validMethods.join(", ")}`
      )
    }

    if (!Number.isInteger(this.status)) {
      throw new Error(
        `[Route ${this.path}] Status must be an integer`
      )
    }

    if (this.status < 100 || this.status > 599) {
      throw new Error(
        `[Route ${this.path}] Invalid HTTP status code: ${this.status}`
      )
    }

    if (typeof this.base !== "string" || !this.base.trim()) {
      throw new Error(
        `[Route ${this.path}] Base must be a non-empty string`
      )
    }

    if (!this.base.includes(":action_")) {
      throw new Error(
        `[Route ${this.path}] Base must follow "distro:action_name" format`
      )
    }

    if (this.response === null && this.catch_response === null) {
      throw new Error(
        `[Route ${this.path}] At least one of response or catch_response must be defined`
      )
    }
    if (this.response !== null) {
      if (typeof this.response !== "string") {
        throw new Error(
          `[Route ${this.path}] Response must be a string`
        )
      }

      if (!this.response.includes(":response_")) {
        throw new Error(
          `[Route ${this.path}] Invalid response format: ${this.response}`
        )
      }
    }

    if (this.catch_response !== null) {
      if (typeof this.catch_response !== "string") {
        throw new Error(
          `[Route ${this.path}] Catch response must be a string`
        )
      }

      if (!this.catch_response.includes(":catch_")) {
        throw new Error(
          `[Route ${this.path}] Invalid catch_response format: ${this.catch_response}`
        )
      }
    }

    if (this.params !== null && this.params !== undefined) {
      const paramType = typeof this.params
      if (paramType !== "string" && paramType !== "number" && paramType !== "boolean" && paramType !== "object") {
        throw new Error(
          `[Route ${this.path}] Params must be a string, number, boolean or object, got ${paramType}`
        )
      }

      if (paramType === "object" && Array.isArray(this.params)) {
        throw new Error(
          `[Route ${this.path}] Params must be an object, not an array`
        )
      }

      if (paramType === "object" && Object.keys(this.params).length === 0) {
        throw new Error(
          `[Route ${this.path}] Params object cannot be empty`
        )
      }
    }

    if (this.method === "get" && this.status === 204) {
      throw new Error(
        `[Route ${this.path}] GET routes should not return 204`
      )
    }
  }
}
