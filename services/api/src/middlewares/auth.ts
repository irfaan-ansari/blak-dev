import { type AppContext } from "./context"
import { AppError } from "@blak/utils/error"
import { createMiddleware } from "hono/factory"
import { auth } from "@blak/auth"
import { type Permission } from "@blak/auth/types"

export const requireAuth = createMiddleware<AppContext>(async (c, next) => {
  const session = await auth.api.getSession({
    headers: c.req.raw.headers,
  })

  if (!session) {
    throw new AppError("UNAUTHORIZED")
  }

  c.set("user", session.user)
  c.set("session", session.session)

  await next()
})

export const requirePermission = (permission: Permission) =>
  createMiddleware<AppContext>(async (c, next) => {
    const session = c.get("session")

    if (!session) {
      throw new AppError("UNAUTHORIZED")
    }

    const { success } = await auth.api.userHasPermission({
      body: {
        userId: session.userId,
        permissions: permission,
      },
    })

    if (!success) {
      throw new AppError("FORBIDDEN")
    }

    await next()
  })
