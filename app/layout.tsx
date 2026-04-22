import type { Metadata, Viewport } from "next";
import { Outfit, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./smooth-scroll";
import { RevealObserver } from "./reveal-observer";
import { SiteFooter } from "./site-footer";

const outfit = Outfit({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-outfit",
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  variable: "--font-instrument-serif",
  display: "swap",
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-geist-mono",
  display: "swap",
});

const siteUrl = "https://midnitesystems.com";
const siteName = "Midnite Systems";
const siteTitle = "Midnite Systems, AI Deployment Agency";
const siteDescription =
  "Midnite Systems is an AI deployment agency helping growing businesses maximize modern technology. We replace repetitive workflows with agentic automation and empower teams with custom platforms and reporting.";
const ogImage = "/mdnt-favicon.png";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: siteTitle,
    template: `%s | ${siteName}`,
  },
  description: siteDescription,
  applicationName: siteName,
  authors: [{ name: siteName, url: siteUrl }],
  creator: siteName,
  publisher: siteName,
  category: "technology",
  keywords: [
    "AI deployment agency",
    "agentic automation",
    "workflow automation",
    "custom AI agents",
    "internal tools",
    "decision intelligence",
    "AI consulting",
    "B2B AI",
  ],
  icons: {
    icon: "/mdnt-favicon.png",
    apple: "/mdnt-favicon.png",
  },
  openGraph: {
    title: siteTitle,
    description: siteDescription,
    url: "/",
    siteName,
    type: "website",
    locale: "en_US",
    images: [
      {
        url: ogImage,
        width: 600,
        height: 600,
        alt: siteName,
      },
    ],
  },
  twitter: {
    card: "summary",
    title: siteTitle,
    description: siteDescription,
    images: [ogImage],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
};

export const viewport: Viewport = {
  themeColor: "#06080f",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
};

const structuredData = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": `${siteUrl}/#organization`,
      name: siteName,
      url: siteUrl,
      email: "nic@midnitesystems.com",
      description: siteDescription,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/mdnt-favicon.png`,
        width: 600,
        height: 600,
      },
    },
    {
      "@type": "WebSite",
      "@id": `${siteUrl}/#website`,
      url: siteUrl,
      name: siteName,
      description: siteDescription,
      publisher: { "@id": `${siteUrl}/#organization` },
      inLanguage: "en-US",
    },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${outfit.variable} ${instrumentSerif.variable} ${geistMono.variable}`}
    >
      <body suppressHydrationWarning>
        <SmoothScroll />
        {children}
        <SiteFooter />
        <RevealObserver />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
