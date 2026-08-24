import { SidebarInset, SidebarProvider } from "@blak/ui/components/sidebar"
import { AppSidebar } from "@/components/app-sidebar"
import { AppLayout } from "@/components/app-layout"

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
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
      <SidebarInset>
        <AppLayout>{children}</AppLayout>
      </SidebarInset>
    </SidebarProvider>
  )
}
