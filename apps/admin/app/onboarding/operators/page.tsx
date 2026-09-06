import React from "react"
import { OperatorClient } from "@/features/onboarding/operator/components/operator-client"
import { Button } from "@blak/ui/components/button"
import { Plus } from "lucide-react"
import { prisma } from "@blak/db"
import { Trigger } from "./trigger"

const OperatorsPage = async () => {
  const users = await prisma.member.findMany({
    where: {
      role: "owner",
    },
    include: {
      user: true,
    },
  })

  const filtered = users
    .filter((u) => u.user.email !== "admin@rideblak.com")
    .map((m) => m.user)

  console.log(filtered.length)

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <h1 className="flex-1 text-xl font-bold">Operator Applications</h1>

        <Button prefix={<Plus />}>Invite</Button>
        <Trigger users={filtered} />
      </div>
      <OperatorClient />
    </div>
  )
}

export default OperatorsPage
