import {
  LayoutDashboard,
  Wallet,
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
    disabled: false,
    items: [],
  },
  rides: {
    label: "Rides",
    href: "/rides",
    icon: Waypoints,
    disabled: true,
    items: [],
  },
  vehicles: {
    label: "Vehicles",
    href: "/vehicles",
    icon: Car,
    disabled: false,
    items: [],
  },
  drivers: {
    label: "Drivers",
    href: "/drivers",
    icon: CircleUserRound,
    disabled: false,
    items: [],
  },
  finance: {
    label: "Finance",
    href: "#",
    icon: Wallet,
    disabled: true,
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
    disabled: true,
    items: [
      { label: "Reports", href: "/" },
      { label: "Performance", href: "/" },
    ],
  },
  users: {
    label: "Users",
    href: "/users",
    icon: Users,
    disabled: true,
    items: [],
  },
  settings: {
    label: "Settings",
    href: "#",
    icon: Settings,
    disabled: false,
    items: [
      { label: "General", href: "/settings/general" },
      { label: "Compliance", href: "/settings/compliance" },
    ],
  },
} as const
