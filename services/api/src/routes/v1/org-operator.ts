import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"
import users from "@/modules/org-operator/users/users.routes"
import compliance from "@/modules/compliance/compliance.routes"
import drivers from "@/modules/org-operator/drivers/drivers.routes"
import accounts from "@/modules/org-operator/accounts/accounts.routes"
import vehicles from "@/modules/org-operator/vehicles/vehicles.routes"

const router = new Hono<OrgContext>()
  .route("/compliance", compliance)
  .route("/accounts", accounts)
  .route("/vehicles", vehicles)
  .route("/drivers", drivers)
  .route("/users", users)

export default router
