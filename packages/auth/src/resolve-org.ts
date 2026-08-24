import { prisma } from "@blak/db"

export const getUserOrganization = async (userId: string) => {
  const requireOrg = await requireOrganization(userId)
  if (!requireOrg) return null
  const member = await prisma.member.findFirst({
    where: { userId },
  })

  if (!member) return null
  return member.organizationId
}

const requireOrganization = async (userId: string) => {
  const user = await prisma.user.findFirst({
    where: { id: userId },
  })
  if (!user || !user.role) return false
  return ["partner", "operator"].includes(user.role)
}
