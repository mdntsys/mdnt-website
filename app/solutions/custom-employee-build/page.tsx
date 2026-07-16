import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "../../hero-nav";
import { pageOpenGraph } from "../../seo";

export const metadata: Metadata = {
  title: "Custom Employee Build",
  description:
    "Bespoke AI employees deployed into your operation: junior, specialist, or executive. Drawn from our task library and tuned to how your business actually runs.",
  alternates: { canonical: "/solutions/custom-employee-build" },
  openGraph: pageOpenGraph({
    title: "Custom Employee Build | Midnite Systems",
    description:
      "Bespoke AI employees deployed into your operation. Drawn from our task library and tuned to how your business actually runs.",
    url: "/solutions/custom-employee-build",
  }),
};

export default function CustomEmployeeBuild() {
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
              <span className="section-eyebrow">Solution, role layer</span>
              <h1 className="page-h1">
                Custom <em>Employee</em> Build
              </h1>
              <p className="page-lead">
                Bespoke AI employees deployed into your operation: junior,
                specialist, or executive. Drawn from our task library and
                tuned to how your business actually runs.
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
                  An employee, <em>not</em> a chatbot.
                </h2>
                <p className="detail-p">
                  A Custom Employee is a fully scoped AI hire: a role
                  definition, a workflow, integrations into the tools your
                  team already uses, and a measurable output. We start from
                  our internal task library, then tune the skills, voice,
                  and judgment to your business.
                </p>
                <p className="detail-p">
                  Once deployed, the employee runs on the managed operating
                  layer: monitored, retrained, and improved over time as
                  your business changes.
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
                        You need a specialist role filled but can&apos;t
                        find or justify the hire
                      </li>
                      <li>
                        Your best people are buried in tasks below their
                        pay grade
                      </li>
                      <li>
                        You&apos;ve already mapped the role and know
                        exactly what good looks like
                      </li>
                      <li>
                        You want measurable output, not a tool your team
                        has to manage
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
                Built on top of the <em>Roadmap.</em>
              </h2>
              <p className="detail-p">
                Every Custom Employee Build starts with the Roadmap. We
                identify which role earns its keep first, scope the
                workflow, and deploy a working employee against a defined
                success metric. From there it joins the managed operating
                layer alongside anything else we run for you.
              </p>
              <p className="detail-p">
                This is the engagement behind our{" "}
                <Link
                  href="/case-studies/dsi-transportation"
                  className="case-copy-link"
                >
                  DSI Transportation case study
                </Link>
                : sixteen recurring tasks replaced, $12,500 a month
                saved, first live agent in four weeks.
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
