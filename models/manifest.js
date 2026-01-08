/**
 * Manifest Model: Defines and validates project configuration.
 * The manifest contains all project metadata including server port, author information,
 * route rendering directory, enabled distros (plugins), and startup messages.
 * This is the central configuration file loaded from manifest.json that directs
 * the entire framework behavior and feature activation.
 */

export class manifest {
  constructor(
    port = null,
    author = "you",
    hello_route = false,
    running_message = null,
    rendered_directory = null,
    distros = [],
    distro_configs = null
  ) {
    this.port = port
    this.author = author
    this.hello_route = hello_route
    this.running_message = running_message
    this.rendered_directory = rendered_directory
    this.distros = distros
    this.distro_configs = distro_configs
  }

  validate() {
    if (this.port === null) {
      throw new Error("'port' not found in manifest")
    }
    if (this.rendered_directory === null) {
      throw new Error("'rendered_directory not found in manifest")
    }
    if (this.author === "you") {
      throw new Error("'author' not found in manifest")
    }
    if (this.distros.length === 0) {
      throw new Error("'distros' array is empty in manifest")
    }
    if (!this.distro_configs || typeof this.distro_configs !== "object") {
      throw new Error("'distro_configs' not found or invalid in manifest, initializing as empty object")
    }
    return true
  }

  logServerRunningMessage() {
    return (
      this.running_message
        ? "[" + this.author + "_messages]:" + this.running_message
        : "[tomato_messages]:server running in port." + this.port
    )
  }
}