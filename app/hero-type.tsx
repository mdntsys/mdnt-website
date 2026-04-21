"use client";

import { useEffect } from "react";

const CHAR_MS = 55;
const INITIAL_DELAY_MS = 300;

export function HeroType() {
  useEffect(() => {
    const reduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;

    const lines = Array.from(
      document.querySelectorAll<HTMLElement>(".hero-h1 .type-line"),
    );
    if (!lines.length || reduced) return;

    const originals = lines.map((l) => l.innerHTML);

    lines.forEach((line) => {
      const wrap = (node: Node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          const text = node.textContent ?? "";
          const frag = document.createDocumentFragment();
          for (const ch of text) {
            const span = document.createElement("span");
            span.className = "type-char";
            span.textContent = ch === " " ? " " : ch;
            frag.appendChild(span);
          }
          (node as ChildNode).replaceWith(frag);
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          Array.from(node.childNodes).forEach(wrap);
        }
      };
      Array.from(line.childNodes).forEach(wrap);
    });

    const timers: ReturnType<typeof setTimeout>[] = [];
    let t = INITIAL_DELAY_MS;

    lines.forEach((line) => {
      const chars = Array.from(
        line.querySelectorAll<HTMLElement>(".type-char"),
      );
      chars.forEach((char) => {
        timers.push(
          setTimeout(() => {
            char.dataset.typed = "true";
          }, t),
        );
        t += CHAR_MS;
      });
    });

    return () => {
      timers.forEach(clearTimeout);
      lines.forEach((line, i) => {
        line.innerHTML = originals[i];
      });
    };
  }, []);

  return null;
}
