import Link from "next/link";
import type { Narrative } from "@/data/mockNarratives";
import SentimentBar from "./SentimentBar";
import PlatformIcon from "./PlatformIcon";

export default function NarrativeCard({ narrative }: { narrative: Narrative }) {
  const { id, title, summary, volume, velocityPct, velocityDir, sentiment, emotions, sources } =
    narrative;

  return (
    <div className="bg-white border border-[#d4e4d4] rounded-xl p-5 flex flex-col gap-4 hover:border-[#22c55e]/60 hover:shadow-md transition-all">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold text-[#1a2e1a] leading-snug">{title}</h2>
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`text-xs font-semibold ${
              velocityDir === "up" ? "text-[#16a34a]" : "text-red-500"
            }`}
          >
            {velocityDir === "up" ? "↑" : "↓"} {velocityPct}%
          </span>
        </div>
      </div>

      <p className="text-xs text-[#5c7a5c] leading-relaxed line-clamp-2">{summary}</p>

      <SentimentBar
        positive={sentiment.positive}
        neutral={sentiment.neutral}
        negative={sentiment.negative}
      />

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-1.5 flex-wrap">
          {emotions.map((e) => (
            <span
              key={e}
              className="text-xs text-[#4a6a4a] bg-[#f0f7f0] border border-[#d4e4d4] rounded-full px-2 py-0.5"
            >
              {e}
            </span>
          ))}
        </div>
        <span className="text-xs text-[#7a947a] shrink-0">
          {volume.toLocaleString()} posts
        </span>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-[#e8f0e8]">
        <div className="flex gap-1.5">
          {sources.map((s) => (
            <PlatformIcon key={s} platform={s} />
          ))}
        </div>
        <Link
          href={`/narrative/${id}`}
          className="text-xs text-[#16a34a] hover:text-[#15803d] font-medium transition-colors"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}
