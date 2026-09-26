type UploadMeta = {
  ref?: string
  refId?: string
  field?: string
}

type UploadInput = {
  file: File
  meta?: UploadMeta
}

type UploadResponse<T = unknown> = {
  success: boolean
  data: T
}

/**
 * Upload multiple files with optional metadata
 * @param uploads Array of files with optional metadata
 * @returns The upload response
 */

export async function uploadFiles<T = unknown>(
  uploads: UploadInput[]
): Promise<UploadResponse<T>> {
  if (!uploads.length) {
    throw new Error("At least one file is required")
  }

  const formData = new FormData()

  const meta = uploads.map(({ file, meta }) => {
    formData.append("files", file)
    return meta ?? {}
  })

  formData.append("meta", JSON.stringify(meta))

  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/v1/uploads`,
    {
      method: "POST",
      credentials: "include",
      body: formData,
    }
  )

  const result = await response.json()

  if (!response.ok) {
    throw new Error(result?.message ?? "Failed to upload files")
  }

  return result
}

/**
 * Upload a single file with optional metadata
 * @param file The file to upload
 * @param meta Optional metadata for the file
 * @returns The upload response
 */
export async function uploadFile<T = unknown>(
  file: File,
  meta?: UploadMeta
): Promise<UploadResponse<T>> {
  return uploadFiles<T>([
    {
      file,
      meta,
    },
  ])
}
