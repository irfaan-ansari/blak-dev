/*
  Warnings:

  - You are about to drop the column `color` on the `vehicles` table. All the data in the column will be lost.
  - Added the required column `engine` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `exteriorColor` to the `vehicles` table without a default value. This is not possible if the table is not empty.
  - Added the required column `interiorColor` to the `vehicles` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "vehicles" DROP COLUMN "color",
ADD COLUMN     "engine" TEXT NOT NULL,
ADD COLUMN     "exteriorColor" TEXT NOT NULL,
ADD COLUMN     "interiorColor" TEXT NOT NULL;
