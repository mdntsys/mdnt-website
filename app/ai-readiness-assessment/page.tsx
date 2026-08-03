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

// Slug is an exact match on "ai readiness assessment": 1,400 searches a month
// at keyword difficulty 12, and a literal description of the $2,500 AI Audit.
// The best keyword in the plan, and the one page here that could plausibly
// rank organically without a link-building campaign. Do not rename it.

export const metadata: Metadata = {
  title: "AI Readiness Assessment: A 20-Question Diagnostic",
  description:
    "A free AI readiness assessment for operating businesses. Twenty questions across five dimensions, scored in fifteen minutes.",
  alternates: { canonical: "/ai-readiness-assessment" },
  openGraph: pageOpenGraph({
    title: "AI Readiness Assessment | Midnite Systems",
    description:
      "Twenty questions across five dimensions, scored in fifteen minutes, with an honest answer about whether to proceed.",
    url: "/ai-readiness-assessment",
  }),
};

// Ad groups B and C bid on "ai readiness assessment", "ai strategy consulting"
// and "ai consultant". Both headlines below use those words. The previous
// headline, "Are you actually ready to deploy AI?", asked a question the
// searcher had already answered by searching.
const HERO: Record<LandingVariant, HeroContent> = {
  calculator: {
    eyebrow: "Free assessment",
    title: (
      <>
        What is manual work <em>costing you?</em>
      </>
    ),
    lead: "Start with the number. Then score your AI readiness across five dimensions and find out whether that money is recoverable yet.",
    checks: [
      "Twenty questions across five dimensions",
      "Scored zero to three, about one specific task",
      "Fifteen minutes, and an honest answer",
    ],
    trustLine:
      "Built for operating businesses with a team and real systems to connect.",
  },
  proof: {
    eyebrow: "Free assessment",
    title: (
      <>
        95% of AI pilots return <em>nothing.</em>
      </>
    ),
    lead: "The failures are predictable. Twenty questions across five dimensions tell you which side of that number you are on, before you spend anything.",
    checks: [
      "Twenty questions across five dimensions",
      "Scored zero to three, about one specific task",
      "Fifteen minutes, and an honest answer",
    ],
    trustLine:
      "Built for operating businesses with a team and real systems to connect.",
  },
};

const PROOF_METRICS = [
  { num: "95%", unit: "of pilots return $0" },
  { num: "53%", unit: "blocked by data quality" },
  { num: "5", unit: "dimensions scored" },
] as const;

export default async function AiReadinessAssessmentLanding() {
  const variant = readVariant((await headers()).get(VARIANT_HEADER));

  return (
    <LandingShell
      variant={variant}
      hero={HERO}
      proofMetrics={PROOF_METRICS}
      magnet="ai_readiness_assessment"
      worksheetHref="/worksheets/ai-readiness-assessment"
      submitLabel="Get the assessment"
    >
      <LandingSection
        eyebrow="The five dimensions"
        title={
          <>
            Readiness is not a feeling. It is <em>five things.</em>
          </>
        }
      >
        <ul className="lp-checklist">
          <li>
            <strong>The Work.</strong> Is the task defined well enough to hand
            to anyone, human or otherwise
          </li>
          <li>
            <strong>The Data.</strong> Where it lives, how fast you can get it,
            and whether it is right
          </li>
          <li>
            <strong>The Systems.</strong> APIs, integrations, and who actually
            controls access
          </li>
          <li>
            <strong>The People.</strong> Ownership, appetite, and who reviews
            the output
          </li>
          <li>
            <strong>The Economics.</strong> What it costs today, and whether you
            can prove it changed
          </li>
        </ul>
        <p className="lp-p">
          Twenty questions, scored zero to three, answered about one specific
          task rather than about your company in general. Readiness is a
          property of a business and a particular task together. The same
          company is often completely ready for one thing and hopeless at
          another.
        </p>
      </LandingSection>

      <LandingSection
        eyebrow="Why this exists"
        title={
          <>
            Adoption is settled. <em>Returns are not.</em>
          </>
        }
      >
        <p className="lp-p">
          86% of middle-market organizations have integrated AI into operations,
          and 97% report being satisfied with it. Meanwhile MIT found that 95%
          of generative AI pilots produced no measurable impact on profit and
          loss, and Gartner expects more than 40% of agentic AI projects to be
          canceled by the end of 2027.
        </p>
        <p className="lp-p">
          Both things are true at once. The failures are not random and they are
          not about model quality. Asked what blocks them, leaders name data
          quality at 53%, integration at 47%, unclear ROI at 33%. Every one of
          those is knowable in an afternoon, which is what this assessment is
          for.
        </p>
      </LandingSection>
    </LandingShell>
  );
}
