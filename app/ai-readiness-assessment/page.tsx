import type { Metadata } from "next";
import { pageOpenGraph } from "../seo";
import { LandingSection, LandingShell } from "../landing/landing-shell";

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

export default function AiReadinessAssessmentLanding() {
  return (
    <LandingShell
      eyebrow="Free assessment · 20 questions"
      title={
        <>
          Are you actually ready to <em>deploy</em> AI?
        </>
      }
      lead={
        <>
          <p>
            Most businesses your size have already tried AI somewhere. Most of
            it has not paid for itself yet. That is not a failure of nerve or of
            technology. It is almost always a failure of preconditions, and
            preconditions are knowable before you spend anything.
          </p>
          <p>
            This AI readiness assessment scores five of them across twenty
            questions. You will finish with a number, a tier, and a clear answer
            about whether to proceed.
          </p>
        </>
      }
      trustLine="Fifteen minutes. Built for operating businesses with a team and real systems to connect."
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
