export const nav = {
  dashboard: {},
}
export const SIDEBAR_NAV = [
  {
    section: "Dashboard",
    items: [
      {
        label: "Dashboard",
        icon: "layout-dashboard",
        path: "/admin/dashboard",
      },
    ],
  },
  {
    section: "Network",
    items: [
      { label: "Operators", icon: "building-2", path: "/admin/operators" },
      { label: "Partners", icon: "handshake", path: "/admin/partners" },
      { label: "Chauffeurs", icon: "id-card", path: "/admin/chauffeurs" },
      { label: "Customers", icon: "users", path: "/admin/customers" },
    ],
  },
  {
    section: "Operations",
    items: [
      { label: "Bookings", icon: "calendar-check", path: "/admin/bookings" },
      { label: "Fleet", icon: "car-front", path: "/admin/fleet" },
      { label: "Pricing", icon: "tag", path: "/admin/pricing" },
    ],
  },
  {
    section: "Finance",
    items: [
      { label: "Payouts", icon: "wallet", path: "/admin/payouts" },
      { label: "Invoicing", icon: "file-text", path: "/admin/invoicing" },
    ],
  },
  {
    section: "Management",
    items: [
      { label: "Compliance", icon: "shield-check", path: "/admin/compliance" },
      { label: "Reports", icon: "bar-chart-3", path: "/admin/reports" },
      { label: "Settings", icon: "settings", path: "/admin/settings" },
    ],
  },
]
