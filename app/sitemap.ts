import type { MetadataRoute } from "next";

const siteUrl = "https://midnitesystems.com";
const lastUpdated = new Date("2026-07-14");
const worksheetsUpdated = new Date("2026-08-01");

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: `${siteUrl}/`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${siteUrl}/solutions`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    {
      url: `${siteUrl}/solutions/custom-employee-build`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/solutions/custom-workspace-build`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/solutions/ai-strategy-support`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/case-studies/dsi-transportation`,
      lastModified: lastUpdated,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/discovery`,
      lastModified: lastUpdated,
      changeFrequency: "monthly",
      priority: 0.9,
    },
    // The two lead magnets. Indexed deliberately: they carry substantive
    // content targeting the same clusters the ad campaign bids on, and
    // "ai readiness assessment" is a difficulty-12 term this site can
    // plausibly rank for organically.
    {
      url: `${siteUrl}/worksheets/ai-readiness-assessment`,
      lastModified: worksheetsUpdated,
      changeFrequency: "yearly",
      priority: 0.8,
    },
    {
      url: `${siteUrl}/worksheets/operations-audit`,
      lastModified: worksheetsUpdated,
      changeFrequency: "yearly",
      priority: 0.8,
    },
  ];
}
