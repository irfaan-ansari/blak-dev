/*
  Warnings:

  - You are about to drop the column `userId` on the `organization` table. All the data in the column will be lost.

*/
-- AlterEnum
ALTER TYPE "ApplicationType" ADD VALUE 'DRIVER';

-- DropForeignKey
ALTER TABLE "organization" DROP CONSTRAINT "organization_userId_fkey";

-- AlterTable
ALTER TABLE "organization" DROP COLUMN "userId";
