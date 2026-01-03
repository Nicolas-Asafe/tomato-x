/**
 * Initialize API: Sets up Express server and orchestrates the request pipeline.
 * This module loads routes from the project manifest, initializes distros,
 * and creates request handlers that execute the action → response → catch_response pipeline.
 * Each request is processed through these stages with a standardized context object
 * that flows through the entire pipeline, allowing each stage to read and modify state.
 */

import express from "express"
import { recept_routes } from "./recepts/recept_routes.js"
import { recept_manifest } from "./recepts/recept_manifest.js"
import path from "path"
import { place_distros } from "./place_distros.js"

function createContext(req, res, route, distros) {
  return {
    req,
    res,
    route,
    distros,
    body: req.body || {},
    query: req.query || {},
    params: req.params || {},
    headers: req.headers || {},
    statusCode: route.status,
    data: null,
    error: null,
    routeParams: route.params,
    metadata: {
      timestamp: new Date().toISOString(),
      path: route.path,
      method: route.method,
      base: route.base
    }
  }
}

function parseReference(reference) {
  if (!reference || typeof reference !== "string") {
    throw new Error(`Invalid reference format: ${reference}`)
  }

  const [distroName, resourceId] = reference.split(":")
  if (!distroName || !resourceId) {
    throw new Error(`Reference must follow "distro:resource" format: ${reference}`)
  }

  return { distroName, resourceId }
}

function getActionFromDistro(distros, reference) {
  const { distroName, resourceId } = parseReference(reference)

  const distro = distros.find(d => d.name === distroName)
  if (!distro) {
    throw new Error(`[Distro] "${distroName}" not found`)
  }

  if (!distro.hasAction(reference)) {
    throw new Error(`[Action] "${reference}" not found in distro "${distroName}"`)
  }

  return distro.getAction(reference)
}

function getResponseFromDistro(distros, reference) {
  const { distroName, resourceId } = parseReference(reference)

  const distro = distros.find(d => d.name === distroName)
  if (!distro) {
    throw new Error(`[Distro] "${distroName}" not found`)
  }

  if (!distro.hasResponse(reference)) {
    throw new Error(`[Response] "${reference}" not found in distro "${distroName}"`)
  }

  return distro.getResponse(reference)
}

function getCatchResponseFromDistro(distros, reference) {
  const { distroName, resourceId } = parseReference(reference)

  const distro = distros.find(d => d.name === distroName)
  if (!distro) {
    throw new Error(`[Distro] "${distroName}" not found`)
  }

  if (!distro.hasCatchResponse(reference)) {
    throw new Error(`[CatchResponse] "${reference}" not found in distro "${distroName}"`)
  }

  return distro.getCatchResponse(reference)
}

function createRouteHandler(route, distros) {
  return async (req, res) => {
    let ctx = createContext(req, res, route, distros)

    try {
      const actionRef = route.base
      const actionModel = getActionFromDistro(distros, actionRef)

      if (!actionModel) {
        throw new Error(`Action model not loaded for ${actionRef}`)
      }

      await actionModel.load()
      const actionResult = await actionModel.execute(ctx)

      if (actionResult && typeof actionResult === "object") {
        ctx.data = actionResult.data || actionResult
        if (actionResult.statusCode) {
          ctx.statusCode = actionResult.statusCode
        }
      }

      if (route.response) {
        const responseRef = route.response
        const responseModel = getResponseFromDistro(distros, responseRef)

        if (!responseModel) {
          throw new Error(`Response model not loaded for ${responseRef}`)
        }

        await responseModel.load()
        await responseModel.execute(ctx)
      } else {
        res.status(ctx.statusCode).json({
          status: "success",
          data: ctx.data
        })
      }
    } catch (error) {
      ctx.error = error

      if (route.catch_response) {
        try {
          const catchResponseRef = route.catch_response
          const catchResponseModel = getCatchResponseFromDistro(distros, catchResponseRef)

          if (!catchResponseModel) {
            throw new Error(`CatchResponse model not loaded for ${catchResponseRef}`)
          }

          await catchResponseModel.load()
          await catchResponseModel.execute(ctx)
        } catch (catchError) {
          console.error("[Init API] CatchResponse error:", catchError.message)
          res.status(500).json({
            status: "error",
            message: "Internal server error",
            code: "HANDLER_ERROR"
          })
        }
      } else {
        const statusCode = error.statusCode || 500
        res.status(statusCode).json({
          status: "error",
          message: error.message || "An error occurred",
          code: error.code || "UNKNOWN_ERROR"
        })
      }
    }
  }
}

export const init_api = async (projectname) => {
  try {
    const manifest = await recept_manifest(projectname)
    manifest.validate()
    const distros = await place_distros(manifest)

    const basePath = path.join(process.cwd(), "user", "projects", projectname)
    const basePathForRoutes = basePath + "/" + manifest.rendered_directory
    const routes = await recept_routes(basePathForRoutes, distros)

    const app = express()

    app.use(express.json())

    if (manifest.hello_route) {
      app.get("/hello", (req, res) => res.json({ message: "hello!" }))
    }

    routes.forEach(route => {
      const method = route.method.toLowerCase()
      const handler = createRouteHandler(route, distros)

      app[method](route.path, handler)

      console.log(`[Route] ${method.toUpperCase()} ${route.path} → ${route.base}`)
    })

    app.listen(manifest.port, () => {
      console.log(manifest.logServerRunningMessage())
      console.log(`[Init API] ${routes.length} route(s) registered`)
    })
  } catch (error) {
    console.error("[Init API] Fatal error:", error.message)
    process.exit(1)
  }
}