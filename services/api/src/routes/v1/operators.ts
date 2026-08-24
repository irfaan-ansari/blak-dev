import type { AppContext } from "@/middlewares"
import operators from "@/modules/operators/operators.routes"
import { Hono } from "hono"

const operatorsRoute = new Hono<AppContext>().route("/", operators)

export default operatorsRoute
