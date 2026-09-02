"use server"

import { prisma } from "@blak/db"
import { PartnerSchema } from "./partner.schema"

type Payload = Omit<PartnerSchema, "acknowledgment">
export const createPartner = async (data: Payload) => {
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
        type: "PARTNER",
        contactName,
        contactTitle,
        contactPhone,
        contactEmail,
        currentStatus: "PENDING_APPROVAL",
        partnerApplication: {
          create: {
            ...application,
            additionalInformation: application.additionalInformation ?? "",
            acknowledgedAt: new Date(),
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
