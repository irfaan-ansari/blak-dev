import { prisma } from "@blak/db"

export const getUserOrganization = async (userId: string) => {
  const requireOrg = await requireOrganization(userId)
  if (!requireOrg) return null
  const member = await prisma.member.findFirst({
    where: { userId },
    include: {
      organization: true,
    },
  })

  if (!member) return null

  // update if first login
  if (
    member.organization.status === "INVITED" ||
    member.organization.status === "ONBOARDING"
  ) {
    await prisma.organization.update({
      data: { status: "ACCOUNT_CREATED" },
      where: { id: member.organizationId },
    })
  }

  return member.organizationId
}

const requireOrganization = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  })
  if (!user || !user.role) return false
  return ["partner", "operator"].includes(user.role)
}

/** cross domain cookie */
export const getRootDomain = (url: string): string => {
  const hostname = new URL(url).hostname
  const parts = hostname.split(".")
  return parts.slice(-2).join(".")
}
