import type { Metadata } from "next";
import { pageOpenGraph } from "../seo";
import { LandingSection, LandingShell } from "../landing/landing-shell";

export const metadata: Metadata = {
  title: "Operations Audit: Price the Work Before You Buy the Tool",
  description:
    "A free worksheet for putting a real number on the recurring work your team does by hand. Fifteen minutes, no tool required.",
  alternates: { canonical: "/ai-operations-audit" },
  openGraph: pageOpenGraph({
    title: "Price the Work Before You Buy the Tool | Midnite Systems",
    description:
      "A free worksheet for putting a real number on the recurring work your team does by hand.",
    url: "/ai-operations-audit",
  }),
};

export default function AiOperationsAudit() {
  return (
    <LandingShell
      eyebrow="Free worksheet"
      title={
        <>
          Price the work before you buy the <em>tool.</em>
        </>
      }
      lead={
        <>
          <p>
            Most businesses shopping for AI start by picking software. The ones
            that get a return start by finding the single piece of recurring
            work that is expensive, repetitive, and well understood, then
            handing that specific thing off.
          </p>
          <p>
            This worksheet finds those tasks in your operation and prices them.
            At the end you have one number: what another year of doing this by
            hand costs you.
          </p>
        </>
      }
      trustLine="Fifteen minutes. Built for teams with recurring operations, not solo operators."
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
          <li>
            A sorting grid that tells you which single task to start with
          </li>
        </ul>
      </LandingSection>

      <LandingSection
        eyebrow="Why the task beats the tool"
        title={
          <>
            Two thirds of the outcome is decided before you pick{" "}
            <em>software.</em>
          </>
        }
      >
        <p className="lp-p">
          Microsoft&rsquo;s 2026 Work Trend Index surveyed twenty thousand
          knowledge workers across ten countries. It found that organizational
          factors, meaning how the work is designed and supported, account for
          67% of AI&rsquo;s measured impact. Individual mindset and behavior
          account for 32%.
        </p>
        <p className="lp-p">
          In practice that means buying a subscription and handing it to your
          team is the smaller half of the problem. Which task you choose, and
          whether it was ever properly defined, matters more than which vendor
          you choose. This worksheet is about the first decision.
        </p>
      </LandingSection>
    </LandingShell>
  );
}
