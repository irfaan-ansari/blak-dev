/*
  Warnings:

  - You are about to drop the column `entityId` on the `compliance_record` table. All the data in the column will be lost.
  - You are about to drop the column `entityType` on the `compliance_record` table. All the data in the column will be lost.
  - You are about to drop the column `label` on the `compliance_record` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `compliance_record` table. All the data in the column will be lost.
  - You are about to drop the column `value` on the `compliance_record` table. All the data in the column will be lost.

*/
-- AlterTable
ALTER TABLE "compliance_record" DROP COLUMN "entityId",
DROP COLUMN "entityType",
DROP COLUMN "label",
DROP COLUMN "name",
DROP COLUMN "value";
