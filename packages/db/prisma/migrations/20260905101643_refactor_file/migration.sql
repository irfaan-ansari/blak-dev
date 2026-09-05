-- AlterTable
ALTER TABLE "file" ADD COLUMN     "field" TEXT,
ADD COLUMN     "ref" "EntityType",
ADD COLUMN     "refId" TEXT;
