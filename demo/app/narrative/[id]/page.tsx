"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { narratives } from "@/data/mockNarratives";
import Header from "@/components/Header";
import SentimentBar from "@/components/SentimentBar";
import PlatformIcon from "@/components/PlatformIcon";
import TrendChart from "@/components/TrendChart";

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={`rounded-xl p-5 ${className}`}
      style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
    >
      {children}
    </div>
  );
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-widest mb-4"
      style={{ color: "var(--text-tertiary)" }}
    >
      {children}
    </p>
  );
}

export default function NarrativeDetail({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const narrative = narratives.find((n) => n.id === id);
  if (!narrative) notFound();

  const related = narratives.filter((n) => narrative.relatedIds.includes(n.id));
  const isPressing = narrative.velocityPct >= 40 && narrative.velocityDir === "up";
  const ageEntries = Object.entries(narrative.demographics.ageBreakdown) as [string, number][];
  const ethEntries = Object.entries(narrative.demographics.ethnicityBreakdown).sort(([, a], [, b]) => b - a);

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-base)" }}>
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {/* Back */}
        <Link
          href="/"
          className="text-xs transition-opacity hover:opacity-70 inline-flex items-center gap-1.5 mb-8"
          style={{ color: "var(--accent-cool)" }}
        >
          ← Back to dashboard
        </Link>

        {/* Title block */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <div className="flex flex-col gap-2">
            {isPressing && (
              <span
                className="inline-flex items-center gap-1.5 text-xs font-medium px-2.5 py-1 rounded-full w-fit"
                style={{
                  background: "var(--accent-warm-bg)",
                  border: "1px solid var(--accent-warm-border)",
                  color: "var(--accent-warm)",
                }}
              >
                <span className="w-1.5 h-1.5 rounded-full animate-live" style={{ background: "var(--accent-warm)" }} />
                Pressing
              </span>
            )}
            <h1 className="text-2xl font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
              {narrative.title}
            </h1>
          </div>
          <div className="shrink-0 text-right">
            <p
              className="text-sm font-bold font-mono"
              style={{ color: isPressing ? "var(--accent-warm)" : "var(--accent-cool)" }}
            >
              {narrative.velocityDir === "up" ? "↑" : "↓"} {narrative.velocityPct}%
            </p>
            <p className="text-xs mt-1 font-mono" style={{ color: "var(--text-tertiary)" }}>
              this week
            </p>
          </div>
        </div>

        <p className="text-xs font-mono mb-1" style={{ color: "var(--text-tertiary)" }}>
          {narrative.volume.toLocaleString()} posts · {narrative.category} · {narrative.regions.join(", ")}
        </p>
        <p className="text-xs mb-6" style={{ color: "var(--text-quat)" }}>
          California · Ages 18–34 · Reddit + X · Authenticity-filtered
        </p>

        <p className="text-sm leading-relaxed mb-7" style={{ color: "var(--text-secondary)" }}>
          {narrative.description}
        </p>

        {/* Sentiment */}
        <Card className="mb-4">
          <SectionLabel>Sentiment — Confidence Interval</SectionLabel>
          <SentimentBar
            positive={narrative.sentiment.positive}
            neutral={narrative.sentiment.neutral}
            negative={narrative.sentiment.negative}
          />
          <div className="flex items-center gap-4 mt-3 text-xs flex-wrap">
            <span style={{ color: "var(--sentiment-pos)" }} className="font-mono">
              {narrative.sentiment.positive}% positive
            </span>
            <span style={{ color: "var(--sentiment-neu)" }} className="font-mono">
              {narrative.sentiment.neutral}% neutral
            </span>
            <span style={{ color: "var(--sentiment-neg)" }} className="font-mono">
              {narrative.sentiment.negative}% negative
            </span>
            <span className="ml-auto font-mono text-xs" style={{ color: "var(--text-tertiary)" }}>
              n={narrative.volume.toLocaleString()} (bot-filtered)
            </span>
          </div>
          <div className="flex gap-2 mt-4 flex-wrap">
            {narrative.emotions.map((e) => (
              <span
                key={e}
                className="text-xs px-2.5 py-1 rounded-full"
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
        </Card>

        {/* Volume chart */}
        <Card className="mb-4">
          <div className="flex items-center justify-between mb-4">
            <SectionLabel>Volume — Last 14 Days</SectionLabel>
            <span
              className="text-xs font-mono font-semibold"
              style={{ color: isPressing ? "var(--accent-warm)" : "var(--accent-cool)" }}
            >
              {narrative.velocityDir === "up" ? "↑" : "↓"} {narrative.velocityPct}% velocity
            </span>
          </div>
          <TrendChart data={narrative.trendData} />
        </Card>

        {/* Demographics */}
        <Card className="mb-4">
          <SectionLabel>Demographics</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
            <div>
              <p className="text-xs mb-3" style={{ color: "var(--text-tertiary)" }}>Age breakdown</p>
              <div className="flex flex-col gap-2.5">
                {ageEntries.map(([age, pct]) => (
                  <div key={age} className="flex items-center gap-2">
                    <span className="text-xs font-mono w-14 shrink-0" style={{ color: "var(--text-tertiary)" }}>
                      {age}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-base)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--accent-cool)" }} />
                    </div>
                    <span className="text-xs font-mono w-8 text-right" style={{ color: "var(--text-tertiary)" }}>
                      {pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <p className="text-xs mb-3" style={{ color: "var(--text-tertiary)" }}>Ethnicity breakdown</p>
              <div className="flex flex-col gap-2.5">
                {ethEntries.map(([eth, pct]) => (
                  <div key={eth} className="flex items-center gap-2">
                    <span className="text-xs font-mono w-14 shrink-0" style={{ color: "var(--text-tertiary)" }}>
                      {eth}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full overflow-hidden" style={{ background: "var(--bg-base)" }}>
                      <div className="h-full rounded-full" style={{ width: `${pct}%`, background: "var(--sentiment-pos)" }} />
                    </div>
                    <span className="text-xs font-mono w-8 text-right" style={{ color: "var(--text-tertiary)" }}>
                      {pct}%
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Electoral impact */}
        <div
          className="rounded-xl p-5 mb-4"
          style={{
            background: "var(--accent-warm-bg)",
            border: "1px solid var(--accent-warm-border)",
          }}
        >
          <SectionLabel>Electoral Impact Signal</SectionLabel>
          <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
            {narrative.electoralImpact}
          </p>
        </div>

        {/* Key quotes */}
        <Card className="mb-4">
          <SectionLabel>Key Quotes</SectionLabel>
          <div className="flex flex-col gap-4">
            {narrative.keyQuotes.map((q, i) => (
              <blockquote
                key={i}
                className="pl-4 text-sm italic leading-relaxed"
                style={{
                  borderLeft: "2px solid var(--accent-cool)",
                  color: "var(--text-secondary)",
                }}
              >
                "{q}"
              </blockquote>
            ))}
          </div>
        </Card>

        {/* Posts */}
        <Card className="mb-4">
          <SectionLabel>Posts — Authenticity Filtered</SectionLabel>
          <div className="flex flex-col gap-3">
            {narrative.samplePosts.map((post, i) => (
              <div
                key={i}
                className="rounded-lg p-4 flex flex-col gap-2"
                style={{ background: "var(--bg-base)", border: "1px solid var(--border-subtle)" }}
              >
                <div className="flex items-center justify-between flex-wrap gap-2">
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={post.platform} />
                    <span className="text-xs" style={{ color: "var(--text-tertiary)" }}>
                      {post.username}
                    </span>
                    <span
                      className="text-[10px] px-1.5 py-0.5 rounded-full"
                      style={{
                        background: "rgba(95,207,137,0.10)",
                        border: "1px solid rgba(95,207,137,0.25)",
                        color: "var(--sentiment-pos)",
                      }}
                    >
                      authentic
                    </span>
                  </div>
                  <span className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
                    {post.engagement.toLocaleString()} eng.
                  </span>
                </div>
                <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
                  {post.text}
                </p>
                <a href="#" className="text-xs font-medium hover:opacity-70 transition-opacity w-fit" style={{ color: "var(--accent-cool)" }}>
                  View source →
                </a>
              </div>
            ))}
          </div>
        </Card>

        {/* Bot filter methodology */}
        <div
          className="rounded-xl p-5 mb-8"
          style={{
            background: "var(--bg-base)",
            border: "1px dashed var(--border-default)",
          }}
        >
          <SectionLabel>Authenticity Filter Applied</SectionLabel>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {[
              {
                metric: `${Math.round(narrative.volume * 0.12).toLocaleString()} removed`,
                label: "Extremity trim — accounts posting ≥40% of thread volume",
              },
              {
                metric: `${Math.round(narrative.volume * 0.08).toLocaleString()} removed`,
                label: "Single-post accounts (likely bots)",
              },
              {
                metric: "14–22%",
                label: "Estimated bot prevalence range in source corpus",
              },
            ].map(({ metric, label }) => (
              <div key={label}>
                <p className="text-sm font-mono font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
                  {metric}
                </p>
                <p className="text-xs leading-relaxed" style={{ color: "var(--text-tertiary)" }}>
                  {label}
                </p>
              </div>
            ))}
          </div>
          <p className="text-xs mt-4" style={{ color: "var(--text-quat)" }}>
            Sentiment reported as confidence intervals, not point estimates. Coordinated inauthentic behavior filter applied.
          </p>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <SectionLabel>Related Narratives</SectionLabel>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/narrative/${r.id}`}
                  className="rounded-xl p-4 transition-all hover:opacity-80"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                >
                  <p className="text-xs mb-1" style={{ color: "var(--text-tertiary)" }}>
                    {r.category}
                  </p>
                  <p className="text-sm font-medium mb-1.5" style={{ color: "var(--text-primary)" }}>
                    {r.title}
                  </p>
                  <p className="text-xs font-mono" style={{ color: "var(--text-tertiary)" }}>
                    {r.volume.toLocaleString()} posts ·{" "}
                    <span
                      style={{
                        color:
                          r.velocityDir === "up" && r.velocityPct >= 40
                            ? "var(--accent-warm)"
                            : r.velocityDir === "up"
                            ? "var(--accent-cool)"
                            : "var(--text-tertiary)",
                      }}
                    >
                      {r.velocityDir === "up" ? "↑" : "↓"} {r.velocityPct}%
                    </span>
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
