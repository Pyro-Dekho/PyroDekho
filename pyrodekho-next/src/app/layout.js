import { Suspense } from "react";
import Script from "next/script";
import Providers from "@/components/Providers";
import AppBackground, { BackgroundLayer } from "@/components/AppBackground";
import "./globals.css";
import "@/styles/mobile.css";

const GA_ID = "G-RLBPXWVQ1M";

export const metadata = {
  title: {
    default: "Pyro Dekho | Buy Imported Cold Pyro",
    template: "%s | PyroDekho",
  },
  description:
    "Buy imported cold pyro, fog and event crackers for weddings, stage shows, clubs and birthdays. Safe, smokeless and delivered all over India.",
  icons: {
    icon: "/logo.png",
    shortcut: "/logo.png",
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
