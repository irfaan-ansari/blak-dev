import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"
import accounts from "@/modules/org-operator/accounts/accounts.routes"
import { drivers } from "@/modules/org-operator/drivers/drivers.routes"

const router = new Hono<OrgContext>()

  .route("/requirements", accounts)
  .route("/accounts", accounts)
  .route("/vehicles", accounts)
  .route("/drivers", drivers)
  .route("/users", accounts)
export default router
