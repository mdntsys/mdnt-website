import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "../../hero-nav";
import { pageOpenGraph } from "../../seo";

export const metadata: Metadata = {
  title: "Custom Workspace Build",
  description:
    "A client-specific UI or app layer connected to the platform. Your own internal portal where your team and AI employees work side by side.",
  alternates: { canonical: "/solutions/custom-workspace-build" },
  openGraph: pageOpenGraph({
    title: "Custom Workspace Build | Midnite Systems",
    description:
      "Your own internal portal where your team and AI employees work side by side.",
    url: "/solutions/custom-workspace-build",
  }),
};

export default function CustomWorkspaceBuild() {
  return (
    <>
      <HeroNav />

      <main className="page-shell">
        <section className="page-hero">
          <div className="section-inner">
            <Link href="/solutions" className="back-link reveal">
              ← All solutions
            </Link>
            <div className="page-hero-header reveal reveal-delay-1">
              <span className="section-eyebrow">
                Solution, workspace layer
              </span>
              <h1 className="page-h1">
                Custom <em>Workspace</em> Build
              </h1>
              <p className="page-lead">
                A client-specific UI or app layer connected to the
                platform: your own internal portal where your team and AI
                employees work side by side.
              </p>
            </div>
          </div>
        </section>

        <section className="page-section">
          <div className="section-inner">
            <div className="detail-grid">
              <div className="detail-main reveal">
                <span className="section-eyebrow">What it is</span>
                <h2 className="detail-h2">
                  The software your operation has been <em>asking for.</em>
                </h2>
                <p className="detail-p">
                  A Custom Workspace is your own branded interface sitting
                  on top of the Midnite platform. Your team logs in to
                  queue work, review what the AI did, kick off jobs, and
                  see live state. AI employees work inside the same
                  workspace, so the system feels like one tool, not five.
                </p>
                <p className="detail-p">
                  No subscription sprawl. No spreadsheet load-bearing
                  infrastructure. One portal, designed around how your team
                  actually works.
                </p>
              </div>

              <aside className="detail-aside reveal reveal-delay-2">
                <div className="bezel-outer">
                  <div className="bezel-inner">
                    <span className="card-eyebrow">
                      When it&apos;s the <em>right call</em>
                    </span>
                    <ul className="card-checklist">
                      <li>
                        You&apos;re juggling five tools that still
                        don&apos;t talk to each other
                      </li>
                      <li>
                        Spreadsheets have become load-bearing infrastructure
                      </li>
                      <li>
                        Your team needs a single place to review and
                        oversee AI work
                      </li>
                      <li>
                        Off-the-shelf SaaS doesn&apos;t fit the way your
                        operation actually runs
                      </li>
                    </ul>
                  </div>
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="page-section page-section--alt">
          <div className="section-inner">
            <div className="detail-roadmap reveal">
              <span className="section-eyebrow">How it fits the Roadmap</span>
              <h2 className="detail-h2">
                The interface for everything else we <em>run.</em>
              </h2>
              <p className="detail-p">
                A Custom Workspace usually follows or runs alongside a
                Custom Employee Build. The Roadmap defines what your team
                needs visibility and control over; the Workspace makes that
                day-to-day. It joins the managed operating layer too,
                evolving as your business does.
              </p>
              <Link href="/discovery" className="btn-primary">
                Book a discovery call
                <span className="icon-wrap">
                  <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                    <path
                      d="M2.5 6h7M6.5 3l3 3-3 3"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
              </Link>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
