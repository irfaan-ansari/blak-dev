import { Hono } from "hono"
import type { OrgContext } from "@/middlewares"
import accounts from "@/modules/org-partner/accounts/accounts.routes"

const router = new Hono<OrgContext>().route("/accounts", accounts)

export default router
