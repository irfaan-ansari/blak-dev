import type { AppContext } from "@/middlewares"

import partners from "@/modules/partners/partners.route"
import { Hono } from "hono"

const partnersRoute = new Hono<AppContext>().route("/", partners)

export default partnersRoute
