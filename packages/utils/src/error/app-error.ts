import { type ErrorCode, ERRORS, type ErrorStatus } from "./error"

type AppErrorOptions = {
  message?: string
  details?: string
}

export class AppError extends Error {
  readonly code: ErrorCode
  readonly status: ErrorStatus
  readonly details: string

  constructor(code: ErrorCode, options: AppErrorOptions = {}) {
    super(options.message ?? ERRORS[code].message)

    this.name = "AppError"
    this.code = code
    this.status = ERRORS[code].status
    this.details = options.details ?? ERRORS[code].details
  }
}
