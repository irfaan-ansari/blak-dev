"use client"

import * as React from "react"

import { MarketSwitcher } from "@/components/market-switcher"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
  SidebarRail,
} from "@blak/ui/components/sidebar"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@blak/ui/components/collapsible"
import { ChevronRight, Settings } from "lucide-react"
import { SIDEBAR_NAV } from "@/lib/config/nav"
import Link from "next/link"

const data = {
  markets: [
    {
      name: "United States",
      code: "US",
    },
    {
      name: "Germany",
      code: "DE",
    },
    {
      name: "Japan",
      code: "JP",
    },
  ],
}

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <MarketSwitcher markets={data.markets} />
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {Object.entries(SIDEBAR_NAV).map(
              ([key, { label, href, icon, items: subItems }]) => {
                const Icon = icon
                if (!subItems.length)
                  return (
                    <SidebarMenuItem key={key}>
                      <SidebarMenuButton asChild>
                        <Link href={href}>
                          <Icon />
                          {label}
                        </Link>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                  )
                return (
                  <Collapsible key={key} asChild className="group/collapsible">
                    <SidebarMenuItem>
                      <CollapsibleTrigger asChild>
                        <SidebarMenuButton tooltip={label}>
                          <Icon />
                          {label}
                          <ChevronRight className="ml-auto transition-transform duration-200 group-data-[state=open]/collapsible:rotate-90" />
                        </SidebarMenuButton>
                      </CollapsibleTrigger>
                      <CollapsibleContent>
                        <SidebarMenuSub>
                          {subItems?.map((subItem) => (
                            <SidebarMenuSubItem key={subItem.label}>
                              <SidebarMenuSubButton asChild>
                                <Link href={subItem.href}>{subItem.label}</Link>
                              </SidebarMenuSubButton>
                            </SidebarMenuSubItem>
                          ))}
                        </SidebarMenuSub>
                      </CollapsibleContent>
                    </SidebarMenuItem>
                  </Collapsible>
                )
              }
            )}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      {/* <SidebarFooter>
        <SidebarMenu className="pb-2">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <Settings />
              Settings
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter> */}
      <SidebarRail />
    </Sidebar>
  )
}
