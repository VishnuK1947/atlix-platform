import Link from "next/link";
import type { Narrative } from "@/data/mockNarratives";
import SentimentBar from "./SentimentBar";
import PlatformIcon from "./PlatformIcon";

export default function NarrativeCard({ narrative }: { narrative: Narrative }) {
  const { id, title, summary, volume, velocityPct, velocityDir, sentiment, emotions, sources } =
    narrative;

  return (
    <div className="bg-[#141414] border border-[#242424] rounded-xl p-5 flex flex-col gap-4 hover:border-[#3b82f6]/40 transition-colors">
      <div className="flex items-start justify-between gap-3">
        <h2 className="text-sm font-semibold text-white leading-snug">{title}</h2>
        <div className="flex items-center gap-1.5 shrink-0">
          <span
            className={`text-xs font-semibold ${
              velocityDir === "up" ? "text-green-400" : "text-red-400"
            }`}
          >
            {velocityDir === "up" ? "↑" : "↓"} {velocityPct}%
          </span>
        </div>
      </div>

      <p className="text-xs text-[#888] leading-relaxed line-clamp-2">{summary}</p>

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
              className="text-xs text-[#aaa] bg-[#1e1e1e] border border-[#2a2a2a] rounded-full px-2 py-0.5"
            >
              {e}
            </span>
          ))}
        </div>
        <span className="text-xs text-[#555] shrink-0">
          {volume.toLocaleString()} posts
        </span>
      </div>

      <div className="flex items-center justify-between pt-1 border-t border-[#1e1e1e]">
        <div className="flex gap-1.5">
          {sources.map((s) => (
            <PlatformIcon key={s} platform={s} />
          ))}
        </div>
        <Link
          href={`/narrative/${id}`}
          className="text-xs text-[#3b82f6] hover:text-blue-300 transition-colors"
        >
          View details →
        </Link>
      </div>
    </div>
  );
}
