"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";

export function HeroNav() {
  const [open, setOpen] = useState(false);

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

  const close = () => setOpen(false);

  return (
    <nav className="hero-nav" data-open={open ? "true" : "false"}>
      <Link
        href="/"
        className="nav-logo-link"
        aria-label="Midnite Systems home"
        onClick={close}
      >
        <Image
          src="/mdnt-favicon.png"
          alt="Midnite Systems"
          width={44}
          height={44}
          priority
          className="nav-logo-img"
        />
      </Link>

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

      <div className="nav-links">
        <a className="nav-link" href="#solutions" onClick={close}>
          Solutions
        </a>
        <a className="nav-link" href="#consulting" onClick={close}>
          Consulting
        </a>
        <a className="nav-link" href="#why" onClick={close}>
          Why Us
        </a>
        <a className="nav-link" href="#cta" onClick={close}>
          Contact
        </a>
        <a className="nav-link" href="#cta" onClick={close}>
          Get Started
        </a>
      </div>
    </nav>
  );
}
