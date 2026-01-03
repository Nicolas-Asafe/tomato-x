/**
 * Receive Routes: Discovers and loads all routes from the project file system.
 * This module walks through the project directory structure looking for index.json files,
 * parses route configurations, validates them against available distros, and creates
 * Route objects with complete configuration including actions, responses, catch-responses,
 * and parameters. Routes are stored in a standardized format for request handling.
 */

import fs from "fs/promises"
import path from "path"
import { Route } from "../../models/route.js"
import { readJSON } from "../../util/readjson.js"

function validateReference(reference, distros, type) {
  if (!reference) {
    return
  }

  if (typeof reference !== "string") {
    throw new Error(`[Routes] ${type} must be a string, got ${typeof reference}`)
  }

  const [distroName] = reference.split(":")
  if (!distroName) {
    throw new Error(`[Routes] Invalid ${type} format: "${reference}" (expected "distro:name")`)
  }

  const distro = distros.find(d => d.name === distroName)
  if (!distro) {
    throw new Error(`[Routes] Distro "${distroName}" not found for ${type}: "${reference}"`)
  }

  if (type === "action" && !distro.hasAction(reference)) {
    throw new Error(`[Routes] Action "${reference}" not found in distro "${distroName}"`)
  } else if (type === "response" && !distro.hasResponse(reference)) {
    throw new Error(`[Routes] Response "${reference}" not found in distro "${distroName}"`)
  } else if (type === "catch_response" && !distro.hasCatchResponse(reference)) {
    throw new Error(`[Routes] CatchResponse "${reference}" not found in distro "${distroName}"`)
  }
}

export const recept_routes = async (basePath, distros = []) => {
  if (!distros || distros.length === 0) {
    throw new Error("[Routes] No distros provided")
  }

  const routes = []
  const routePaths = new Set()

  async function walk(dir) {
    try {
      const entries = await fs.readdir(dir, { withFileTypes: true })

      for (const entry of entries) {
        const fullPath = path.join(dir, entry.name)

        if (entry.isDirectory()) {
          await walk(fullPath)
          continue
        }

        if (entry.isFile() && entry.name === "index.json") {
          const content = await readJSON(fullPath)

          if (typeof content !== "object" || content === null) {
            throw new Error(`[Routes] Invalid index.json at ${fullPath}`)
          }

          const relativeDir = path.relative(basePath, path.dirname(fullPath))
          const routePath =
            "/" + relativeDir.replace(/\\/g, "/").replace(/\/$/, "")

          if (routePaths.has(routePath)) {
            throw new Error(`[Routes] Duplicate route path: ${routePath}`)
          }

          if (!content.base || typeof content.base !== "string") {
            throw new Error(`[Route ${routePath}] Missing or invalid base`)
          }

          validateReference(content.base, distros, "action")
          validateReference(content.response, distros, "response")
          validateReference(content.catch_response, distros, "catch_response")

          if (!content.response && !content.catch_response) {
            throw new Error(
              `[Route ${routePath}] At least one of 'response' or 'catch_response' must be defined`
            )
          }

          const route = new Route(
            routePath === "/" ? "/" : routePath,
            content.method || "get",
            content.status || 200,
            content.base,
            content.response || null,
            content.catch_response || null,
            content.params || null
          )

          route.validate()

          routePaths.add(route.path)
          routes.push(route)

          console.log(
            `[Routes] Loaded: ${route.method.toUpperCase()} ${route.path} (${route.base})`
          )
        }
      }
    } catch (error) {
      throw new Error(`[Routes] Error walking directory ${dir}: ${error.message}`)
    }
  }

  await walk(basePath)

  if (routes.length === 0) {
    console.warn("[Routes] No routes found")
  }

  return routes
}
}
