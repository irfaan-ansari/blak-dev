import { ComplianceType, EntityType, prisma } from "./dist/index.js"
import comp from "./comp.json"
async function main() {
  const mar = await prisma.market.findMany()
  console.log("running loop...")

  await prisma.complianceRequirement.createMany({
    data: mar.flatMap((market) =>
      comp.map((c) => ({
        marketId: market.id,
        entityType: c.entityType as EntityType,
        name: c.name,
        label: c.label,
        isRequired: c.isRequired ?? true,
        type: c.type as ComplianceType,
      }))
    ),
  })
  console.log("Finished...")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
