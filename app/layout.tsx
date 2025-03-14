import type React from "react";
import type { Metadata } from "next";
import ThemeRegistry from "@/components/theme-registry";

export const metadata: Metadata = {
  title: "State/Radius Selector",
  description: "Select between Australian states or radius-based locations",
  icons: {
    icon: "/favicon.svg",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ThemeRegistry>{children}</ThemeRegistry>
      </body>
    </html>
  );
}
