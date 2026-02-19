import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Script from "next/script";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Kael Research — Market Intelligence That Moves Markets",
  description: "Sourced, verified market research reports delivered in 3 days. Stop Googling. Start knowing.",
  icons: {
    icon: '/favicon.svg',
  },
  openGraph: {
    title: "Kael Research — Market Intelligence That Moves Markets",
    description: "Sourced, verified market research reports delivered in 3 days.",
    url: "https://kaelresearch.com",
    siteName: "Kael Research",
    type: "website",
  },
  twitter: {
    card: "summary",
    title: "Kael Research — Market Intelligence",
    description: "Sourced, verified market research. Delivered in 3 days.",
  },
  alternates: { canonical: "https://kaelresearch.com" },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Kael Research",
              "url": "https://kaelresearch.com",
              "logo": "https://kaelresearch.com/favicon.svg",
              "description": "Market intelligence for venture capital and growth equity investors. Sourced data, verified numbers, actionable strategy.",
              "email": "kaeltiwari@kaelresearch.com",
              "founder": {
                "@type": "Person",
                "name": "Kael Tiwari"
              },
              "sameAs": [
                "https://linkedin.com/in/kaeltiwari",
                "https://twitter.com/kaeltiwari"
              ]
            })
          }}
        />
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-0CM3HES3R7"
          strategy="afterInteractive"
        />
        <Script id="ga4-init" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-0CM3HES3R7');
          `}
        </Script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
