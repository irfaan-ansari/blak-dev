import { auth } from "@blak/auth"
import { Hono } from "hono"

const router = new Hono()

router.all("/*", (c) => auth.handler(c.req.raw))

export default router
