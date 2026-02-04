import type { Metadata } from "next";
import { Cormorant_Garamond, Inter } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { AppHeader } from "@/components/AppHeader";
import { AppFooter } from "@/components/AppFooter";
import { ThemeProvider } from "@/components/theme-provider";
import { Toaster } from "@/components/ui/sonner";
import { Analytics } from "@vercel/analytics/next";

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
  title: "Reserve Memorials | Custom Memorials, Headstones & Columbariums",
  description:
    "Family-owned memorial company in Hudson, Ohio. Custom headstones, columbariums, and veteran memorials crafted with compassion and enduring workmanship.",
  icons: {
    icon: [{ url: "/reservelogoblack.png", type: "image/png" }],
    shortcut: ["/reservelogoblack.png"],
    apple: [{ url: "/reservelogoblack.png" }],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Google Tag Manager */}
        <Script
          id="gtm-init"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{
            __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
})(window,document,'script','dataLayer','GTM-KWXLGW3H');`,
          }}
        />
        {/* End Google Tag Manager */}
      </head>
      <body
        className={`${cormorantGaramond.variable} ${inter.variable} font-body antialiased`}
        style={{ fontFamily: "var(--font-body)" }}
      >
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-KWXLGW3H"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          />
        </noscript>
        {/* End Google Tag Manager (noscript) */}

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
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_right,oklch(0.68_0.085_85/0.15),transparent_50%)]" />
            </div>
            <AppHeader />
            <main className="w-full px-4 py-8 sm:px-6 lg:px-10 lg:py-10">
              {children}
            </main>
            <AppFooter />
          </div>
          <Toaster richColors position="top-right" />
          <Analytics />
        </ThemeProvider>
      </body>
    </html>
  );
}
