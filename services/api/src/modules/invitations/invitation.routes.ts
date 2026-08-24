import { Hono } from "hono"
import { prisma } from "@blak/db"
import type { AppContext } from "@/middlewares"
import { AppError } from "@blak/utils/error"

const router = new Hono<AppContext>()

router.get("/:id", async (c) => {
  const id = c.req.param("id")
  const user = c.get("user")

  const invitation = await prisma.invitation.findUnique({
    where: {
      id,
    },
  })

  if (invitation?.email !== user.email) {
    throw new AppError("FORBIDDEN", {
      message: "You are not authorized to accept this invitation.",
      details:
        "Please sign in with the email address that received the invitation.",
    })
  }

  return c.json({
    data: invitation,
  })
})

export { router as operators }
