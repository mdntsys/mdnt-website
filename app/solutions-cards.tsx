"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import Link from "next/link";

function useInView<T extends HTMLElement>() {
  const ref = useRef<T | null>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            setInView(true);
            obs.disconnect();
            break;
          }
        }
      },
      { threshold: 0.35 },
    );
    obs.observe(node);
    return () => obs.disconnect();
  }, []);

  return [ref, inView] as const;
}

/* ── Preview 1: Custom Employee Build → AI task queue ── */
function TaskListPreview() {
  const tasks = [
    { name: "Inbound lead triage", status: "done" as const },
    { name: "Invoice drafting", status: "done" as const },
    { name: "Customer FAQ reply", status: "done" as const },
    { name: "Calendar coordination", status: "running" as const },
  ];

  return (
    <svg
      className="solution-preview"
      viewBox="0 0 280 140"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="6"
        width="268"
        height="128"
        rx="10"
        fill="rgba(20, 24, 40, 0.7)"
        stroke="rgba(255, 255, 255, 0.07)"
        strokeWidth="1"
      />

      {/* Header */}
      <text x="18" y="22" className="preview-text-mono">
        AGENT QUEUE
      </text>
      <text
        x="262"
        y="22"
        textAnchor="end"
        className="preview-text-mono preview-text-gold"
      >
        16 ACTIVE
      </text>
      <line
        x1="18"
        y1="30"
        x2="262"
        y2="30"
        stroke="rgba(255, 255, 255, 0.07)"
      />

      {/* Tasks */}
      {tasks.map((task, i) => {
        const y = 46 + i * 18;
        return (
          <g
            key={i}
            className="preview-task-row"
            style={{ ["--delay" as string]: `${200 + i * 180}ms` }}
          >
            <circle
              cx="22"
              cy={y - 2}
              r="2"
              fill={
                task.status === "done"
                  ? "#F5A800"
                  : "rgba(255, 255, 255, 0.3)"
              }
            />
            <text x="32" y={y} className="preview-text-task">
              {task.name}
            </text>
            {task.status === "done" ? (
              <g transform={`translate(248, ${y - 7})`}>
                <circle cx="5" cy="5" r="5" fill="rgba(245, 168, 0, 0.15)" />
                <path
                  d="M 2.5 5 L 4.3 6.8 L 7.5 3.5"
                  stroke="#F5A800"
                  strokeWidth="1.3"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </g>
            ) : (
              <g transform={`translate(248, ${y - 7})`}>
                <circle
                  cx="5"
                  cy="5"
                  r="5"
                  fill="none"
                  stroke="rgba(255, 255, 255, 0.2)"
                  strokeWidth="1"
                />
                <circle
                  cx="5"
                  cy="5"
                  r="1.6"
                  fill="rgba(245, 168, 0, 0.85)"
                  className="preview-task-pulse"
                />
              </g>
            )}
          </g>
        );
      })}

      <text
        x="32"
        y="125"
        className="preview-text-muted preview-task-more"
        style={{ ["--delay" as string]: `${200 + 4 * 180}ms` }}
      >
        + 12 more in queue
      </text>
    </svg>
  );
}

/* ── Preview 2: Custom Workspace Build → Dashboard mockup ── */
function DashboardPreview() {
  const sidebar = [
    { active: true },
    { active: false },
    { active: false },
    { active: false },
  ];

  return (
    <svg
      className="solution-preview"
      viewBox="0 0 280 140"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="6"
        width="268"
        height="128"
        rx="10"
        fill="rgba(20, 24, 40, 0.7)"
        stroke="rgba(255, 255, 255, 0.07)"
        strokeWidth="1"
      />

      {/* Window chrome dots */}
      <circle cx="18" cy="17" r="2" fill="rgba(255, 95, 87, 0.6)" />
      <circle cx="26" cy="17" r="2" fill="rgba(254, 188, 46, 0.6)" />
      <circle cx="34" cy="17" r="2" fill="rgba(40, 200, 64, 0.6)" />

      <text x="138" y="20" textAnchor="middle" className="preview-text-mono">
        MIDNITE WORKSPACE
      </text>

      <line
        x1="6"
        y1="28"
        x2="274"
        y2="28"
        stroke="rgba(255, 255, 255, 0.07)"
      />

      {/* Sidebar */}
      <line
        x1="50"
        y1="28"
        x2="50"
        y2="134"
        stroke="rgba(255, 255, 255, 0.07)"
      />

      {sidebar.map((item, i) => (
        <g
          key={i}
          className="preview-sidebar-item"
          style={{ ["--delay" as string]: `${300 + i * 100}ms` }}
        >
          <rect
            x="14"
            y={38 + i * 14}
            width="26"
            height="9"
            rx="2"
            fill={
              item.active
                ? "rgba(245, 168, 0, 0.18)"
                : "rgba(255, 255, 255, 0.04)"
            }
          />
          {item.active && (
            <rect
              x="14"
              y={38 + i * 14}
              width="2"
              height="9"
              fill="#F5A800"
            />
          )}
        </g>
      ))}

      {/* KPI tile */}
      <g
        className="preview-kpi"
        style={{ ["--delay" as string]: `${800}ms` }}
      >
        <rect
          x="60"
          y="38"
          width="92"
          height="60"
          rx="4"
          fill="rgba(255, 255, 255, 0.025)"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
        />
        <text x="68" y="50" className="preview-text-mono">
          OVERHEAD
        </text>
        <text x="68" y="78" className="preview-text-kpi">
          $5K
          <tspan className="preview-text-kpi-sm">/mo</tspan>
        </text>
        <text x="68" y="90" className="preview-text-mono preview-text-gold">
          ▾ 56%
        </text>
      </g>

      {/* Chart tile */}
      <g
        className="preview-chart"
        style={{ ["--delay" as string]: `${950}ms` }}
      >
        <rect
          x="158"
          y="38"
          width="108"
          height="60"
          rx="4"
          fill="rgba(255, 255, 255, 0.025)"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
        />
        <text x="166" y="50" className="preview-text-mono">
          HOURS RECLAIMED
        </text>
        <path
          d="M 166 86 L 180 78 L 194 80 L 208 70 L 222 64 L 236 58 L 252 52"
          fill="none"
          stroke="#F5A800"
          strokeWidth="1.3"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="preview-chart-line"
          pathLength="100"
        />
        <circle
          cx="252"
          cy="52"
          r="2"
          fill="#F5A800"
          className="preview-chart-dot"
        />
      </g>

      {/* Bottom queue strip */}
      <g
        className="preview-queue"
        style={{ ["--delay" as string]: `${1100}ms` }}
      >
        <rect
          x="60"
          y="106"
          width="206"
          height="20"
          rx="4"
          fill="rgba(255, 255, 255, 0.025)"
          stroke="rgba(255, 255, 255, 0.06)"
          strokeWidth="1"
        />
        <circle cx="72" cy="116" r="2" fill="#F5A800" />
        <text x="80" y="119" className="preview-text-task">
          3 jobs running
        </text>
        <text
          x="258"
          y="119"
          textAnchor="end"
          className="preview-text-mono"
        >
          LIVE
        </text>
      </g>
    </svg>
  );
}

/* ── Preview 3: AI Strategy Support → Timeline ── */
function TimelinePreview() {
  const months = ["JAN", "FEB", "MAR", "APR", "MAY", "JUN"];
  const markerX = (i: number) => 32 + i * 42;

  return (
    <svg
      className="solution-preview"
      viewBox="0 0 280 140"
      preserveAspectRatio="xMidYMid meet"
      aria-hidden="true"
    >
      <rect
        x="6"
        y="6"
        width="268"
        height="128"
        rx="10"
        fill="rgba(20, 24, 40, 0.7)"
        stroke="rgba(255, 255, 255, 0.07)"
        strokeWidth="1"
      />

      <text x="18" y="22" className="preview-text-mono">
        STRATEGY CADENCE
      </text>
      <text
        x="262"
        y="22"
        textAnchor="end"
        className="preview-text-mono preview-text-gold"
      >
        H1 2026
      </text>
      <line
        x1="18"
        y1="30"
        x2="262"
        y2="30"
        stroke="rgba(255, 255, 255, 0.07)"
      />

      {/* Month labels */}
      {months.map((m, i) => (
        <text
          key={m}
          x={markerX(i)}
          y="50"
          textAnchor="middle"
          className="preview-text-mono preview-month"
          style={{ ["--delay" as string]: `${200 + i * 80}ms` }}
        >
          {m}
        </text>
      ))}

      {/* Timeline base line */}
      <line
        x1="32"
        y1="62"
        x2={markerX(5)}
        y2="62"
        stroke="rgba(255, 255, 255, 0.1)"
        strokeWidth="1"
      />

      {/* Active progress line (animated) */}
      <line
        x1="32"
        y1="62"
        x2={markerX(5)}
        y2="62"
        stroke="#F5A800"
        strokeWidth="1.5"
        strokeLinecap="round"
        className="preview-timeline-line"
        pathLength="100"
      />

      {/* Markers */}
      {months.map((m, i) => (
        <g
          key={m}
          className="preview-marker"
          style={{ ["--delay" as string]: `${500 + i * 120}ms` }}
        >
          <circle
            cx={markerX(i)}
            cy="62"
            r="4.5"
            fill="rgba(8, 10, 18, 1)"
            stroke="#F5A800"
            strokeWidth="1.4"
          />
          <circle cx={markerX(i)} cy="62" r="1.8" fill="#F5A800" />
        </g>
      ))}

      {/* Session note bubble */}
      <g
        className="preview-note"
        style={{ ["--delay" as string]: `${1300}ms` }}
      >
        <line
          x1={markerX(3)}
          y1="62"
          x2={markerX(3)}
          y2="86"
          stroke="rgba(245, 168, 0, 0.3)"
          strokeWidth="1"
          strokeDasharray="2 2"
        />
        <rect
          x={markerX(3) - 56}
          y="86"
          width="112"
          height="34"
          rx="5"
          fill="rgba(245, 168, 0, 0.08)"
          stroke="rgba(245, 168, 0, 0.3)"
          strokeWidth="1"
        />
        <text
          x={markerX(3) - 48}
          y="98"
          className="preview-text-mono preview-text-gold"
        >
          APR · ADVISORY CALL
        </text>
        <text
          x={markerX(3) - 48}
          y="111"
          className="preview-text-task"
        >
          Vendor evaluation review
        </text>
      </g>
    </svg>
  );
}

type Solution = {
  slug: string;
  eyebrow: ReactNode;
  title: ReactNode;
  body: string;
  Preview: () => ReactNode;
  iconColor: "replace" | "empower";
  icon: ReactNode;
};

const SOLUTIONS: Solution[] = [
  {
    slug: "custom-employee-build",
    eyebrow: (
      <>
        The <em>role</em> layer
      </>
    ),
    title: (
      <>
        Custom <em>Employee</em> Build
      </>
    ),
    body: "Bespoke AI employees deployed across your operation: admin, sales, accounting, ops. Junior to executive, full-time or half-time.",
    Preview: TaskListPreview,
    iconColor: "replace",
    icon: (
      <>
        <circle cx="12" cy="8" r="4" />
        <path d="M6 21v-2a4 4 0 0 1 4-4h4a4 4 0 0 1 4 4v2" />
      </>
    ),
  },
  {
    slug: "custom-workspace-build",
    eyebrow: (
      <>
        The <em>workspace</em> layer
      </>
    ),
    title: (
      <>
        Custom <em>Workspace</em> Build
      </>
    ),
    body: "A client-specific UI or internal portal connected to the platform. Your team and AI employees working in one unified place.",
    Preview: DashboardPreview,
    iconColor: "empower",
    icon: (
      <>
        <rect x="3" y="3" width="7" height="7" />
        <rect x="14" y="3" width="7" height="7" />
        <rect x="14" y="14" width="7" height="7" />
        <rect x="3" y="14" width="7" height="7" />
      </>
    ),
  },
  {
    slug: "ai-strategy-support",
    eyebrow: (
      <>
        The <em>strategy</em> layer
      </>
    ),
    title: (
      <>
        AI <em>Strategy</em> Support
      </>
    ),
    body: "Ongoing strategic consulting beyond the Roadmap. Dedicated hours or on-demand. Steady guidance as your business and AI evolve.",
    Preview: TimelinePreview,
    iconColor: "replace",
    icon: (
      <>
        <path d="M12 2a7 7 0 0 0-4 12.7V17h8v-2.3A7 7 0 0 0 12 2z" />
        <path d="M9 18h6" />
        <path d="M10 22h4" />
      </>
    ),
  },
];

function SolutionCard({
  solution,
  delayClass,
}: {
  solution: Solution;
  delayClass: string;
}) {
  const [ref, inView] = useInView<HTMLDivElement>();
  const stroke = solution.iconColor === "replace" ? "#F5A800" : "#D4900A";

  return (
    <div
      ref={ref}
      className={`bezel-outer reveal ${delayClass}`}
      data-active={inView ? "true" : "false"}
    >
      <Link
        href={`/solutions/${solution.slug}`}
        className="bezel-inner solution-card-inner"
      >
        <solution.Preview />

        <div className="card-header">
          <div
            className={`service-icon service-icon-${solution.iconColor}`}
          >
            <svg
              width="20"
              height="20"
              viewBox="0 0 24 24"
              fill="none"
              stroke={stroke}
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              {solution.icon}
            </svg>
          </div>
          <span className="card-eyebrow">{solution.eyebrow}</span>
        </div>
        <h3 className="service-title">{solution.title}</h3>
        <p className="card-solution">{solution.body}</p>
        <span className="btn-ghost card-cta">
          Learn more
          <span aria-hidden="true">→</span>
        </span>
      </Link>
    </div>
  );
}

export function SolutionsCards() {
  return (
    <div className="solutions-grid">
      {SOLUTIONS.map((s, i) => (
        <SolutionCard
          key={s.slug}
          solution={s}
          delayClass={`reveal-delay-${i + 1}`}
        />
      ))}
    </div>
  );
}
