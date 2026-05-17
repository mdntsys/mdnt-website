"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroNav() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    if (!open) return;
    const previous = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = previous;
    };
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 24);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const close = () => setOpen(false);

  return (
    <header
      className="site-nav"
      data-open={open ? "true" : "false"}
      data-scrolled={scrolled ? "true" : "false"}
    >
      <div className="site-nav-inner">
        <Link
          href="/"
          className="nav-logo-link"
          aria-label="Midnite Systems home"
          onClick={close}
        >
          <Image
            src="/mdnt-favicon.png"
            alt=""
            width={32}
            height={32}
            priority
            className="nav-logo-img"
          />
          <span className="nav-logo-text">Midnite Systems</span>
        </Link>

        <div className="nav-links">
          <Link className="nav-link" href="/#process" onClick={close}>
            Process
          </Link>
          <Link className="nav-link" href="/solutions" onClick={close}>
            Solutions
          </Link>
          <Link className="nav-link" href="/#about" onClick={close}>
            About
          </Link>
          <Link
            className="nav-link"
            href="/#case-studies"
            onClick={close}
          >
            Case studies
          </Link>
          <Link className="nav-cta" href="/discovery" onClick={close}>
            Book a call
            <svg
              width="10"
              height="10"
              viewBox="0 0 10 10"
              fill="none"
              aria-hidden="true"
            >
              <path
                d="M2 5h6M5 2l3 3-3 3"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </Link>
        </div>

        <button
          type="button"
          className="nav-toggle"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((o) => !o)}
        >
          <span />
          <span />
          <span />
        </button>
      </div>
    </header>
  );
}
