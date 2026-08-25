import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"
import accounts from "@/modules/org-operator/accounts/accounts.routes"
import vehicles from "@/modules/org-operator/vehicles/vehicles.routes"
import drivers from "@/modules/org-operator/drivers/drivers.routes"
import users from "@/modules/org-operator/users/users.routes"

const router = new Hono<OrgContext>()

  .route("/requirements", accounts)
  .route("/accounts", accounts)
  .route("/vehicles", vehicles)
  .route("/drivers", drivers)
  .route("/users", users)
export default router
