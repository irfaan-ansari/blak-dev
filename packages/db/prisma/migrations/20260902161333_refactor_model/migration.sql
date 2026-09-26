-- CreateTable
CREATE TABLE "entity_attachment" (
    "id" TEXT NOT NULL,
    "fileId" TEXT NOT NULL,
    "entityType" "EntityType" NOT NULL,
    "entityId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "entity_attachment_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "entity_attachment_entityType_entityId_idx" ON "entity_attachment"("entityType", "entityId");

-- CreateIndex
CREATE INDEX "entity_attachment_fileId_idx" ON "entity_attachment"("fileId");

-- AddForeignKey
ALTER TABLE "entity_attachment" ADD CONSTRAINT "entity_attachment_fileId_fkey" FOREIGN KEY ("fileId") REFERENCES "file"("id") ON DELETE CASCADE ON UPDATE CASCADE;
