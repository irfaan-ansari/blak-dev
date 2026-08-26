import "@blak/ui/globals.css"
import { cn } from "@blak/ui/lib/utils"

import { Metadata } from "next"
import { Manrope } from "next/font/google"

import { AppProvider } from "@/components/provider"

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
        <AppProvider>{children}</AppProvider>
      </body>
    </html>
  )
}
