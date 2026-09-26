/*
  Warnings:

  - You are about to drop the `entity_attachment` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "entity_attachment" DROP CONSTRAINT "entity_attachment_fileId_fkey";

-- DropTable
DROP TABLE "entity_attachment";
