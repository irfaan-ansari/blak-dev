/*
  Warnings:

  - The values [REGION] on the enum `MarketScope` will be removed. If these variants are still used in the database, this will fail.
  - You are about to drop the column `code` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `isActive` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `regionId` on the `city` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `country` table. All the data in the column will be lost.
  - You are about to drop the column `dialCode` on the `country` table. All the data in the column will be lost.
  - You are about to drop the column `code` on the `market` table. All the data in the column will be lost.
  - You are about to drop the column `regionId` on the `tax_rule` table. All the data in the column will be lost.
  - You are about to drop the `market_region` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `region` table. If the table is not empty, all the data it contains will be lost.
  - A unique constraint covering the columns `[countryId,slug]` on the table `city` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iso2]` on the table `country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iso3]` on the table `country` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[numericCode]` on the table `currency` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[iso2]` on the table `market` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `slug` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `timezone` to the `city` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iso2` to the `country` table without a default value. This is not possible if the table is not empty.
  - Added the required column `iso2` to the `market` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "SymbolPosition" AS ENUM ('PREFIX', 'SUFFIX');

-- CreateEnum
CREATE TYPE "DistanceUnit" AS ENUM ('KM', 'MILES');

-- AlterEnum
BEGIN;
CREATE TYPE "MarketScope_new" AS ENUM ('COUNTRY', 'STATE', 'CITY');
ALTER TABLE "public"."market" ALTER COLUMN "scope" DROP DEFAULT;
ALTER TABLE "market" ALTER COLUMN "scope" TYPE "MarketScope_new" USING ("scope"::text::"MarketScope_new");
ALTER TYPE "MarketScope" RENAME TO "MarketScope_old";
ALTER TYPE "MarketScope_new" RENAME TO "MarketScope";
DROP TYPE "public"."MarketScope_old";
ALTER TABLE "market" ALTER COLUMN "scope" SET DEFAULT 'COUNTRY';
COMMIT;

-- DropForeignKey
ALTER TABLE "city" DROP CONSTRAINT "city_regionId_fkey";

-- DropForeignKey
ALTER TABLE "market_region" DROP CONSTRAINT "market_region_marketId_countryId_fkey";

-- DropForeignKey
ALTER TABLE "market_region" DROP CONSTRAINT "market_region_regionId_countryId_fkey";

-- DropForeignKey
ALTER TABLE "region" DROP CONSTRAINT "region_countryId_fkey";

-- DropForeignKey
ALTER TABLE "tax_rule" DROP CONSTRAINT "tax_rule_regionId_fkey";

-- DropIndex
DROP INDEX "city_countryId_code_key";

-- DropIndex
DROP INDEX "city_regionId_code_idx";

-- DropIndex
DROP INDEX "country_code_key";

-- DropIndex
DROP INDEX "market_code_key";

-- AlterTable
ALTER TABLE "city" DROP COLUMN "code",
DROP COLUMN "isActive",
DROP COLUMN "regionId",
ADD COLUMN     "slug" TEXT NOT NULL,
ADD COLUMN     "stateId" TEXT,
ADD COLUMN     "timezone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "country" DROP COLUMN "code",
DROP COLUMN "dialCode",
ADD COLUMN     "iso2" TEXT NOT NULL,
ADD COLUMN     "iso3" TEXT,
ADD COLUMN     "phoneCode" TEXT;

-- AlterTable
ALTER TABLE "currency" ADD COLUMN     "numericCode" TEXT,
ADD COLUMN     "symbolPosition" "SymbolPosition" NOT NULL DEFAULT 'PREFIX';

-- AlterTable
ALTER TABLE "market" DROP COLUMN "code",
ADD COLUMN     "distanceUnit" "DistanceUnit" NOT NULL DEFAULT 'KM',
ADD COLUMN     "iso2" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "tax_rule" DROP COLUMN "regionId",
ADD COLUMN     "stateId" TEXT;

-- DropTable
DROP TABLE "market_region";

-- DropTable
DROP TABLE "region";

-- CreateTable
CREATE TABLE "state" (
    "id" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "code" TEXT NOT NULL,
    "type" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "state_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "market_state" (
    "marketId" TEXT NOT NULL,
    "stateId" TEXT NOT NULL,
    "countryId" TEXT NOT NULL,

    CONSTRAINT "market_state_pkey" PRIMARY KEY ("marketId","stateId")
);

-- CreateIndex
CREATE INDEX "state_countryId_idx" ON "state"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "state_countryId_code_key" ON "state"("countryId", "code");

-- CreateIndex
CREATE UNIQUE INDEX "state_id_countryId_key" ON "state"("id", "countryId");

-- CreateIndex
CREATE INDEX "market_state_stateId_idx" ON "market_state"("stateId");

-- CreateIndex
CREATE INDEX "market_state_countryId_idx" ON "market_state"("countryId");

-- CreateIndex
CREATE UNIQUE INDEX "market_state_stateId_key" ON "market_state"("stateId");

-- CreateIndex
CREATE INDEX "city_stateId_slug_idx" ON "city"("stateId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "city_countryId_slug_key" ON "city"("countryId", "slug");

-- CreateIndex
CREATE UNIQUE INDEX "country_iso2_key" ON "country"("iso2");

-- CreateIndex
CREATE UNIQUE INDEX "country_iso3_key" ON "country"("iso3");

-- CreateIndex
CREATE UNIQUE INDEX "currency_numericCode_key" ON "currency"("numericCode");

-- CreateIndex
CREATE UNIQUE INDEX "market_iso2_key" ON "market"("iso2");

-- AddForeignKey
ALTER TABLE "state" ADD CONSTRAINT "state_countryId_fkey" FOREIGN KEY ("countryId") REFERENCES "country"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "city" ADD CONSTRAINT "city_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_state" ADD CONSTRAINT "market_state_marketId_countryId_fkey" FOREIGN KEY ("marketId", "countryId") REFERENCES "market"("id", "countryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "market_state" ADD CONSTRAINT "market_state_stateId_countryId_fkey" FOREIGN KEY ("stateId", "countryId") REFERENCES "state"("id", "countryId") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "tax_rule" ADD CONSTRAINT "tax_rule_stateId_fkey" FOREIGN KEY ("stateId") REFERENCES "state"("id") ON DELETE SET NULL ON UPDATE CASCADE;
