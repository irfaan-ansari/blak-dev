import type { StatusConfig } from "../shared/shared.type"

export const STATUS_MAP: Record<"ACTIVE" | "BANNED", StatusConfig> = {
  ACTIVE: {
    label: "Active",
    className:
      "border-emerald-600 bg-emerald-600 text-white dark:bg-emerald-600",
  },
  BANNED: {
    label: "Banned",
    className: "border-rose-600 bg-rose-600 text-white dark:bg-rose-600",
  },
}
