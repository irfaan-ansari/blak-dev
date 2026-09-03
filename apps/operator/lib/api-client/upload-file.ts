type PresignResponse = {
  data: {
    uploadUrl: string
    key: string
    url: string
  }
}

type UploadedFile = {
  name: string
  mime: string
  size: number
  storageKey: string
  url: string
}

export const uploadFile = async (file: File): Promise<UploadedFile> => {
  // 1. Get presigned URL
  const presignResponse = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/uploads/presign`,
    {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        filename: file.name,
        contentType: file.type,
      }),
    }
  )

  if (!presignResponse.ok) {
    throw new Error(`Failed to presign ${file.name}`)
  }

  const {
    data: { uploadUrl, key, url },
  }: PresignResponse = await presignResponse.json()

  // 2. Upload directly to R2
  const uploadResponse = await fetch(uploadUrl, {
    method: "PUT",
    headers: {
      "Content-Type": file.type,
    },
    body: file,
  })

  if (!uploadResponse.ok) {
    throw new Error(`Failed to upload ${file.name}`)
  }

  return {
    name: file.name,
    mime: file.type,
    size: file.size,
    storageKey: key,
    url: key,
  }
}
