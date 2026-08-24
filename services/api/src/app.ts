import { Hono } from "hono"
import { logger } from "hono/logger"
import { corsMiddleware,  type AppContext } from "./middlewares"

import auth from "./modules/auth/auth.routes"
import v1 from "./routes/v1"

export const createApp = () => {
  const app = new Hono<AppContext>()

    .use(logger())

    .use(corsMiddleware)

    .route("/auth", auth)

    .get("/health", (c) => c.json({ status: "ok" }))

    .route("/v1", v1)

    .notFound((c) => c.json({ error: "not_found" }, 404))

    .onError((err, c) => {
      console.error(err)
      return c.json(
        { error: "internal_error", message: "Something went wrong" },
        500
      )
    })

  return app
}
