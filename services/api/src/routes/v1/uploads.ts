import { Hono } from "hono"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import { r2, R2_BUCKET } from "@/lib/r2"
import type { AppContext } from "../../middlewares/context"
import { prisma } from "@blak/db"
import { AppError } from "@blak/utils"

const uploads = new Hono<AppContext>()
  .post("/", async (c) => {
    const { entity, entityId, fileName, mimeType, size, storageKey, url } =
      await c.req.json()

    const res = await prisma.document.create({
      data: {
        entity,
        entityId,
        fileName,
        mimeType,
        size,
        storageKey,
        url,
        type: "DOCUMENT",
        status: "PENDING",
      },
    })
    if (!res) throw new AppError("INTERNAL_SERVER_ERROR")
    return c.json({
      success: true,
      data: res,
    })
  })
  .post("/presign", async (c) => {
    const session = c.get("session")

    const data = await c.req.json()

    const { filename, contentType } = data

    const extension = filename.split(".").pop()?.toLowerCase()

    const id = crypto.randomUUID()

    const key = [
      session?.activeOrganizationId || "uploads",
      `${id}${extension ? `.${extension}` : ""}`,
    ].join("/")

    const command = new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      ContentType: contentType,
    })

    const uploadUrl = await getSignedUrl(r2, command, {
      expiresIn: 60 * 10,
    })

    return c.json({
      data: {
        key,
        uploadUrl,
        expiresIn: 600,
      },
    })
  })

export default uploads
