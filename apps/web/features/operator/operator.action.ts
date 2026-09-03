"use server"

import { prisma } from "@blak/db"
import { OperatorFormValues } from "./operator.schema"

export const createOperator = async (data: OperatorFormValues) => {
  try {
    const {
      contactName,
      contactTitle,
      contactEmail,
      contactPhone,
      ...application
    } = data

    const result = await prisma.application.create({
      data: {
        type: "OPERATOR",
        contactName,
        contactTitle,
        contactPhone,
        contactEmail,
        currentStatus: "PENDING_APPROVAL",
        operatorApplication: {
          create: {
            ...application,

            vehicleCount: Number(application.vehicleCount),
            chauffeurCount: Number(application.chauffeurCount),
            yearsInOperation: Number(application.yearsInOperation),
          },
        },
      },
    })

    await prisma.review.create({
      data: {
        entityId: result.id,
        entityType: "APPLICATION",
        status: "PENDING_APPROVAL",
        reason: "Application submitted",
      },
    })

    return { success: true }
  } catch (error) {
    console.log("Error creating operator:", error)
    return { success: false }
  }
}
