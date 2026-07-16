import type { Metadata } from "next";
import Link from "next/link";
import { HeroNav } from "../hero-nav";
import { pageOpenGraph } from "../seo";

export const metadata: Metadata = {
  title: "Solutions",
  description:
    "Three ways Midnite Systems deploys AI inside your business: Custom Employee Build, Custom Workspace Build, and AI Strategy Support. All sit on top of the Roadmap.",
  alternates: { canonical: "/solutions" },
  openGraph: pageOpenGraph({
    title: "Solutions | Midnite Systems",
    description:
      "Three ways Midnite Systems deploys AI inside your business: Custom Employee Build, Custom Workspace Build, and AI Strategy Support.",
    url: "/solutions",
  }),
};

export default function SolutionsIndex() {
  return (
    <>
      <HeroNav />

      <main className="page-shell">
        <section className="page-hero">
          <div className="section-inner">
            <div className="page-hero-header reveal">
              <span className="section-eyebrow">Solutions</span>
              <h1 className="page-h1">
                How we <em>deploy</em>.
              </h1>
              <p className="page-lead">
                Everything below sits on top of the Roadmap. Pick the one
                that fits, or talk to us about a combination.
              </p>
            </div>
          </div>
        </section>

        <section id="solutions">
          <div className="section-inner">
            <div className="solutions-grid">
              <div className="bezel-outer reveal reveal-delay-1">
                <div className="bezel-inner">
                  <div className="card-header">
                    <div className="service-icon service-icon-replace">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#F5A800"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <circle cx="12" cy="8" r="4" />
                        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
                      </svg>
                    </div>
                    <span className="card-eyebrow">
                      The <em>role</em> layer
                    </span>
                  </div>
                  <h2 className="service-title">
                    Custom <em>Employee</em> Build
                  </h2>
                  <p className="card-solution">
                    Bespoke AI employees deployed into your operation:
                    junior, specialist, or executive. Drawn from our task
                    library and tuned to how your business actually runs.
                  </p>
                  <Link
                    href="/solutions/custom-employee-build"
                    className="btn-ghost card-cta"
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="bezel-outer reveal reveal-delay-2">
                <div className="bezel-inner">
                  <div className="card-header">
                    <div className="service-icon service-icon-empower">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#D4900A"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <rect x="3" y="3" width="7" height="7" />
                        <rect x="14" y="3" width="7" height="7" />
                        <rect x="14" y="14" width="7" height="7" />
                        <rect x="3" y="14" width="7" height="7" />
                      </svg>
                    </div>
                    <span className="card-eyebrow">
                      The <em>workspace</em> layer
                    </span>
                  </div>
                  <h2 className="service-title">
                    Custom <em>Workspace</em> Build
                  </h2>
                  <p className="card-solution">
                    A client-specific UI or app layer connected to the
                    platform: your own internal portal where your team and
                    AI employees work side by side.
                  </p>
                  <Link
                    href="/solutions/custom-workspace-build"
                    className="btn-ghost card-cta"
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>

              <div className="bezel-outer reveal reveal-delay-3">
                <div className="bezel-inner">
                  <div className="card-header">
                    <div className="service-icon service-icon-replace">
                      <svg
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="#F5A800"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                        <path d="M9 18h6" />
                        <path d="M10 22h4" />
                      </svg>
                    </div>
                    <span className="card-eyebrow">
                      The <em>strategy</em> layer
                    </span>
                  </div>
                  <h2 className="service-title">
                    AI <em>Strategy</em> Support
                  </h2>
                  <p className="card-solution">
                    Ongoing strategic consulting beyond the Roadmap.
                    Available as dedicated hours or on-demand. Steady
                    guidance as your business and the AI landscape evolve.
                  </p>
                  <Link
                    href="/solutions/ai-strategy-support"
                    className="btn-ghost card-cta"
                  >
                    Learn more
                    <span aria-hidden="true">→</span>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section id="cta">
          <div className="section-inner">
            <div className="cta-bezel-outer reveal">
              <div className="cta-bezel-inner">
                <div className="cta-glow" />
                <h2 className="cta-h2">
                  Not sure where
                  <br />
                  to <em>start?</em>
                </h2>
                <p className="cta-sub">
                  Book a 30-minute discovery call. We&apos;ll map your
                  operation together and figure out which of these (if any)
                  is the right first move.
                </p>
                <div className="cta-actions">
                  <Link href="/discovery" className="btn-primary">
                    Book a discovery call
                    <span className="icon-wrap">
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                      >
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
                  <Link href="/#process" className="btn-ghost">
                    How we work
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
