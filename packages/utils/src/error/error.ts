export const ERRORS = {
  UNAUTHORIZED: {
    status: 401,
    message: "Unauthorized",
    details: "You must be signed in.",
  },

  FORBIDDEN: {
    status: 403,
    message: "Missing required permission.",
    details: "You don't have the required permissions to perform this action.",
  },

  VALIDATION_ERROR: {
    status: 400,
    message: "Validation failed",
    details: "One or more fields are invalid.",
  },
  INVALID_REQUEST: {
    status: 400,
    message: "Invalid request",
    details: "The request could not be processed.",
  },
  NOT_FOUND: {
    status: 404,
    message: "Not found",
    details: "The requested resource could not be found.",
  },

  CONFLICT: {
    status: 409,
    message: "Conflict",
    details: "The request conflicts with existing data.",
  },

  TOO_MANY_REQUESTS: {
    status: 429,
    message: "Too many requests",
    details: "Please try again later.",
  },

  INTERNAL_SERVER_ERROR: {
    status: 500,
    message: "Internal server error",
    details: "An unexpected error occurred.",
  },
} as const

export type ErrorCode = keyof typeof ERRORS
export type ErrorStatus = (typeof ERRORS)[ErrorCode]["status"]
