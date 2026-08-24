import { Permission } from "@blak/auth/types"
import { AppError } from "@blak/utils/error"
import { createSafeActionClient } from "next-safe-action"
import { authMiddleware } from "./middlewares/auth-middleware"
import { auditLogMiddleware, logMiddleware } from "./middlewares/log-middleware"

export const actionClient = createSafeActionClient({
  handleServerError(error) {
    console.error(error)
    if (error instanceof AppError)
      return {
        code: error.code,
        status: error.status,
        message: error.message,
        details: error.details,
      }

    return {
      code: "error.code",
      status: "error.status",
      message: error.message,
    }
  },
})

export const withPermission = (permission?: Permission) =>
  actionClient
    .use(logMiddleware)
    .use(authMiddleware(permission))
    .use(auditLogMiddleware)
