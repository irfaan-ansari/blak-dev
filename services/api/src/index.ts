import "dotenv/config"
import { serve } from "@hono/node-server"
import { createApp } from "./app"

const PORT = Number(process.env.PORT ?? 4000)

const app = createApp()

serve({ fetch: app.fetch, port: PORT, hostname: "0.0.0.0" }, (info) => {
  console.log(info)
})

export type AppType = typeof app
