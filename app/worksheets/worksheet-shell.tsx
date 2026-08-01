import Link from "next/link";
import type { ReactNode } from "react";
import { PrintButton } from "./print-button";

// Shared chrome for the printable worksheets.
//
// These pages are the lead magnet itself, delivered as a stable public URL
// rather than an emailed PDF. Three consequences shape the markup:
//
//   1. They must survive being forwarded, so nothing is gated and the URL
//      never expires.
//   2. They must print cleanly, so the screen theme (dark) inverts to a light
//      print theme in globals.css rather than burning ink on a navy page.
//   3. They carry the whole argument, so they are indexable: substantive
//      content targeting terms Phase 5 SEO wants anyway.

interface WorksheetShellProps {
  eyebrow: string;
  title: ReactNode;
  lead: string;
  meta: string;
  children: ReactNode;
}

export function WorksheetShell({
  eyebrow,
  title,
  lead,
  meta,
  children,
}: WorksheetShellProps) {
  return (
    <main className="ws">
      <div className="ws-inner">
        <header className="ws-head">
          <Link href="/" className="ws-brand">
            Midnite Systems
          </Link>
          <span className="ws-eyebrow">{eyebrow}</span>
          <h1 className="ws-h1">{title}</h1>
          <p className="ws-lead">{lead}</p>
          <p className="ws-meta">{meta}</p>
          <PrintButton />
        </header>

        {children}

        <section className="ws-cta">
          <h2 className="ws-cta-h2">
            Filled it in? The next step is <em>fifteen minutes.</em>
          </h2>
          <p className="ws-cta-p">
            Bring the worksheet. We will tell you what we think it takes, what
            it would cost, and whether we would take it on. No deck, and no
            price on the call, because quoting before scoping is how people end
            up paying for the wrong thing.
          </p>
          <Link href="/discovery" className="ws-cta-link">
            Book fifteen minutes
            <span aria-hidden="true"> &rarr;</span>
          </Link>
        </section>

        <footer className="ws-foot">
          <p>
            Midnite Systems deploys AI to do work businesses currently pay
            people to do, mostly operations and back office, mostly for
            logistics and distribution companies.
          </p>
          <p className="ws-foot-links">
            <Link href="/">midnitesystems.com</Link>
            <span aria-hidden="true"> · </span>
            <a href="mailto:nic@midnitesystems.com">nic@midnitesystems.com</a>
          </p>
        </footer>
      </div>
    </main>
  );
}

// Numbered section wrapper. `id` gives every section a stable anchor so the
// nurture emails can deep-link to the part they are talking about.
export function WorksheetSection({
  id,
  n,
  title,
  standfirst,
  children,
}: {
  id: string;
  n?: number;
  title: string;
  standfirst?: string;
  children: ReactNode;
}) {
  return (
    <section className="ws-section" id={id}>
      <div className="ws-section-head">
        {n !== undefined && <span className="ws-section-n">{n}</span>}
        <h2 className="ws-h2">{title}</h2>
      </div>
      {standfirst !== undefined && (
        <p className="ws-standfirst">{standfirst}</p>
      )}
      {children}
    </section>
  );
}

// A short aside. Visually quieter than body copy, but load-bearing: most of
// these carry the caveat that keeps a number honest.
export function WorksheetNote({ children }: { children: ReactNode }) {
  return <p className="ws-note">{children}</p>;
}
