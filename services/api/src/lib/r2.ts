import {
  GetObjectCommand,
  PutObjectCommand,
  S3Client,
} from "@aws-sdk/client-s3"
import { getSignedUrl } from "@aws-sdk/s3-request-presigner"

export const r2 = new S3Client({
  region: "auto",
  endpoint: process.env.R2_BUCKET_ENDPOINT,
  credentials: {
    accessKeyId: process.env.R2_ACCESS_KEY_ID!,
    secretAccessKey: process.env.R2_SECRET_ACCESS_KEY!,
  },
})

export const R2_BUCKET = process.env.R2_BUCKET_NAME!

export async function getR2Url(key: string, expiresIn = 24 * 60 * 60) {
  const command = new GetObjectCommand({
    Bucket: R2_BUCKET,
    Key: key,
  })

  return await getSignedUrl(r2, command, {
    expiresIn,
  })
}

export const putObject = async (file: File) => {
  const hash = crypto.randomUUID()
  const ext = "." + (file.name.split(".").pop() ?? "bin")
  const key = `${hash}${ext}`
  const arrayBuffer = await file.arrayBuffer()

  await r2.send(
    new PutObjectCommand({
      Bucket: R2_BUCKET,
      Key: key,
      Body: new Uint8Array(arrayBuffer),
      ContentType: file.type,
    })
  )

  return { key, hash, ext }
}
