import type { Metadata } from "next";
import { pageOpenGraph } from "../../seo";
import { DIMENSIONS, SOURCES, TIERS } from "../_data/ai-readiness";
import {
  WorksheetNote,
  WorksheetSection,
  WorksheetShell,
} from "../worksheet-shell";

export const metadata: Metadata = {
  title: "The AI Readiness Assessment",
  description:
    "A free 20-question AI readiness assessment for operating businesses. Five dimensions, scored in fifteen minutes, with an honest answer about whether to proceed.",
  alternates: { canonical: "/worksheets/ai-readiness-assessment" },
  openGraph: pageOpenGraph({
    title: "The AI Readiness Assessment | Midnite Systems",
    description:
      "Twenty questions across five dimensions. Fifteen minutes, and an honest answer about whether you are ready to deploy AI.",
    url: "/worksheets/ai-readiness-assessment",
  }),
};

export default function AiReadinessAssessment() {
  return (
    <WorksheetShell
      eyebrow="Free assessment"
      title={
        <>
          The AI Readiness <em>Assessment</em>
        </>
      }
      lead="Most businesses your size have already tried AI somewhere. Most of it has not paid for itself yet. That is not a failure of nerve or of technology. It is almost always a failure of preconditions, and preconditions are knowable before you spend anything. This scores five of them."
      meta="20 questions · about 15 minutes · scored 0 to 3"
    >
      <WorksheetSection id="why" title="Why this exists">
        <p className="ws-p">
          The interesting number in 2026 is not how many businesses use AI. It
          is the gap between how many use it and how many can point to what it
          earned.
        </p>
        <p className="ws-p">
          Adoption is effectively settled. 86% of middle-market organizations
          have partially or fully integrated AI into operations, and 97% report
          being satisfied with the investment. Then there is the other set of
          numbers. MIT&rsquo;s NANDA initiative found that 95% of generative AI
          pilots produced no measurable impact on profit and loss. An analysis
          of enterprise deployments put the share that never reach production at
          88%. RAND found more than 80% of AI projects fail, roughly twice the
          failure rate of conventional IT work. Gartner expects organizations to
          abandon 60% of AI projects not supported by AI-ready data, and
          separately predicts that more than 40% of agentic AI projects will be
          canceled by the end of 2027.
        </p>
        <p className="ws-p">
          Both sets are true at once. Companies are satisfied and most projects
          are not paying. The honest reading is that satisfaction is being
          measured against expectations that were never tied to a number, which
          is itself one of the failure modes.
        </p>
        <WorksheetNote>
          A word on the 95%. That figure comes from 52 executive interviews, 153
          survey responses, and 300 public deployments. It is directional, not
          definitive, and it has been fairly criticized for it. We cite it
          because four independent studies using different methods all land
          between 60% and 95%. The exact number is arguable. The pattern is not.
        </WorksheetNote>
      </WorksheetSection>

      <WorksheetSection id="not-random" title="The failures are not random">
        <p className="ws-p">
          If AI projects failed for unpredictable reasons, an assessment like
          this would be pointless. They do not. RAND&rsquo;s five root causes
          are: the problem was misunderstood, the data was inadequate, the
          technology came before the use case, the infrastructure could not
          support it, and the problem was simply too hard. Four of those five
          are knowable in an afternoon. None are about model quality.
        </p>
        <p className="ws-p">
          The middle-market survey ranks the barriers the same way. Data quality
          issues, 53%. Integration challenges, 47%. Unclear ROI, 33%. Security
          and compliance, 33%. Notice what is absent from every one of these
          lists. Nobody says the models are not good enough.
        </p>
        <WorksheetNote>
          The most common reason a pilot fails to survive contact with
          production is that the pilot ran on a clean, curated dataset that does
          not exist in the real business. The demo worked. The demo was the
          problem.
        </WorksheetNote>
      </WorksheetSection>

      <WorksheetSection id="how-to-use" title="How to use this">
        <p className="ws-p">
          Five dimensions. Four questions each. Score every question 0 to 3.
        </p>
        <p className="ws-p">
          <strong>Answer for one specific task, not for your company in
          general.</strong>{" "}
          Pick the single piece of recurring work you would most like to stop
          paying a person to do, and hold it in mind for all twenty questions.
          Readiness is not a property of a business, it is a property of a
          business and a particular task together. The same company can be
          completely ready for one thing and hopeless at another.
        </p>
        <p className="ws-p">
          If you cannot name that task, stop here. That is your answer, and
          Dimension One explains what to do about it.
        </p>
        <WorksheetNote>
          Score honestly. The scoring exists to tell you what to fix. Inflating
          it produces a nicer number and a worse decision. Where you are unsure
          between two scores, take the lower one.
        </WorksheetNote>
      </WorksheetSection>

      {DIMENSIONS.map((dimension) => (
        <WorksheetSection
          key={dimension.n}
          id={`dimension-${dimension.n}`}
          n={dimension.n}
          title={dimension.title}
          standfirst={dimension.standfirst}
        >
          <ol className="ws-questions">
            {dimension.questions.map((question) => (
              <li key={question.n} className="ws-question">
                <div className="ws-question-head">
                  <span className="ws-question-n">{question.n}</span>
                  <p className="ws-question-prompt">{question.prompt}</p>
                  <span className="ws-score-box" aria-hidden="true" />
                </div>
                <ul className="ws-options">
                  {question.options.map((option) => (
                    <li key={option.score} className="ws-option">
                      <span className="ws-option-score">{option.score}</span>
                      <span>{option.label}</span>
                    </li>
                  ))}
                </ul>
                {question.note !== undefined && (
                  <p className="ws-question-note">{question.note}</p>
                )}
              </li>
            ))}
          </ol>
          <p className="ws-subtotal">
            Dimension {dimension.n} subtotal
            <span className="ws-subtotal-box" aria-hidden="true" />
            <span className="ws-subtotal-max">/ 12</span>
          </p>
        </WorksheetSection>
      ))}

      <WorksheetSection id="score" title="Your score">
        <p className="ws-total">
          Total
          <span className="ws-total-box" aria-hidden="true" />
          <span className="ws-subtotal-max">/ 60</span>
        </p>
        <div className="ws-table-wrap">
          <table className="ws-table">
            <thead>
              <tr>
                <th>Score</th>
                <th>Tier</th>
                <th>What it means</th>
              </tr>
            </thead>
            <tbody>
              {TIERS.map((tier) => (
                <tr key={tier.range}>
                  <td className="ws-num">{tier.range}</td>
                  <td>
                    <strong>{tier.name}</strong>
                  </td>
                  <td>{tier.meaning}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <WorksheetNote>
          Also check your lowest single dimension. A total of 45 with one
          dimension at 4 out of 12 is not a 45. The weak dimension governs. Data
          at 4 out of 12 will sink a deployment that every other column says is
          ready, which is precisely the Gartner finding: it is not the average
          that abandons projects, it is the data.
        </WorksheetNote>
      </WorksheetSection>

      <WorksheetSection id="what-to-do" title="What to do at each tier">
        {TIERS.map((tier) => (
          <div key={tier.range} className="ws-tier">
            <h3 className="ws-h3">
              <span className="ws-tier-range">{tier.range}</span> {tier.name}
            </h3>
            <ul className="ws-list">
              {tier.advice.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </div>
        ))}
      </WorksheetSection>

      <WorksheetSection id="next" title="What we would do next">
        <p className="ws-p">
          We wrote this assessment because it is the first hour of every
          engagement we run, and because the failure statistics above describe a
          market where most of the spending is wasted on preconditions nobody
          checked.
        </p>
        <p className="ws-p">
          <strong>If you scored under 24</strong>, we are not the right call
          yet. Fix the three things in the first tier and come back. We would
          rather tell you that now than take your money and discover it in week
          three.
        </p>
        <p className="ws-p">
          <strong>If you scored 24 or above</strong>, the natural next step is a
          conversation about the specific task you had in mind.
        </p>
        <WorksheetNote>
          Two things we do differently, both straight from the research above.
          We do not charge setup or build fees, because the first month covers
          deployment. And every deployment we run puts a human approval step in
          front of anything that commits, because that is the difference between
          an agent and a liability.
        </WorksheetNote>
      </WorksheetSection>

      <WorksheetSection id="sources" title="Sources and method">
        <ol className="ws-sources">
          {SOURCES.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ol>
        <WorksheetNote>
          Figures current as of August 2026. Where studies disagree we have said
          so rather than picking the most alarming number.
        </WorksheetNote>
      </WorksheetSection>
    </WorksheetShell>
  );
}
