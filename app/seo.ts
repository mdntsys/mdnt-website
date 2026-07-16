import type { Metadata } from "next";

// Next.js merges metadata shallowly: a page that defines `openGraph`
// replaces the layout's entire object, dropping siteName, locale, and
// images. Every page-level openGraph must be built through this helper
// so those fields survive.
export function pageOpenGraph({
  title,
  description,
  url,
  type = "website",
}: {
  title: string;
  description: string;
  url: string;
  type?: "website" | "article";
}): Metadata["openGraph"] {
  return {
    title,
    description,
    url,
    type,
    siteName: "Midnite Systems",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Midnite Systems, AI Consultancy & Deployment Agency",
      },
    ],
  };
}
