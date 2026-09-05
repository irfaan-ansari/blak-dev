import { Hono } from "hono"
import { EntityType, prisma } from "@blak/db"
import { AppError } from "@blak/utils"
import { putObject, r2, R2_BUCKET } from "@/lib/r2"
import { PutObjectCommand } from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"
import type { AppContext } from "../../middlewares/context"

type FileMeta = {
  ref?: EntityType
  refId?: string
  field?: string
}

const uploads = new Hono<AppContext>()
  .post("/", async (c) => {
    const body = await c.req.parseBody({ all: true })
    const files = body["files"]
    const meta = body["meta"]

    const fileList = (
      Array.isArray(files) ? files : files ? [files] : []
    ).filter((f): f is File => f instanceof File)

    if (fileList.length === 0) {
      throw new AppError("INVALID_REQUEST", {
        message: "At least one file is required under",
      })
    }

    let metaList: FileMeta[] = []
    if (typeof meta === "string") {
      try {
        metaList = JSON.parse(meta)
      } catch {
        return c.json({ error: "`meta` must be valid JSON" }, 400)
      }
    }

    const uploaded = await Promise.all(
      fileList.map(async (file, index) => {
        const result = await putObject(file)
        return {
          file,
          meta: metaList[index],
          ...result,
        }
      })
    )

    const records = await prisma.$transaction(
      uploaded.map(({ file, meta, key, hash, ext }) =>
        prisma.file.create({
          data: {
            name: file.name,
            size: file.size,
            mime: file.type,
            storageKey: key,
            ext,
            hash,
            ref: meta?.ref,
            refId: meta?.refId,
            field: meta?.field,
          },
        })
      )
    )

    return c.json(
      {
        success: true,
        data: records.map((record) => ({
          ...record,
          size: Number(record.size),
        })),
      },
      201
    )
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
