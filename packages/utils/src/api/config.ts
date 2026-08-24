import { AppError } from "../error"
import { ApiClientOptions, GetOptions } from "./types"
import { buildUrl } from "./build-url"

export function createApiClient({ baseURL }: ApiClientOptions) {
  async function get<T>(path: string, options?: GetOptions): Promise<T> {
    const url = buildUrl(baseURL, path, options?.params)

    const response = await fetch(url, {
      method: "GET",
      credentials: "include",
      headers: options?.headers,
      signal: options?.signal,
    })

    const contentType = response.headers.get("content-type")

    const data = contentType?.includes("application/json")
      ? await response.json().catch(() => null)
      : await response.text()

    if (!response.ok) {
      throw new AppError("INTERNAL_SERVER_ERROR")
    }

    return data as T
  }

  return {
    get,
  }
}
