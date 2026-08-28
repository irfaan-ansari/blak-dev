import { Hono } from "hono"
import { requireAuth, type AppContext } from "@/middlewares"

import uploads from "@/modules/uploads/uploads.routes"
import vehicles from "@/modules/vehicles/vehicles.route"
import partners from "@/modules/partners/partners.route"
import operators from "@/modules/operators/operators.routes"
import applications from "@/modules/application/application.routes"

import operator from "./org-operator"
import partner from "./org-partner"
import countries from "@/modules/countries/countries.routes"

const v1 = new Hono<AppContext>()
  .route("/countries", countries)
  .use("*", requireAuth)

  .route("/currencies", applications)
  .route("/markets", applications)

  .route("/uploads", uploads)
  .route("/application", applications)
  .route("/operators", operators)
  .route("/partners", partners)
  .route("/vehicles", vehicles)
  .route("/drivers", applications)

  //   operator routes
  .route("/operator", operator)

  // partner routes
  .route("/partner", partner)

  //   driver routes
  .route("/driver", operator)

export default v1
