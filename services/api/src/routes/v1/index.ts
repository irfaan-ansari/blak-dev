import { Hono } from "hono"
import { requireAuth, type AppContext } from "@/middlewares"
import applications from "./applications"
import operator from "./org-operator"
import partner from "./org-partner"
import uploads from "./uploads"
import operators from "./operators"
import partners from "./partners"

const v1 = new Hono<AppContext>()
  .use("*", requireAuth)
  .route("/countries", applications)
  .route("/regions", applications)
  .route("/cities", applications)
  .route("/curriencies", applications)
  .route("/markets", applications)

  .route("/uploads", uploads)
  .route("/application", applications)
  .route("/operators", operators)
  .route("/partners", partners)
  .route("/vehicles", applications)
  .route("/drivers", applications)

  //   operator routes
  .route("/operator", operator)

  // partner routes
  .route("/partner", partner)

  //   driver routes
  .route("/driver", operator)

export default v1
