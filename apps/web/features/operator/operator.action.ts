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

export const updateOperator = async (id: string, data: OperatorFormValues) => {
  try {
    const {
      contactName,
      contactTitle,
      contactEmail,
      contactPhone,
      ...application
    } = data

    const res = await prisma.application.update({
      where: {
        id,
      },
      data: {
        contactName,
        contactTitle,
        contactEmail,
        contactPhone,
        currentStatus: "SUBMITTED",
        operatorApplication: {
          update: {
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
        entityId: res.id,
        entityType: "APPLICATION",
        status: "SUBMITTED",
        reason: "Application submitted",
      },
    })

    return { success: true }
  } catch (error) {
    console.error("Error updating operator:", error)

    return { success: false }
  }
}
