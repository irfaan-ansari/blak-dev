/*
  Warnings:

  - The values [TERMINATED] on the enum `OrganizationStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrganizationStatus_new" AS ENUM ('INVITED', 'ACCOUNT_CREATED', 'PENDING_APPROVAL', 'ACTIVE', 'INACTIVE', 'SUSPENDED', 'ONBOARDING');
ALTER TABLE "public"."organization" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "organization" ALTER COLUMN "status" TYPE "OrganizationStatus_new" USING ("status"::text::"OrganizationStatus_new");
ALTER TYPE "OrganizationStatus" RENAME TO "OrganizationStatus_old";
ALTER TYPE "OrganizationStatus_new" RENAME TO "OrganizationStatus";
DROP TYPE "public"."OrganizationStatus_old";
ALTER TABLE "organization" ALTER COLUMN "status" SET DEFAULT 'INVITED';
COMMIT;

-- AlterTable
ALTER TABLE "organization" ALTER COLUMN "status" SET DEFAULT 'INVITED';
