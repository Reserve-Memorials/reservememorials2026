import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import "./globals.css";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";

// Elegant serif for headings - memorial-appropriate
const cormorantGaramond = Cormorant_Garamond({
  variable: "--font-heading",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

// Modern, readable sans-serif for body text
const inter = Inter({
  variable: "--font-body",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Loboda Monuments | Custom Memorials, Headstones & Columbariums",
  description: "Family-owned memorial company in Hudson, Ohio. Custom headstones, columbariums, and veteran memorials crafted with compassion and enduring workmanship.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} font-body antialiased`}
        style={{ fontFamily: 'var(--font-body)' }}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <div className="min-h-dvh bg-background text-foreground">
            {/* Subtle stone-inspired background gradient */}
            <div className="pointer-events-none fixed inset-0 -z-10 opacity-30">
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,oklch(0.89_0.018_65),transparent_50%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.68_0.085_85_/_0.15),transparent_50%)]" />
            </div>
            <AppHeader />
            <main className="w-full px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
              {children}
            </main>
            <AppFooter />
          </div>
          <Toaster richColors position="top-right" />
        </ThemeProvider>
      </body>
    </html>
  );
}
