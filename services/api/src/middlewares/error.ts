import type { Context } from "hono"
import { AppError } from "@blak/utils/error"

export function errorHandler(err: Error, c: Context) {
  if (err instanceof AppError) {
    return c.json(
      {
        code: err.code,
        success: false,
        message: err.message,
        details: err.details,
      },
      err.status
    )
  }

  return c.json(
    {
      code: "err.code",
      success: false,
      message: "Internal server error",
      description: "An unexpected error occurred.",
    },
    500
  )
}
