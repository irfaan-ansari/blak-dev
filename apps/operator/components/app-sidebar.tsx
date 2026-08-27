"use client"

import * as React from "react"

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
import {
  Building2,
  ChevronRight,
  ChevronsUpDown,
  HelpCircle,
} from "lucide-react"
import { SIDEBAR_NAV } from "@/lib/config/nav"
import Link from "next/link"
import { Avatar, AvatarFallback } from "@blak/ui/components/avatar"
import { useAccount } from "@/features/account/account.data"

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data } = useAccount()
  return (
    <Sidebar collapsible="icon" {...props}>
      <SidebarHeader>
        <SidebarMenu className="group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem>
            <SidebarMenuButton className="h-auto items-start py-2 group-data-[collapsible=icon]:p-0!">
              <Avatar className="after:border-muted/10">
                <AvatarFallback className="bg-muted/10">
                  <Building2 className="size-4" />
                </AvatarFallback>
              </Avatar>
              <div className="grid min-w-0 flex-1">
                <span className="font-medium">{data?.data?.name}</span>
                <span className="text-xs font-medium text-muted-foreground">
                  {data?.data?.status}
                </span>
              </div>
              <ChevronsUpDown className="self-center" />
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu className="group-data-[collapsible=icon]:items-center">
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
      <SidebarFooter>
        <SidebarMenu className="pb-2 group-data-[collapsible=icon]:items-center">
          <SidebarMenuItem>
            <SidebarMenuButton>
              <HelpCircle />
              Help & Support
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  )
}
