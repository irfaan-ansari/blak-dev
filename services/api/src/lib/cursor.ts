import { HTTPException } from "hono/http-exception"

export type Cursor = { createdAt: string; id: string }

export function encodeCursor(c: Cursor): string {
  return Buffer.from(JSON.stringify(c)).toString("base64url")
}

export function decodeCursor(raw?: string): Cursor | undefined {
  if (!raw) return undefined

  try {
    return JSON.parse(Buffer.from(raw, "base64url").toString())
  } catch {
    throw new HTTPException(400, {
      message: "Malformed pagination cursor",
    })
  }
}
