"use server"
import { prisma } from "@blak/db"
import { withPermission } from "@/lib/safe-action/action-client"
import { createMarketSchema, updateMarketSchema } from "./market.schema"

export const createMarket = withPermission({ app: ["admin"] })
  .inputSchema(createMarketSchema)
  .action(async ({ ctx, clientInput }) => {
    const { complianceRequirements, ...rest } = clientInput.data

    const response = await prisma.market.create({
      data: {
        ...rest,
        scope: "COUNTRY",
        complianceRequirements: {
          createMany: {
            data: complianceRequirements,
          },
        },
      },
    })

    return { id: response.id }
  })

export const updateMarket = withPermission({ app: ["admin"] })
  .inputSchema(updateMarketSchema)
  .action(async ({ ctx, clientInput }) => {
    const { complianceRequirements, ...rest } = clientInput.data

    const response = await prisma.$transaction(async (tx) => {
      const market = await tx.market.update({
        where: {
          id: clientInput.id,
        },
        data: {
          ...rest,
        },
      })

      const submittedIds = complianceRequirements
        .filter((requirement) => requirement.id)
        .map((requirement) => requirement.id!)

      // Delete requirements removed from the form
      if (submittedIds.length > 0) {
        await tx.complianceRequirement.deleteMany({
          where: {
            marketId: clientInput.id,
            id: {
              notIn: submittedIds,
            },
          },
        })
      }

      for (const requirement of complianceRequirements) {
        const { id, ...data } = requirement
        console.log(data)
        if (id) {
          await tx.complianceRequirement.update({
            where: {
              id: id,
            },
            data,
          })
        } else {
          await tx.complianceRequirement.create({
            data: {
              ...data,
              marketId: clientInput.id,
            },
          })
        }
      }

      return market
    })

    return {
      id: response.id,
    }
  })
