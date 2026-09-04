import type { ReactNode } from "react";
import { HeroNav } from "./hero-nav";

export function LegalPage({
  eyebrow,
  title,
  lead,
  children,
}: {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  children: ReactNode;
}) {
  return (
    <>
      <HeroNav />
      <main className="page-shell">
        <section className="page-hero">
          <div className="section-inner">
            <div className="page-hero-header">
              <span className="section-eyebrow">{eyebrow}</span>
              <h1 className="page-h1">{title}</h1>
              <p className="page-lead">{lead}</p>
              <p className="legal-updated">Last updated 2026-09-04</p>
            </div>
          </div>
        </section>
        <section className="page-section">
          <div className="section-inner">
            <article className="legal-doc">{children}</article>
          </div>
        </section>
      </main>
    </>
  );
}
