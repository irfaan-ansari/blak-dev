import React from "react"
import { OperatorClient } from "@/features/onboarding/operator/components/operator-client"
import { Button } from "@blak/ui/components/button"
import { Plus } from "lucide-react"
import { prisma } from "@blak/db"
import { Trigger } from "./trigger"

const fiveHoursAgo = new Date(Date.now() - 5 * 60 * 60 * 1000)

const OperatorsPage = async () => {
  const users = await prisma.member.findMany({
    where: {
      role: "owner",
      createdAt: {
        gte: fiveHoursAgo,
      },
    },
    include: {
      user: true,
    },
  })

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Operator Applications</h1>
        <Trigger data={users} />
        <Button prefix={<Plus />}>Invite</Button>
      </div>
      <OperatorClient />
    </div>
  )
}

export default OperatorsPage
