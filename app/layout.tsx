import type React from "react"
import type { Metadata } from "next"
import ThemeRegistry from "@/components/theme-registry"

export const metadata: Metadata = {
  title: "State/Campus Selector",
  description: "Select between Australian states or campus locations",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  )
}



import './globals.css'