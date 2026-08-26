/*
  Warnings:

  - You are about to drop the column `slug` on the `city` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "city_countryId_slug_key";

-- DropIndex
DROP INDEX "city_stateId_slug_idx";

-- AlterTable
ALTER TABLE "city" DROP COLUMN "slug";
