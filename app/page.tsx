import Image from "next/image";
import { RevealObserver } from "./reveal-observer";
import { SmoothScroll } from "./smooth-scroll";
import { HeroType } from "./hero-type";
import { HeroNav } from "./hero-nav";
import { HeroParallax } from "./hero-parallax";

export default function Home() {
  return (
    <>
      <SmoothScroll />
      <HeroType />
      <HeroParallax />
      <div className="orb orb-1" />
      <div className="orb orb-2" />
      <div className="orb orb-3" />

      <HeroNav />

      <main>
        <section id="hero">
          <video
            className="hero-video"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
          >
            <source src="/hero-bg.mp4" type="video/mp4" />
          </video>
          <div className="hero-video-overlay" />
          <div className="hero-grain" />

          <div className="hero-content">
            <h1 className="hero-h1">
              <span className="type-line">Custom AI</span>
              <span className="type-line">Deployment for</span>
              <span className="type-line">
                <em>growing</em> businesses
              </span>
            </h1>

            <p className="hero-sub">
              We integrate AI inside your organization the way a great
              operator would. Replace repetitive workflows bleeding your
              team, or upgrade the people you already have with the tools
              they&apos;ve been missing.
            </p>

            <div className="hero-actions">
              <a href="#solutions" className="btn-primary">
                Explore Solutions
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
              </a>
              <a href="#why" className="btn-ghost">
                How we work
              </a>
            </div>
          </div>

          <div className="scroll-hint">
            <div className="scroll-line" />
            <span>Scroll</span>
          </div>
        </section>

        <div className="divider" />

        <section id="solutions">
          <div className="section-inner">
            <div className="solutions-header reveal">
              <span className="section-eyebrow">Our Solutions</span>
              <h2 className="solutions-h2">
                Two paths.
                <br />
                One <em>deployment</em> partner.
              </h2>
            </div>

            <div className="journey">
              <div className="journey-trunk" aria-hidden="true">
                <div className="journey-trunk-fill" />
              </div>

              <div className="journey-branch" data-branch="replace">
                <div className="journey-spur" aria-hidden="true" />
                <div className="branch-node">
                  <div className="branch-node-meta">
                    <span className="branch-dot" />
                    <span className="branch-node-kicker">Branch 01</span>
                  </div>
                  <h3 className="branch-node-title">
                    Replacing <em>personnel</em>
                  </h3>
                </div>

                <div className="branch-services">
                  <div className="bezel-outer">
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
                            <rect x="3" y="3" width="8" height="8" rx="2" />
                            <path d="M7 11v4a2 2 0 0 0 2 2h4" />
                            <rect x="13" y="13" width="8" height="8" rx="2" />
                          </svg>
                        </div>
                        <span className="card-eyebrow">
                          The <em>task</em> layer
                        </span>
                      </div>
                      <h4 className="service-title">
                        Workflow <em>automation</em>
                      </h4>
                      <div className="card-section">
                        <span className="card-section-label">
                          This is for you if:
                        </span>
                        <ul className="card-checklist">
                          <li>
                            Your team spends hours each week moving data
                            between systems
                          </li>
                          <li>
                            Repetitive work is stealing focus from the work
                            that actually moves the business
                          </li>
                        </ul>
                      </div>
                      <div className="card-section">
                        <span className="card-section-label">
                          We solve this by:
                        </span>
                        <p className="card-solution">
                          Deploying autonomous agents that handle end-to-end
                          workflows, from lead qualification to data entry,
                          so your team never touches the busywork again.
                        </p>
                      </div>
                      <a href="#" className="btn-ghost card-cta">
                        Learn more
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>

                  <div className="bezel-outer">
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
                      <h4 className="service-title">
                        Build your <em>dream</em> employee
                      </h4>
                      <div className="card-section">
                        <span className="card-section-label">
                          This is for you if:
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
                        </ul>
                      </div>
                      <div className="card-section">
                        <span className="card-section-label">
                          We solve this by:
                        </span>
                        <p className="card-solution">
                          Training a custom AI agent around the exact role
                          you&apos;d hire for. A tireless specialist that
                          onboards in days, fits your playbook, and never
                          churns.
                        </p>
                      </div>
                      <a href="#" className="btn-ghost card-cta">
                        Learn more
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="journey-branch" data-branch="empower">
                <div className="journey-spur" aria-hidden="true" />
                <div className="branch-node">
                  <div className="branch-node-meta">
                    <span className="branch-dot" />
                    <span className="branch-node-kicker">Branch 02</span>
                  </div>
                  <h3 className="branch-node-title">
                    Empowering <em>personnel</em>
                  </h3>
                </div>

                <div className="branch-services">
                  <div className="bezel-outer">
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
                      <h4 className="service-title">
                        Customized <em>platforms</em>
                      </h4>
                      <div className="card-section">
                        <span className="card-section-label">
                          This is for you if:
                        </span>
                        <ul className="card-checklist">
                          <li>
                            You&apos;re juggling five tools that still
                            don&apos;t talk to each other
                          </li>
                          <li>
                            Spreadsheets have become load-bearing
                            infrastructure
                          </li>
                        </ul>
                      </div>
                      <div className="card-section">
                        <span className="card-section-label">
                          We solve this by:
                        </span>
                        <p className="card-solution">
                          Building internal tools designed around how your
                          team actually works. The software your operation
                          has been asking for, without the subscription
                          sprawl.
                        </p>
                      </div>
                      <a href="#" className="btn-ghost card-cta">
                        Learn more
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>

                  <div className="bezel-outer">
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
                            <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8S1 12 1 12z" />
                            <circle cx="12" cy="12" r="3" />
                          </svg>
                        </div>
                        <span className="card-eyebrow">
                          The <em>visibility</em> layer
                        </span>
                      </div>
                      <h4 className="service-title">
                        Decision <em>intelligence</em>
                      </h4>
                      <div className="card-section">
                        <span className="card-section-label">
                          This is for you if:
                        </span>
                        <ul className="card-checklist">
                          <li>
                            You&apos;re making calls on stale numbers or gut
                            feel
                          </li>
                          <li>
                            The numbers you need live in five different
                            systems nobody can reconcile
                          </li>
                        </ul>
                      </div>
                      <div className="card-section">
                        <span className="card-section-label">
                          We solve this by:
                        </span>
                        <p className="card-solution">
                          Engineering dashboards and reports around the
                          metrics you actually make decisions on. Real-time
                          clarity, zero spreadsheet archaeology.
                        </p>
                      </div>
                      <a href="#" className="btn-ghost card-cta">
                        Learn more
                        <span aria-hidden="true">→</span>
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div
                id="consulting"
                className="journey-branch"
                data-branch="consulting"
              >
                <div className="journey-spur" aria-hidden="true" />
                <div className="branch-node">
                  <div className="branch-node-meta">
                    <span className="branch-dot" />
                    <span className="branch-node-kicker">
                      Additional Service
                    </span>
                  </div>
                  <h3 className="branch-node-title">
                    AI <em>consulting</em>
                  </h3>
                </div>

                <div className="branch-services branch-services--single">
                  <div className="bezel-outer">
                    <div className="bezel-inner consulting-inner">
                      <div className="consulting-icon service-icon service-icon-replace">
                        <svg
                          width="22"
                          height="22"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="#F5A800"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        >
                          <path d="M9 18h6" />
                          <path d="M10 22h4" />
                          <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
                        </svg>
                      </div>
                      <div className="consulting-copy">
                        <p className="service-desc">
                          Not ready to deploy? Start with a strategy session.
                          We audit your workflows, identify the
                          highest-leverage AI opportunities, and map a
                          deployment plan you can act on, with or without
                          us.
                        </p>
                      </div>
                      <a href="#cta" className="btn-ghost consulting-cta">
                        Book a session
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section id="why">
          <div className="section-inner">
            <div className="why-grid">
              <div>
                <span className="section-eyebrow reveal">
                  Why Midnite Systems
                </span>
                <h2 className="why-h2 reveal reveal-delay-1">
                  Obsessed with
                  <br />
                  <em>outcomes,</em>
                  <br />
                  not deliverables.
                </h2>
                <p className="why-p reveal reveal-delay-2">
                  Most agencies ship work and move on. We architect systems
                  that compound, where every AI deployment makes the next one
                  sharper and every workflow we touch gets easier for your
                  team to run.
                </p>

                <ul className="pillar-list">
                  <li className="pillar-item reveal reveal-delay-2">
                    <span className="pillar-num">01</span>
                    <div className="pillar-content">
                      <h3>Built for Real Operations</h3>
                      <p>
                        Every deployment is engineered for the real complexity
                        of running a growing business: security, reliability,
                        and scale without the enterprise bloat.
                      </p>
                    </div>
                  </li>
                  <li className="pillar-item reveal reveal-delay-3">
                    <span className="pillar-num">02</span>
                    <div className="pillar-content">
                      <h3>Full-Stack Ownership</h3>
                      <p>
                        From strategy through deployment and optimization, we
                        own the outcome. One partner. Zero handoff friction.
                      </p>
                    </div>
                  </li>
                  <li className="pillar-item reveal reveal-delay-4">
                    <span className="pillar-num">03</span>
                    <div className="pillar-content">
                      <h3>AI-Native by Default</h3>
                      <p>
                        We don&apos;t bolt AI onto existing workflows. We
                        design with intelligence as a first-class citizen at
                        every layer.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>

              <div className="stats-grid reveal reveal-delay-2">
                <div className="stat-cell">
                  <div className="stat-number">B2B</div>
                  <div className="stat-label">Deployment focused</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-number">2</div>
                  <div className="stat-label">Deployment paths</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-number">∞</div>
                  <div className="stat-label">Scalable</div>
                </div>
                <div className="stat-cell">
                  <div className="stat-number">AI</div>
                  <div className="stat-label">Native by default</div>
                </div>
              </div>
            </div>
          </div>
        </section>

        <div className="divider" />

        <section id="cta">
          <div className="section-inner">
            <div className="cta-bezel-outer reveal">
              <div className="cta-bezel-inner">
                <div className="cta-glow" />
                <h2 className="cta-h2">
                  Ready to build
                  <br />
                  at <em>Midnite?</em>
                </h2>
                <p className="cta-sub">
                  Tell us where your business is headed. We&apos;ll deploy the
                  AI systems to get you there faster.
                </p>
                <div className="cta-actions">
                  <a
                    href="mailto:nic@midnitesystems.com"
                    className="btn-primary"
                  >
                    Start a Conversation
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
                  </a>
                  <a href="tel:+1" className="btn-ghost">
                    Schedule a Call
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer>
        <div className="footer-inner">
          <Image
            src="/mdnt-favicon.png"
            alt="Midnite Systems"
            width={28}
            height={28}
            className="footer-logo-img"
          />
          <ul className="footer-links">
            <li>
              <a href="#solutions">Solutions</a>
            </li>
            <li>
              <a href="#consulting">Consulting</a>
            </li>
            <li>
              <a href="#why">Why</a>
            </li>
            <li>
              <a href="#cta">Contact</a>
            </li>
          </ul>
          <span className="footer-copy">© 2026 Midnite Systems</span>
        </div>
      </footer>

      <RevealObserver />
    </>
  );
}
