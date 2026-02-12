import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
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
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
