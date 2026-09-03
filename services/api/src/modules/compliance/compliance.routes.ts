import { Hono } from "hono"
import { AppError } from "@blak/utils"
import { EntityType, prisma } from "@blak/db"
import type { AppContext } from "@/middlewares"

const compliance = new Hono<AppContext>().get("/", async (c) => {
  const session = c.get("session")
  const { entity } = c.req.query()

  if (!entity || !Object.values(EntityType).includes(entity as EntityType)) {
    throw new AppError("INVALID_REQUEST", {
      message: "Invalid resource type",
    })
  }

  const entityType = entity as EntityType

  const org = await prisma.organization.findFirst({
    where: { id: session.activeOrganizationId! },
  })
  if (!org) throw new AppError("INVALID_REQUEST")

  const response = await prisma.complianceRequirement.findMany({
    where: {
      AND: [
        {
          entityType,
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
          entityType,
        },
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
