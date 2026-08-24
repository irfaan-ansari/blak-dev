"use client"

import * as React from "react"

import { cn } from "@blak/ui/lib/utils"
import { useMobile } from "@blak/ui/hooks/use-mobile"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@blak/ui/components/dialog"
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@blak/ui/components/drawer"

interface BaseProps {
  children: React.ReactNode
}

interface RootAppDrawerProps extends BaseProps {
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

interface AppDrawerProps extends BaseProps {
  className?: string
  asChild?: true
}

const AppDrawerContext = React.createContext<{ isMobile: boolean }>({
  isMobile: false,
})

const useAppDrawerContext = () => {
  const context = React.useContext(AppDrawerContext)
  if (!context) {
    throw new Error(
      "AppDrawer components cannot be rendered outside the AppDrawer Context"
    )
  }
  return context
}

const AppDrawer = ({ children, ...props }: RootAppDrawerProps) => {
  const isMobile = useMobile()
  const AppDrawer = isMobile ? Drawer : Dialog

  return (
    <AppDrawerContext.Provider value={{ isMobile }}>
      <AppDrawer {...props} {...(isMobile && { autoFocus: true })}>
        {children}
      </AppDrawer>
    </AppDrawerContext.Provider>
  )
}

const AppDrawerTrigger = ({
  className,
  children,
  ...props
}: AppDrawerProps) => {
  const { isMobile } = useAppDrawerContext()
  const AppDrawerTrigger = isMobile ? DrawerTrigger : DialogTrigger

  return (
    <AppDrawerTrigger className={className} {...props}>
      {children}
    </AppDrawerTrigger>
  )
}

const AppDrawerClose = ({ className, children, ...props }: AppDrawerProps) => {
  const { isMobile } = useAppDrawerContext()
  const AppDrawerClose = isMobile ? DrawerClose : DialogClose

  return (
    <AppDrawerClose className={className} {...props}>
      {children}
    </AppDrawerClose>
  )
}

const AppDrawerContent = ({
  className,
  children,
  ...props
}: AppDrawerProps) => {
  const { isMobile } = useAppDrawerContext()
  const AppDrawerContent = isMobile ? DrawerContent : DialogContent

  return (
    <AppDrawerContent
      className={cn(
        "flex flex-col data-[slot=drawer-content]:p-6 data-[slot=drawer-content]:pt-2 data-[vaul-drawer-direction=bottom]:max-h-[90vh] data-[vaul-drawer-direction=bottom]:rounded-b-none",
        className
      )}
      {...props}
    >
      {children}
    </AppDrawerContent>
  )
}

const AppDrawerDescription = ({
  className,
  children,
  ...props
}: AppDrawerProps) => {
  const { isMobile } = useAppDrawerContext()
  const AppDrawerDescription = isMobile ? DrawerDescription : DialogDescription

  return (
    <AppDrawerDescription className={className} {...props}>
      {children}
    </AppDrawerDescription>
  )
}

const AppDrawerHeader = ({ className, children, ...props }: AppDrawerProps) => {
  const { isMobile } = useAppDrawerContext()
  const AppDrawerHeader = isMobile ? DrawerHeader : DialogHeader

  return (
    <AppDrawerHeader
      className={cn(
        "text-left! data-[slot=drawer-header]:p-0 data-[slot=drawer-header]:pb-6",
        className
      )}
      {...props}
    >
      {children}
    </AppDrawerHeader>
  )
}

const AppDrawerTitle = ({ className, children, ...props }: AppDrawerProps) => {
  const { isMobile } = useAppDrawerContext()
  const AppDrawerTitle = isMobile ? DrawerTitle : DialogTitle

  return (
    <AppDrawerTitle className={className} {...props}>
      {children}
    </AppDrawerTitle>
  )
}

const AppDrawerFooter = ({ className, children, ...props }: AppDrawerProps) => {
  const { isMobile } = useAppDrawerContext()
  const AppDrawerFooter = isMobile ? DrawerFooter : DialogFooter

  return (
    <AppDrawerFooter className={className} {...props}>
      {children}
    </AppDrawerFooter>
  )
}

export {
  AppDrawer,
  AppDrawerTrigger,
  AppDrawerClose,
  AppDrawerContent,
  AppDrawerDescription,
  AppDrawerHeader,
  AppDrawerTitle,
  AppDrawerFooter,
}
