import { Hono } from "hono"
import { prisma } from "@blak/db"
import type { AppContext } from "@/middlewares"
import { AppError } from "@blak/utils"

const compliance = new Hono<AppContext>().get("/", async (c) => {
  const session = c.get("session")

  const org = await prisma.organization.findFirst({
    where: { id: session.activeOrganizationId! },
  })
  if (!org) throw new AppError("INVALID_REQUEST")

  const response = await prisma.complianceRequirement.findMany({
    where: {
      AND: [
        {
          entityType: "OPERATOR",
        },
        {
          marketId: org?.marketId!,
        },
      ],
    },
    include: {
      records: {
        where: {
          entityId: org.id,
        },
        include: {
          document: true,
        },
        take: 1,
      },
    },
  })

  const data = response.map(({ records, ...requirement }) => ({
    ...requirement,
    record: records[0] ?? null,
  }))

  return c.json({
    success: true,
    data: data,
  })
})

export default compliance
