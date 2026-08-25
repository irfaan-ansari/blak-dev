import { Hono } from "hono"
import v1 from "./routes/v1"
import { logger } from "hono/logger"
import { AppError } from "@blak/utils"
import auth from "./modules/auth/auth.routes"
import { corsMiddleware, type AppContext } from "./middlewares"

export const createApp = () => {
  const app = new Hono<AppContext>()

    .get("/health", (c) => c.json({ status: "ok" }))
    .use(logger())

    .use(corsMiddleware)

    .route("/auth", auth)

    .route("/v1", v1)

    .notFound((c) => {
      throw new AppError("NOT_FOUND")
    })

    .onError((err, c) => {
      if (err instanceof AppError) {
        return c.json(
          {
            success: false,
            error: {
              code: err.code,
              message: err.message,
              ...(err.details !== undefined && {
                details: err.details,
              }),
            },
          },
          err.status
        )
      }

      console.error(err)

      return c.json(
        {
          success: false,
          error: {
            code: "INTERNAL_SERVER_ERROR",
            message: "Something went wrong. Please try again.",
          },
        },
        500
      )
    })

  return app
}
