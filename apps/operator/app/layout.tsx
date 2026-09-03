import "@blak/ui/globals.css"
import { cn } from "@blak/ui/lib/utils"

import { Metadata } from "next"
import { Manrope } from "next/font/google"

import { AppProvider } from "@/components/provider"
import { SidebarInset, SidebarProvider } from "@blak/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppLayout } from "@/components/app-layout"

const varela = Manrope({
  variable: "--font-sans",
})

export const metadata: Metadata = {
  title: {
    default: "Blak",
    template: `%s | Blak`,
  },
  description: "Blak",
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
        "font-sans font-normal antialiased selection:bg-primary/10"
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
              <AppLayout>{children}</AppLayout>
            </SidebarInset>
          </SidebarProvider>
        </AppProvider>
      </body>
    </html>
  )
}
