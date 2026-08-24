import {
  LayoutDashboard,
  Radio,
  Network,
  Tags,
  Wallet,
  ClipboardList,
  BarChart3,
  Settings,
} from "lucide-react"

export const SIDEBAR_NAV = {
  dashboard: {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    items: [],
  },
  operations: {
    label: "Operations",
    href: "#",
    icon: Radio,
    items: [
      { label: "Bookings", href: "/operation/bookings" },
      { label: "Live Dispatch", href: "/operation/dispatch" },
      { label: "Fleet", href: "/operation/fleet" },
    ],
  },
  network: {
    label: "Network",
    href: "#",
    icon: Network,
    items: [
      { label: "Operators", href: "/network/operators" },
      { label: "Partners", href: "/network/partners" },
      { label: "Chauffeurs", href: "/network/chauffeurs" },
      { label: "Passengers", href: "/network/passengers" },
    ],
  },
  commercial: {
    label: "Commercial",
    href: "#",
    icon: Tags,
    items: [
      { label: "Services", href: "/commercial/pricing" },
      { label: "Pricing", href: "/commercial/pricing" },
      { label: "Taxes & Fees", href: "/commercial/taxes-fees" },
      { label: "Promotions", href: "/commercial/taxes-fees" },
    ],
  },
  finance: {
    label: "Finance",
    href: "#",
    icon: Wallet,
    items: [
      { label: "Payouts", href: "/finance/payouts" },
      { label: "Invoicing", href: "/finance/invoicing" },
      { label: "Transactions", href: "/finance/transactions" },
    ],
  },
  onboarding: {
    label: "Onboarding",
    href: "#",
    icon: ClipboardList,
    items: [
      { label: "Operators", href: "/onboarding/operators" },
      { label: "Partners", href: "/onboarding/partners" },
    ],
  },
  insights: {
    label: "Insights",
    href: "#",
    icon: BarChart3,
    items: [
      { label: "Reports", href: "/insights/reports" },
      { label: "Performance", href: "/insights/performance" },
    ],
  },

  settings: {
    label: "Settings",
    href: "#",
    icon: Settings,
    items: [
      { label: "Markets", href: "/settings/markets" },
      { label: "Users & Roles", href: "/settings/users-roles" },
      { label: "Integrations", href: "/settings/integrations" },
      { label: "Audit Log", href: "/settings/audit-log" },
    ],
  },
} as const
