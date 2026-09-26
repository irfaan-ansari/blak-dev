/*
  Warnings:

  - Added the required column `entityId` to the `compliance_record` table without a default value. This is not possible if the table is not empty.
  - Added the required column `entityType` to the `compliance_record` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "compliance_record" ADD COLUMN     "entityId" TEXT NOT NULL,
ADD COLUMN     "entityType" "EntityType" NOT NULL;
