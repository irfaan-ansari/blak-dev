import "@blak/ui/globals.css"
import { cn } from "@blak/ui/lib/utils"

import { Metadata } from "next"
import { Manrope } from "next/font/google"

import { AppLayout } from "@/components/app-layout"
import { AppProvider } from "@/components/provider"
import { AppSidebar } from "@/components/app-sidebar"
import { SidebarInset, SidebarProvider } from "@blak/ui/components/sidebar"
import { Suspense } from "react"

const varela = Manrope({
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "BLAK",
    template: `%s | BLAK`,
  },
  description: "BLAK",
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        varela.variable,
        "font-sans font-normal text-foreground antialiased"
      )}
    >
      <body>
        <AppProvider>
          <SidebarProvider
            style={
              {
                "--sidebar-width": "calc(var(--spacing) * 60)",
                "--header-height": "calc(var(--spacing) * 12)",
                "--sidebar-width-icon": "calc(var(--spacing) * 14)",
              } as React.CSSProperties
            }
          >
            <AppSidebar variant="sidebar" />
            <SidebarInset className="bg-neutral-50">
              <Suspense>
                <AppLayout>{children}</AppLayout>
              </Suspense>
            </SidebarInset>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  )
}
