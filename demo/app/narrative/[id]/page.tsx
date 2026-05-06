"use client";

import { use } from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { narratives } from "@/data/mockNarratives";
import Header from "@/components/Header";
import SentimentBar from "@/components/SentimentBar";
import PlatformIcon from "@/components/PlatformIcon";
import TrendChart from "@/components/TrendChart";

export default function NarrativeDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const narrative = narratives.find((n) => n.id === id);

  if (!narrative) notFound();

  const related = narratives.filter((n) => narrative.relatedIds.includes(n.id));

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto w-full px-6 py-8">
        {/* Back */}
        <Link
          href="/"
          className="text-sm text-[#5c7a5c] hover:text-[#1a2e1a] transition-colors inline-flex items-center gap-1.5 mb-6"
        >
          ← Back to dashboard
        </Link>

        {/* Title block */}
        <div className="flex items-start justify-between gap-4 mb-2">
          <h1 className="text-xl font-semibold text-[#1a2e1a]">
            {narrative.title}
          </h1>
          <span
            className={`text-sm font-semibold shrink-0 ${
              narrative.velocityDir === "up" ? "text-[#16a34a]" : "text-red-500"
            }`}
          >
            {narrative.velocityDir === "up" ? "↑" : "↓"} {narrative.velocityPct}
            % this week
          </span>
        </div>
        <p className="text-xs text-[#5c7a5c] mb-6">
          {narrative.volume.toLocaleString()} posts · Category:{" "}
          {narrative.category}
        </p>

        <p className="text-sm text-[#4a6a4a] leading-relaxed mb-8">
          {narrative.summary}
        </p>

        {/* Sentiment */}
        <div className="bg-[#f8faf8] border border-[#d4e4d4] rounded-xl p-5 mb-6">
          <h2 className="text-xs text-[#5c7a5c] uppercase tracking-widest mb-4">
            Sentiment & Emotion
          </h2>
          <SentimentBar
            positive={narrative.sentiment.positive}
            neutral={narrative.sentiment.neutral}
            negative={narrative.sentiment.negative}
          />
          <div className="flex gap-2 mt-4 flex-wrap">
            {narrative.emotions.map((e) => (
              <span
                key={e}
                className="text-xs text-[#4a6a4a] bg-[#f0f7f0] border border-[#d4e4d4] rounded-full px-3 py-1"
              >
                {e}
              </span>
            ))}
          </div>
        </div>

        {/* Trend chart */}
        <div className="bg-[#f8faf8] border border-[#d4e4d4] rounded-xl p-5 mb-6">
          <h2 className="text-xs text-[#5c7a5c] uppercase tracking-widest mb-4">
            Volume — Last 14 Days
          </h2>
          <TrendChart data={narrative.trendData} />
        </div>

        {/* Sample posts */}
        <div className="bg-[#f8faf8] border border-[#d4e4d4] rounded-xl p-5 mb-6">
          <h2 className="text-xs text-[#5c7a5c] uppercase tracking-widest mb-4">
            Posts
          </h2>
          <div className="flex flex-col gap-4">
            {narrative.samplePosts.map((post, i) => (
              <div
                key={i}
                className="bg-white border border-[#d4e4d4] rounded-lg p-4 flex flex-col gap-2"
              >
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <PlatformIcon platform={post.platform} />
                    <span className="text-xs text-[#5c7a5c]">{post.username}</span>
                  </div>
                  <span className="text-xs text-[#7a947a]">
                    {post.engagement.toLocaleString()} engagements
                  </span>
                </div>
                <p className="text-sm text-[#2d4a2d] leading-relaxed">
                  {post.text}
                </p>
                <a
                  href="#"
                  className="text-xs text-[#16a34a] hover:underline w-fit font-medium"
                >
                  View source →
                </a>
              </div>
            ))}
          </div>
        </div>

        {/* Related */}
        {related.length > 0 && (
          <div>
            <h2 className="text-xs text-[#5c7a5c] uppercase tracking-widest mb-4">
              Related Narratives
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {related.map((r) => (
                <Link
                  key={r.id}
                  href={`/narrative/${r.id}`}
                  className="bg-white border border-[#d4e4d4] rounded-xl p-4 hover:border-[#22c55e]/60 hover:shadow-md transition-all"
                >
                  <p className="text-sm font-medium text-[#1a2e1a] mb-1">
                    {r.title}
                  </p>
                  <p className="text-xs text-[#5c7a5c]">
                    {r.volume.toLocaleString()} posts ·{" "}
                    <span
                      className={
                        r.velocityDir === "up"
                          ? "text-[#16a34a]"
                          : "text-red-500"
                      }
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
