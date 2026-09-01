import {
  LayoutDashboard,
  Radio,
  Network,
  Tags,
  Wallet,
  ClipboardList,
  BarChart3,
  Settings,
  Users,
  Waypoints,
  CircleUserRound,
  Car,
} from "lucide-react"

export const SIDEBAR_NAV = {
  dashboard: {
    label: "Dashboard",
    href: "/",
    icon: LayoutDashboard,
    items: [],
  },
  rides: {
    label: "Rides",
    href: "/rides",
    icon: Waypoints,
    items: [],
  },
  vehicles: {
    label: "Vehicles",
    href: "/vehicles",
    icon: Car,
    items: [],
  },
  drivers: {
    label: "Drivers",
    href: "/drivers",
    icon: CircleUserRound,
    items: [],
  },
  finance: {
    label: "Finance",
    href: "#",
    icon: Wallet,
    items: [
      { label: "Payouts", href: "/" },
      { label: "Earnings", href: "/" },
      { label: "Transactions", href: "/" },
    ],
  },
  insights: {
    label: "Insights",
    href: "#",
    icon: BarChart3,
    items: [
      { label: "Reports", href: "/" },
      { label: "Performance", href: "/" },
    ],
  },
  users: {
    label: "Users",
    href: "/users",
    icon: Users,
    items: [],
  },
  settings: {
    label: "Settings",
    href: "#",
    icon: Settings,
    items: [
      { label: "General", href: "/settings/general" },
      { label: "Compliance", href: "/settings/compliance" },
    ],
  },
} as const
