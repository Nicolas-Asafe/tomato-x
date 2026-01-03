/**
 * Catch Response Handler: CR_responsetxt - Handles errors and formats error responses.
 * This handler catches exceptions from the action and response handlers, normalizes
 * error information, validates HTTP status codes, and sends a standardized JSON error
 * response to the client. Includes stack traces in development mode for debugging.
 * Acts as the final error boundary for request processing pipeline.
 */

export default async function catchResponseTextHandler(ctx) {
  if (!ctx) {
    throw new Error("[CatchResponse CR_responsetxt] Context is required")
  }

  if (!ctx.req || !ctx.res) {
    throw new Error(
      "[CatchResponse CR_responsetxt] Request and response objects are required"
    )
  }

  if (!ctx.error) {
    throw new Error("[CatchResponse CR_responsetxt] Error object is required in context")
  }

  try {
    let statusCode = ctx.error.statusCode || ctx.statusCode || 500

    if (statusCode < 400) {
      statusCode = 500
    }

    if (!Number.isInteger(statusCode) || statusCode > 599) {
      statusCode = 500
    }

    const errorResponse = {
      status: "error",
      message: ctx.error.message || "An unexpected error occurred",
      code: ctx.error.code || "INTERNAL_ERROR",
      path: ctx.metadata?.path,
      timestamp: ctx.metadata?.timestamp
    }

    if (process.env.NODE_ENV === "development") {
      errorResponse.stack = ctx.error.stack
    }

    ctx.res.status(statusCode).json(errorResponse)
    return true
  } catch (error) {
    console.error(
      "[CatchResponse CR_responsetxt] Fatal error:",
      error.message
    )
    try {
      ctx.res.status(500).json({
        status: "error",
        message: "Internal server error",
        code: "SERVER_ERROR",
        timestamp: new Date().toISOString()
      })
    } catch (finalError) {
      console.error(
        "[CatchResponse CR_responsetxt] Failed to send fallback error:",
        finalError.message
      )
    }
  }
}