import Link from "next/link";
import type { Narrative } from "@/data/mockNarratives";
import SentimentBar from "./SentimentBar";
import PlatformIcon from "./PlatformIcon";

export default function NarrativeCard({ narrative }: { narrative: Narrative }) {
  const {
    id,
    title,
    summary,
    volume,
    velocityPct,
    velocityDir,
    sentiment,
    emotions,
    sources,
    category,
    primaryRegion,
    demographics,
  } = narrative;

  const isPressing = velocityPct >= 40 && velocityDir === "up";
  const trendColor = isPressing
    ? "var(--accent-warm)"
    : velocityDir === "up"
    ? "var(--accent-cool)"
    : "var(--text-tertiary)";

  return (
    <div
      className="relative flex flex-col gap-4 rounded-xl p-6 transition-all duration-200 cursor-pointer"
      style={{
        background: "var(--bg-elevated)",
        border: "1px solid var(--border-subtle)",
        boxShadow: "0 1px 2px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(255,255,255,0.02)",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "var(--bg-overlay)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-default)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(-2px)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 4px 12px rgba(0,0,0,0.30), inset 0 0 0 1px rgba(255,255,255,0.04)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLDivElement).style.background = "var(--bg-elevated)";
        (e.currentTarget as HTMLDivElement).style.borderColor = "var(--border-subtle)";
        (e.currentTarget as HTMLDivElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLDivElement).style.boxShadow =
          "0 1px 2px rgba(0,0,0,0.20), inset 0 0 0 1px rgba(255,255,255,0.02)";
      }}
    >
      {/* Pressing left bar */}
      {isPressing && (
        <div
          className="absolute left-0 top-3 bottom-3 w-0.5 rounded-full"
          style={{ background: "var(--accent-warm)" }}
        />
      )}

      {/* Category + region + trend */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>
            {category} · {primaryRegion}
          </p>
          <h2 className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
            {title}
          </h2>
        </div>
        <div className="shrink-0 text-right">
          <p className="text-xs font-mono font-semibold" style={{ color: trendColor }}>
            {velocityDir === "up" ? "↑" : "↓"} {velocityPct}%
          </p>
          {isPressing && (
            <span
              className="inline-block mt-1 text-[10px] font-medium px-2 py-0.5 rounded-full"
              style={{
                background: "var(--accent-warm-bg)",
                border: "1px solid var(--accent-warm-border)",
                color: "var(--accent-warm)",
              }}
            >
              Pressing
            </span>
          )}
        </div>
      </div>

      {/* Summary */}
      <p className="text-xs leading-relaxed line-clamp-2" style={{ color: "var(--text-secondary)" }}>
        {summary}
      </p>

      {/* Sentiment bar */}
      <SentimentBar
        positive={sentiment.positive}
        neutral={sentiment.neutral}
        negative={sentiment.negative}
      />

      {/* Demographics + emotion pills */}
      <div className="flex items-center gap-1.5 flex-wrap">
        <span
          className="text-[10px] font-medium px-2 py-0.5 rounded-full"
          style={{
            background: "var(--accent-cool-bg)",
            border: "1px solid var(--accent-cool-border)",
            color: "var(--accent-cool)",
          }}
        >
          Ages {demographics.primaryAgeGroup}
        </span>
        {emotions.slice(0, 2).map((e) => (
          <span
            key={e}
            className="text-[10px] px-2 py-0.5 rounded-full"
            style={{
              background: "var(--accent-cool-bg)",
              border: "1px solid var(--accent-cool-border)",
              color: "var(--accent-cool)",
            }}
          >
            {e}
          </span>
        ))}
      </div>

      {/* Footer — pinned to bottom */}
      <div
        className="flex items-center justify-between pt-3 mt-auto"
        style={{ borderTop: "1px solid var(--border-subtle)" }}
      >
        <div className="flex items-center gap-1.5">
          {sources.map((s) => (
            <PlatformIcon key={s} platform={s} />
          ))}
          <span className="text-[10px] font-mono ml-1" style={{ color: "var(--text-tertiary)" }}>
            {volume.toLocaleString()} posts
          </span>
        </div>
        <Link
          href={`/narrative/${id}`}
          className="text-xs font-medium transition-colors"
          style={{ color: "var(--accent-cool)" }}
        >
          View details →
        </Link>
      </div>
    </div>
  );
}
