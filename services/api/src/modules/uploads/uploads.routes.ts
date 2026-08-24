import { Hono } from "hono"
import { r2, R2_BUCKET } from "@/lib/r2"
import type { AppContext } from "@/middlewares"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

const uploads = new Hono<AppContext>().post("/presign", async (c) => {
  const body = await c.req.json()

  const { filename, contentType, folder } = body.data

  const extension = filename.split(".").pop()?.toLowerCase()

  const id = crypto.randomUUID()

  const key = [
    folder || "uploads",
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
