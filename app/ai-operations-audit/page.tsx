import type { Metadata } from "next";
import { headers } from "next/headers";
import { pageOpenGraph } from "../seo";
import {
  LandingSection,
  LandingShell,
  type HeroContent,
} from "../landing/landing-shell";
import {
  readVariant,
  VARIANT_HEADER,
  type LandingVariant,
} from "../landing/variant";

export const metadata: Metadata = {
  title: "Operations Audit: What Is Repeat Work Costing You?",
  description:
    "A free worksheet that puts one number on the recurring work your team does by hand. Fifteen minutes, no tool required.",
  alternates: { canonical: "/ai-operations-audit" },
  openGraph: pageOpenGraph({
    title: "What Is Repeat Work Costing You? | Midnite Systems",
    description:
      "A free worksheet that puts one number on the recurring work your team does by hand.",
    url: "/ai-operations-audit",
  }),
};

// Both headlines carry the ad's own words. Ad group A bids on "ai workflow
// automation", "ai automation services", "ai employee" and friends, and the
// page these replaced answered with "Price the work before you buy the tool",
// which shares no language with any of them. Message match is the first thing
// a visitor checks, and losing it wastes the click we just paid for.
const HERO: Record<LandingVariant, HeroContent> = {
  calculator: {
    eyebrow: "Free worksheet",
    title: (
      <>
        What is repeat work <em>costing you?</em>
      </>
    ),
    lead: "Two numbers and you will know. Then take the worksheet that finds every other task like it in your operation.",
    checks: [
      "Six steps, fifteen minutes, no tool to install",
      "Scores which tasks can actually be handed off",
      "Ends with one number: a year of doing it by hand",
    ],
    trustLine: "Built for teams with recurring operations, not solo operators.",
  },
  proof: {
    eyebrow: "Free worksheet",
    title: (
      <>
        $22,500 a month, <em>cut to $10,000.</em>
      </>
    ),
    lead: "One freight company. Sixteen recurring tasks handed to AI. This is the worksheet we used to find them, and it is yours free.",
    checks: [
      "Six steps, fifteen minutes, no tool to install",
      "Scores which tasks can actually be handed off",
      "Ends with one number: a year of doing it by hand",
    ],
    trustLine: "Built for teams with recurring operations, not solo operators.",
  },
};

const PROOF_METRICS = [
  { num: "$12,500", unit: "/mo saved" },
  { num: "56%", unit: "overhead cut" },
  { num: "16", unit: "tasks handed off" },
] as const;

export default async function AiOperationsAudit() {
  const variant = readVariant((await headers()).get(VARIANT_HEADER));

  return (
    <LandingShell
      variant={variant}
      hero={HERO}
      proofMetrics={PROOF_METRICS}
      magnet="operations_audit"
      worksheetHref="/worksheets/operations-audit"
      submitLabel="Get the Operations Audit"
    >
      <LandingSection
        eyebrow="What you get"
        title={
          <>
            A worksheet, not a <em>brochure.</em>
          </>
        }
      >
        <p className="lp-p">
          Fourteen pages you fill in, not fourteen pages you read.
        </p>
        <ul className="lp-checklist">
          <li>
            Three questions that surface most of your repeating work in five
            minutes
          </li>
          <li>
            A conversion table that turns &ldquo;twenty minutes a day&rdquo;
            into hours per year
          </li>
          <li>
            Fully loaded cost rates, so the number reflects what people actually
            cost
          </li>
          <li>
            A scoring method for how rule-shaped each task is, and whether it
            can be handed off at all
          </li>
          <li>
            An honest recovery factor, because saved hours are never fully
            recovered hours
          </li>
          <li>A sorting grid that tells you which single task to start with</li>
        </ul>
      </LandingSection>

      <LandingSection
        eyebrow="Why the task beats the tool"
        title={
          <>
            Pick the task first. Then pick the <em>software.</em>
          </>
        }
      >
        <p className="lp-p">
          Microsoft&rsquo;s 2026 Work Trend Index surveyed twenty thousand
          knowledge workers. It found that organizational factors, meaning how
          the work is designed and supported, account for 67% of AI&rsquo;s
          measured impact. Individual mindset and behavior account for 32%.
        </p>
        <p className="lp-p">
          Which task you choose matters more than which vendor you choose. This
          worksheet is about that first decision.
        </p>
      </LandingSection>
    </LandingShell>
  );
}
