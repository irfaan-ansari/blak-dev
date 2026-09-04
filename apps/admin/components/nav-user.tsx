"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@blak/ui/components/avatar"
import { Button } from "@blak/ui/components/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@blak/ui/components/dropdown-menu"

import {
  SparklesIcon,
  BadgeCheckIcon,
  CreditCardIcon,
  BellIcon,
  LogOutIcon,
  UserCircle,
  CircleUser,
} from "lucide-react"

import { authClient } from "@blak/auth/client"
import { useAppDialog } from "@blak/ui/components/blak/app-dialog"

export function NavUser() {
  const { open } = useAppDialog()
  const { data: session } = authClient.useSession()
  const user = session?.user

  const handleLogout = async () => {
    await authClient.signOut()
    open({
      title: "Logout",
      description: "You have been logged out successfully.",
      variant: "success",
      action: {
        label: "OK",
        onClick: () => {
          const authUrl = process.env.NEXT_PUBLIC_AUTH_URL!
          window.location.href = authUrl
        },
      },
    })
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="secondary"
          className="relative rounded-full border border-border bg-secondary/50"
        >
          <Avatar className="size-9 rounded-full **:rounded-full after:hidden">
            <AvatarImage src={user?.image ?? ""} alt={user?.name} />
            <AvatarFallback>
              <CircleUser />
            </AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        className="w-fit min-w-44"
        side="bottom"
        align="end"
        sideOffset={4}
      >
        <DropdownMenuLabel className="p-0 font-normal">
          <div className="flex items-center gap-2 px-1 py-1.5 text-left text-sm">
            <Avatar className="h-8 w-8 rounded-lg">
              <AvatarImage src={user?.image ?? ""} alt={user?.name} />
              <AvatarFallback>
                <CircleUser className="size-4" />
              </AvatarFallback>
            </Avatar>
            <div className="grid flex-1 text-left text-sm leading-tight">
              <span className="truncate font-medium">{user?.name}</span>
              <span className="truncate text-xs">{user?.email}</span>
            </div>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />

        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem>
            <BadgeCheckIcon />
            Account
          </DropdownMenuItem>
          <DropdownMenuItem>
            <CreditCardIcon />
            Billing
          </DropdownMenuItem>
          <DropdownMenuItem>
            <BellIcon />
            Notifications
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={handleLogout}>
          <LogOutIcon />
          Log out
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
