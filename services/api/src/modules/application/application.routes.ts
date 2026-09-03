import { Hono } from "hono"
import type { AppContext } from "@/middlewares"
import operators from "@/modules/application/operator/operators.routes"
import partners from "@/modules/application/partners/partners.routes"

const router = new Hono<AppContext>()
  .route("/operators", operators)
  .route("/partners", partners)

export default router
