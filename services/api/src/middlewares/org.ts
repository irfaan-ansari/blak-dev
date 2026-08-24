import { createMiddleware } from "hono/factory"

import type { OrgContext } from "./context"
import { AppError } from "@blak/utils/error"

export const orgMiddleware = createMiddleware<OrgContext>(async (c, next) => {
  const session = c.get("session")

  const organizationId = session?.activeOrganizationId

  if (!organizationId) {
    throw new AppError("FORBIDDEN")
  }

  c.set("organizationId", organizationId)

  await next()
})
