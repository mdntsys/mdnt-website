import type { Metadata, Viewport } from "next";
import { Outfit, Instrument_Serif, Geist_Mono } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "./smooth-scroll";
import { RevealObserver } from "./reveal-observer";
import { SiteFooter } from "./site-footer";
import { PageAnalytics } from "./analytics/page-analytics";

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
const siteTitle = "Midnite Systems, AI Consultancy & Deployment Agency";
const siteDescription =
  "Midnite Systems is an AI consultancy and deployment agency for growing businesses. We map your operation, build the AI that fits, and run it for you as a managed service.";

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
    "AI consultancy",
    "AI consulting agency",
    "managed AI service",
    "AI deployment agency",
    "AI roadmap",
    "custom AI employees",
    "custom AI workspace",
    "AI strategy",
    "agentic automation",
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
  },
  twitter: {
    card: "summary_large_image",
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
      alternateName: "MDNT",
      url: siteUrl,
      email: "nic@midnitesystems.com",
      description: siteDescription,
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/mdnt-favicon.png`,
        width: 600,
        height: 600,
      },
      founder: {
        "@type": "Person",
        name: "Nic Perez",
        jobTitle: "CEO",
        email: "nic@midnitesystems.com",
      },
      contactPoint: {
        "@type": "ContactPoint",
        contactType: "sales",
        email: "nic@midnitesystems.com",
      },
      knowsAbout: [
        "AI consulting",
        "AI deployment",
        "agentic automation",
        "AI employees",
        "custom internal software",
        "AI strategy for operating businesses",
      ],
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
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-roadmap`,
      name: "The Roadmap",
      provider: { "@id": `${siteUrl}/#organization` },
      description:
        "Audit of your operation, identification of where AI genuinely fits, and a deployment plan you can act on with us or on your own.",
      url: `${siteUrl}/#process`,
      serviceType: "AI consulting",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-custom-employee-build`,
      name: "Custom Employee Build",
      provider: { "@id": `${siteUrl}/#organization` },
      description:
        "Bespoke AI employees deployed into your operation: junior, specialist, or executive. Tuned to how your business actually runs.",
      url: `${siteUrl}/solutions/custom-employee-build`,
      serviceType: "AI deployment",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-custom-workspace-build`,
      name: "Custom Workspace Build",
      provider: { "@id": `${siteUrl}/#organization` },
      description:
        "A client-specific UI or app layer connected to the platform. Your own internal portal where your team and AI employees work side by side.",
      url: `${siteUrl}/solutions/custom-workspace-build`,
      serviceType: "AI deployment",
    },
    {
      "@type": "Service",
      "@id": `${siteUrl}/#service-ai-strategy-support`,
      name: "AI Strategy Support",
      provider: { "@id": `${siteUrl}/#organization` },
      description:
        "Ongoing strategic consulting beyond the Roadmap. Available as dedicated hours or on-demand.",
      url: `${siteUrl}/solutions/ai-strategy-support`,
      serviceType: "AI consulting",
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
        {/* Site-wide, not landing-page-only. Until now the only instrumentation
            on this site was the Google Ads conversion tag on two pages, so a
            visit that did not convert left no trace at all. The landing pages
            render their own PageAnalytics with the split test arm attached. */}
        <PageAnalytics />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </body>
    </html>
  );
}
