import { Hono } from "hono"
import { prisma } from "@blak/db"
import type { AppContext } from "@/middlewares"
import { AppError } from "@blak/utils/error"

const APPLICATION_MAP = {
  operator: "OPERATOR",
  partner: "PARTNER",
} as const
const applicationInvitations = new Hono<AppContext>()

applicationInvitations.get("/:id", async (c) => {
  const id = c.req.param("id")

  const { email = "", type = "" } = c.req.query()

  const applicationType = APPLICATION_MAP[type as keyof typeof APPLICATION_MAP]

  if (!email || !applicationType) throw new AppError("INVALID_REQUEST")

  const invitation = await prisma.application.findFirst({
    where: {
      id,
      contactEmail: email,
      currentStatus: "INVITED",
      type: applicationType,
    },
    include: {
      operatorApplication: true,
      partnerApplication: applicationType === "PARTNER",
    },
  })

  if (!invitation) {
    throw new AppError("NOT_FOUND")
  }

  const {
    operatorApplication: op,
    partnerApplication: pt,
    ...rest
  } = invitation

  return c.json({
    success: true,
    data: { ...rest, application: op ?? pt },
  })
})

export default applicationInvitations
