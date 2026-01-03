/**
 * Response Handler: response_responsetxt - Formats and sends successful response to client.
 * This handler receives processed data from the action and formats it with metadata
 * including timestamp, request path, and HTTP method. Validates HTTP status codes
 * and sends a JSON response with proper formatting. Serves as the final step
 * in successful request processing before client receives the response.
 */

export default async function responseTextHandler(ctx) {
  if (!ctx) {
    throw new Error("[Response responsetxt] Context is required")
  }

  if (!ctx.req || !ctx.res) {
    throw new Error(
      "[Response responsetxt] Request and response objects are required"
    )
  }

  try {
    const statusCode = ctx.statusCode || 200
    if (!Number.isInteger(statusCode) || statusCode < 100 || statusCode > 599) {
      throw new Error(
        `[Response responsetxt] Invalid HTTP status code: ${statusCode}`
      )
    }

    const data = ctx.data || { message: "OK", status: "success" }
    if (typeof data !== "object") {
      throw new Error("[Response responsetxt] Data must be an object")
    }

    const response = {
      status: "success",
      data,
      metadata: {
        timestamp: ctx.metadata?.timestamp,
        path: ctx.metadata?.path,
        method: ctx.metadata?.method
      }
    }

    ctx.res.status(statusCode).json(response)
    return true
  } catch (error) {
    const err = new Error(
      `[Response responsetxt] Failed to send response: ${error.message}`
    )
    err.statusCode = 500
    throw err
  }
}