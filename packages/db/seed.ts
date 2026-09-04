import { prisma } from "./dist/index.js"

async function main() {
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
