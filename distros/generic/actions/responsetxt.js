/**
 * Action Handler: responsetxt - Processes requests and returns formatted JSON response.
 * This action receives HTTP request data (body, query, headers) and route parameters,
 * validates them against type specifications, merges parameters with request data,
 * and returns a formatted response object. The output feeds into the response handler.
 * Supports parameter injection from route configuration and request body data.
 */

import validateResponseParams from "../params/params_responsetxt.js"

export default async function responsetxtAction(ctx) {
  if (!ctx) {
    const err = new Error("[Action responsetxt] Context is required")
    err.code = "INVALID_CONTEXT"
    throw err
  }

  if (!ctx.req || !ctx.res) {
    const err = new Error("[Action responsetxt] Request and response objects required")
    err.code = "INVALID_REQUEST"
    throw err
  }

  try {
    const data = ctx.body?.data || ctx.body || { message: "OK", status: "success" }

    let finalData = { ...data }
    if (ctx.routeParams) {
      if (typeof ctx.routeParams === "object" && !Array.isArray(ctx.routeParams)) {
        finalData = { ...ctx.routeParams, ...data }
      } else {
        finalData.routeParam = ctx.routeParams
      }
    }

    const params = await validateResponseParams({
      data: finalData,
      statusCode: ctx.body?.statusCode || ctx.statusCode || 200
    })

    return {
      success: true,
      data: params.data,
      statusCode: params.statusCode
    }
  } catch (error) {
    const err = new Error(
      `[Action responsetxt] Failed to process: ${error.message}`
    )
    err.code = error.code || "ACTION_ERROR"
    err.statusCode = 400
    throw err
  }
}