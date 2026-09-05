import "./styles.css"
import { cn } from "@blak/ui/lib/utils"

import { Manrope } from "next/font/google"
import { Metadata } from "next"
import GoogleAnalytics from "@/components/analytics/google-analytics"
import { WebVitals } from "@/components/analytics/web-vitals"
import { Toaster } from "sonner"
import { AppProvider } from "@/components/provider"

const varela = Manrope({
  variable: "--font-sans",
})
console.log(process.env.NEXT_PUBLIC_APP_URL)
export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL!),

  title: {
    default: "BLAK | A First Class Experience",
    template: "%s | BLAK",
  },
  description:
    "Experience first class transportation from curb to destination with BLAK's managed network of vetted chauffeurs, premium black vehicles, and hospitality-led service.",

  keywords: [
    "BLAK",
    "premium ground transportation",
    "luxury transportation",
    "chauffeur service",
    "private car service",
    "executive transportation",
    "airport transportation",
  ],

  openGraph: {
    type: "website",
    siteName: "BLAK",
    title: "BLAK | A First Class Experience",
    description:
      "A trusted global network delivering a consistent premium ground transportation experience.",
  },
  twitter: {
    card: "summary_large_image",
    title: "BLAK | A First Class Experience",
    description:
      "A trusted global network delivering a consistent premium ground transportation experience.",
  },
  robots: {
    index: true,
    follow: true,
  },
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
        <Toaster position="top-center" />
        <AppProvider>{children}</AppProvider>
        <GoogleAnalytics />
        {/* Core Web Vitals Tracking */}
        <WebVitals />
      </body>
    </html>
  )
}
