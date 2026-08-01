import type { Metadata } from "next";
import { pageOpenGraph } from "../../seo";
import {
  OUTCOMES,
  QUADRANTS,
  SOURCES,
  STEPS,
  WORKED_EXAMPLE,
  type Block,
} from "../_data/operations-audit";
import {
  WorksheetNote,
  WorksheetSection,
  WorksheetShell,
} from "../worksheet-shell";

export const metadata: Metadata = {
  title: "The Operations Audit",
  description:
    "A free worksheet for putting a real number on the recurring work your team does by hand. Fifteen minutes, and one figure: what another year of doing it manually costs you.",
  alternates: { canonical: "/worksheets/operations-audit" },
  openGraph: pageOpenGraph({
    title: "The Operations Audit | Midnite Systems",
    description:
      "Find the work that shouldn't need a person, then price it. A fifteen minute worksheet for operating teams.",
    url: "/worksheets/operations-audit",
  }),
};

const usd = (n: number) => `$${n.toLocaleString("en-US")}`;

const GROSS = WORKED_EXAMPLE.reduce((sum, row) => sum + row.cost, 0);
const TOTAL_HOURS = WORKED_EXAMPLE.reduce((sum, row) => sum + row.hours, 0);

function BlockView({ block }: { block: Block }) {
  switch (block.kind) {
    case "lead":
      return <p className="ws-p ws-p-lead">{block.text}</p>;
    case "p":
      return <p className="ws-p">{block.text}</p>;
    case "note":
      return <WorksheetNote>{block.text}</WorksheetNote>;
    case "formula":
      return <p className="ws-formula">{block.text}</p>;
    case "list":
      return (
        <ul className="ws-list">
          {block.items.map((item) => (
            <li key={item}>{item}</li>
          ))}
        </ul>
      );
    case "fill":
      return (
        <p className="ws-fill">
          <span className="ws-fill-label">{block.label}</span>
          <span className="ws-fill-rule" aria-hidden="true" />
          {block.hint !== undefined && (
            <span className="ws-fill-hint">{block.hint}</span>
          )}
        </p>
      );
    case "table":
      return (
        <div className="ws-table-wrap">
          {block.table.caption !== undefined && (
            <p className="ws-table-caption">{block.table.caption}</p>
          )}
          <table className="ws-table">
            <thead>
              <tr>
                {block.table.head.map((cell) => (
                  <th key={cell}>{cell}</th>
                ))}
              </tr>
            </thead>
            <tbody>
              {block.table.rows.map((row, rowIndex) => (
                <tr key={`${row.join("|")}-${String(rowIndex)}`}>
                  {row.map((cell, cellIndex) => (
                    <td
                      key={`${cell}-${String(cellIndex)}`}
                      className={
                        block.table.numericFrom !== undefined &&
                        cellIndex >= block.table.numericFrom
                          ? "ws-num"
                          : undefined
                      }
                    >
                      {cell === "" ? (
                        <span className="ws-blank" aria-hidden="true" />
                      ) : (
                        cell
                      )}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      );
  }
}

export default function OperationsAudit() {
  return (
    <WorksheetShell
      eyebrow="Free worksheet"
      title={
        <>
          The Operations <em>Audit</em>
        </>
      }
      lead="You came here looking for a tool. That is the wrong first decision. The businesses getting returns from AI started by finding one piece of recurring work that was expensive, repetitive, and well understood, then handed that specific thing off. This worksheet finds those tasks in your operation and prices them."
      meta="6 steps · about 15 to 20 minutes · bring last week's calendar"
    >
      <WorksheetSection id="why" title="Why the task beats the tool">
        <p className="ws-p">
          There is a striking finding in Microsoft&rsquo;s 2026 Work Trend
          Index, a survey of twenty thousand knowledge workers across ten
          countries. Organizational factors account for 67% of AI&rsquo;s
          measured impact. Individual mindset and behavior account for 32%.
        </p>
        <p className="ws-p">
          Read that in practical terms. Two thirds of whether AI works for you
          is determined by how the work is designed and supported, not by which
          tool you bought or how enthusiastic your people are. Buying a
          subscription and handing it to your team is, statistically, the
          smaller half of the problem.
        </p>
        <p className="ws-p">
          The rest of the 2026 research says the same thing from different
          angles. MIT&rsquo;s analysis of enterprise deployments found returns
          were consistently stronger in operations and finance, while budgets
          overwhelmingly went to sales and marketing. The work that pays is the
          unglamorous, high-volume, rule-shaped work. Invoice reconciliation.
          Order entry. Status updates. Chasing paperwork.
        </p>
        <WorksheetNote>
          Nobody has ever been excited to buy software for that. Which is
          precisely why the returns are still sitting there. So this worksheet
          does not ask what tool you want. It asks where your hours go, which of
          those hours are rule-shaped, and what they cost.
        </WorksheetNote>
      </WorksheetSection>

      {STEPS.map((step) => (
        <WorksheetSection
          key={step.n}
          id={`step-${step.n}`}
          n={step.n}
          title={step.title}
        >
          {step.blocks.map((block, index) => (
            <BlockView key={`${block.kind}-${String(index)}`} block={block} />
          ))}
        </WorksheetSection>
      ))}

      <WorksheetSection id="sort" n={7} title="Sort">
        <p className="ws-p">
          Plot each task. Hours per year up the side, rule-shaped score across
          the bottom.
        </p>
        <div className="ws-quadrants">
          {QUADRANTS.map((quadrant) => (
            <div key={quadrant.title} className="ws-quadrant">
              <span className="ws-quadrant-axis">{quadrant.axis}</span>
              <h3 className="ws-h3">{quadrant.title}</h3>
              <p className="ws-quadrant-body">{quadrant.body}</p>
            </div>
          ))}
        </div>
      </WorksheetSection>

      <WorksheetSection id="example" title="Worked example">
        <p className="ws-p">
          A freight brokerage, eleven people, running on a TMS plus email plus a
          shared drive.
        </p>
        <div className="ws-table-wrap">
          <table className="ws-table">
            <thead>
              <tr>
                <th>Task</th>
                <th>Who</th>
                <th className="ws-num">Hours/yr</th>
                <th className="ws-num">Rate</th>
                <th className="ws-num">Annual cost</th>
                <th className="ws-num">Rule</th>
                <th className="ws-num">Blast</th>
              </tr>
            </thead>
            <tbody>
              {WORKED_EXAMPLE.map((row) => (
                <tr key={row.task}>
                  <td>{row.task}</td>
                  <td>{row.who}</td>
                  <td className="ws-num">{row.hours}</td>
                  <td className="ws-num">{usd(row.rate)}</td>
                  <td className="ws-num">{usd(row.cost)}</td>
                  <td className="ws-num">{row.rule}</td>
                  <td className="ws-num">{row.blast}</td>
                </tr>
              ))}
              <tr className="ws-table-total">
                <td colSpan={2}>Total</td>
                <td className="ws-num">{TOTAL_HOURS.toLocaleString("en-US")}</td>
                <td className="ws-num" />
                <td className="ws-num">{usd(GROSS)}</td>
                <td className="ws-num" />
                <td className="ws-num" />
              </tr>
            </tbody>
          </table>
        </div>
        <p className="ws-p">
          Gross: {usd(GROSS)} a year. Applying recovery factors task by task
          brings the net to roughly $33,000.
        </p>
        <p className="ws-p">
          Concentrated or scattered? Three of the five tasks belong to one
          operations coordinator, totaling 1,040 hours. That is half a role
          sitting in one person, and adding the report and reconciliation work
          pushes the cluster past 1,250. So: concentrated, and convertible.
        </p>
        <WorksheetNote>
          What they should do: order entry is high hours, rule-shaped 3, low
          blast radius. Unambiguously first. Invoice reconciliation is equally
          clean but high blast radius, so it goes second with a human approving
          before anything posts. What they should not do: all five at once.
        </WorksheetNote>
      </WorksheetSection>

      <WorksheetSection id="your-number" title="Your number">
        <p className="ws-fill">
          <span className="ws-fill-label">Gross annual cost</span>
          <span className="ws-fill-rule" aria-hidden="true" />
        </p>
        <p className="ws-fill">
          <span className="ws-fill-label">Net after recovery factors</span>
          <span className="ws-fill-rule" aria-hidden="true" />
        </p>
        <p className="ws-fill">
          <span className="ws-fill-label">The one task you would start with</span>
          <span className="ws-fill-rule" aria-hidden="true" />
        </p>
        <p className="ws-p">
          That net number is what one more year of doing this by hand costs you.
          It is not a sales figure and we did not choose the inputs. You did.
        </p>
        <WorksheetNote>
          It is probably conservative, because almost everybody underestimates
          task frequency and forgets the chase work entirely. And it excludes
          error cost, which for document-heavy operations is not small: industry
          estimates put the cost of resolving a single invoice error at up to
          $53.50, and manual data entry error rates typically run between 1% and
          4%. If your list is full of typing, add a line for that.
        </WorksheetNote>
      </WorksheetSection>

      <WorksheetSection id="what-to-do" title="What to do with it">
        <div className="ws-table-wrap">
          <table className="ws-table">
            <thead>
              <tr>
                <th>If your net number is</th>
                <th>Then</th>
              </tr>
            </thead>
            <tbody>
              {OUTCOMES.map((outcome) => (
                <tr key={outcome.range}>
                  <td className="ws-num">{outcome.range}</td>
                  <td>
                    <strong>{outcome.title}.</strong> {outcome.body}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <p className="ws-p">
          In every case, before you build anything, check three things. Can you
          get credentials to the systems involved, and how fast? Is there one
          person who can make decisions about this without a meeting? Can you
          measure your net number today, before anything changes? That last one
          is where most projects quietly fail, because a deployment that worked
          but cannot be proven gets canceled anyway.
        </p>
        <WorksheetNote>
          Those questions come from our companion worksheet, the AI Readiness
          Assessment. This one finds the task and prices it. That one tells you
          whether you are in a position to deploy it.
        </WorksheetNote>
      </WorksheetSection>

      <WorksheetSection id="sources" title="Sources and method">
        <ol className="ws-sources">
          {SOURCES.map((source) => (
            <li key={source}>{source}</li>
          ))}
        </ol>
        <WorksheetNote>
          On numbers we left out: several widely circulated figures about hours
          lost to repetitive work, ranging from 41% to 62% of the working week,
          trace back to sources we could not verify and disagree with each other
          by a factor of nearly two. We left them out. This worksheet uses your
          numbers rather than a benchmark for the same reason: a benchmark that
          is wrong for your business produces a confident answer in the wrong
          direction.
        </WorksheetNote>
      </WorksheetSection>
    </WorksheetShell>
  );
}
