import { Suspense } from "react";
import Script from "next/script";
import Providers from "@/components/Providers";
import AppBackground, { BackgroundLayer } from "@/components/AppBackground";
import "./globals.css";
import "@/styles/mobile.css";

import { SITE_URL, DEFAULT_TITLE, pageMetadata } from "@/lib/seo";

const GA_ID = "G-RLBPXWVQ1M";

// Defaults for every page; pages override title, description and share card
export const metadata = {
  metadataBase: new URL(SITE_URL),
  applicationName: "PyroDekho",
  ...pageMetadata({}),
  title: {
    default: DEFAULT_TITLE,
    template: "%s | PyroDekho",
  },
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
    apple: "/logo.png",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Providers>
          {/* Product pages have URL params unknown at build time, so the
              pathname-based background resolves inside Suspense */}
          <Suspense fallback={<BackgroundLayer intensity="soft" />}>
            <AppBackground />
          </Suspense>
          {children}
        </Providers>

        {/* Google Analytics (GA4) */}
        <Script
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
          strategy="afterInteractive"
        />
        <Script id="ga4" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${GA_ID}');
          `}
        </Script>
      </body>
    </html>
  );
}
