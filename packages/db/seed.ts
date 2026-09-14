import { prisma } from "./dist/index.js"

async function main() {
  const { count } = await prisma.complianceRequirement.deleteMany({
    where: {
      entityType: "VEHICLE",
      name: { in: ["operating_permit"] },
    },
  })

  console.log(`Deleted ${count} requirements`)
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
