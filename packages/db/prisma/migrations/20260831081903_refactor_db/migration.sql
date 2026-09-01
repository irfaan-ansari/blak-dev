/*
  Warnings:

  - The values [PENDING] on the enum `ApplicationStatus` will be removed. If these variants are still used in the database, this will fail.
  - The values [PENDING_ONBOARDING,UNDER_REVIEW] on the enum `OrganizationStatus` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the `required_document` table. If the table is not empty, all the data it contains will be lost.
  - Changed the type of `type` on the `application` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "EntityType" AS ENUM ('OPERATOR', 'PARTNER', 'DRIVER');

-- CreateEnum
CREATE TYPE "ComplianceType" AS ENUM ('NUMBER', 'DOCUMENT');

-- CreateEnum
CREATE TYPE "ComplianceStatus" AS ENUM ('PENDING', 'UNDER_REVIEW', 'VERIFIED', 'REJECTED', 'EXPIRED');

-- AlterEnum
BEGIN;
CREATE TYPE "ApplicationStatus_new" AS ENUM ('SUBMITTED', 'UNDER_REVIEW', 'INFO_REQUIRED', 'APPROVED', 'REJECTED');
ALTER TABLE "public"."application" ALTER COLUMN "currentStatus" DROP DEFAULT;
ALTER TABLE "application" ALTER COLUMN "currentStatus" TYPE "ApplicationStatus_new" USING ("currentStatus"::text::"ApplicationStatus_new");
ALTER TYPE "ApplicationStatus" RENAME TO "ApplicationStatus_old";
ALTER TYPE "ApplicationStatus_new" RENAME TO "ApplicationStatus";
DROP TYPE "public"."ApplicationStatus_old";
ALTER TABLE "application" ALTER COLUMN "currentStatus" SET DEFAULT 'UNDER_REVIEW';
COMMIT;

-- AlterEnum
BEGIN;
CREATE TYPE "OrganizationStatus_new" AS ENUM ('ONBOARDING', 'SUBMITTED', 'ACTIVE', 'SUSPENDED', 'INACTIVE', 'TERMINATED');
ALTER TABLE "public"."organization" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "organization" ALTER COLUMN "status" TYPE "OrganizationStatus_new" USING ("status"::text::"OrganizationStatus_new");
ALTER TYPE "OrganizationStatus" RENAME TO "OrganizationStatus_old";
ALTER TYPE "OrganizationStatus_new" RENAME TO "OrganizationStatus";
DROP TYPE "public"."OrganizationStatus_old";
ALTER TABLE "organization" ALTER COLUMN "status" SET DEFAULT 'ONBOARDING';
COMMIT;

-- DropForeignKey
ALTER TABLE "required_document" DROP CONSTRAINT "required_document_marketId_fkey";

-- AlterTable
ALTER TABLE "application" DROP COLUMN "type",
ADD COLUMN     "type" "EntityType" NOT NULL;

-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "status" SET DEFAULT 'ONBOARDING';

-- DropTable
DROP TABLE "required_document";

-- DropEnum
DROP TYPE "ApplicationType";

-- CreateTable
CREATE TABLE "compliance_requirement" (
    "id" TEXT NOT NULL,
    "marketId" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "type" "ComplianceType" NOT NULL,
    "isRequired" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_requirement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "compliance_record" (
    "id" TEXT NOT NULL,
    "requirementId" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "value" TEXT,
    "documentId" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "expiresAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "compliance_record_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "compliance_requirement_marketId_entityType_idx" ON "compliance_requirement"("marketId", "entityType");

-- CreateIndex
CREATE UNIQUE INDEX "compliance_requirement_marketId_entityType_name_key" ON "compliance_requirement"("marketId", "entityType", "name");

-- CreateIndex
CREATE INDEX "compliance_record_entityType_entityId_idx" ON "compliance_record"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "compliance_record_requirementId_idx" ON "compliance_record"("requirementId");

-- CreateIndex
CREATE INDEX "application_type_idx" ON "application"("type");

-- AddForeignKey
ALTER TABLE "compliance_requirement" ADD CONSTRAINT "compliance_requirement_marketId_fkey" FOREIGN KEY ("marketId") REFERENCES "market"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_record" ADD CONSTRAINT "compliance_record_requirementId_fkey" FOREIGN KEY ("requirementId") REFERENCES "compliance_requirement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "compliance_record" ADD CONSTRAINT "compliance_record_documentId_fkey" FOREIGN KEY ("documentId") REFERENCES "document"("id") ON DELETE SET NULL ON UPDATE CASCADE;
