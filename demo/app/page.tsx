"use client";

import { useState, useMemo } from "react";
import Header from "@/components/Header";
import NarrativeCard from "@/components/NarrativeCard";
import { narratives } from "@/data/mockNarratives";

const categories = [
  "All",
  "Public Safety",
  "Housing",
  "Transit",
  "Education",
  "Environment",
  "Events",
  "Disaster Recovery",
];

type SortOption = "pressing" | "alpha" | "volume" | "velocity";

const sortLabels: Record<SortOption, string> = {
  pressing: "Most Pressing",
  alpha: "A → Z",
  volume: "Highest Volume",
  velocity: "Fastest Growing",
};

export default function Dashboard() {
  const [sort, setSort] = useState<SortOption>("pressing");

  const sorted = useMemo(() => {
    const copy = [...narratives];
    switch (sort) {
      case "pressing":
        // Pressing score: volume weighted by velocity direction & magnitude
        return copy.sort((a, b) => {
          const scoreA = a.volume * (1 + (a.velocityDir === "up" ? a.velocityPct : -a.velocityPct) / 100);
          const scoreB = b.volume * (1 + (b.velocityDir === "up" ? b.velocityPct : -b.velocityPct) / 100);
          return scoreB - scoreA;
        });
      case "alpha":
        return copy.sort((a, b) => a.title.localeCompare(b.title));
      case "volume":
        return copy.sort((a, b) => b.volume - a.volume);
      case "velocity":
        return copy.sort((a, b) => {
          const velA = a.velocityDir === "up" ? a.velocityPct : -a.velocityPct;
          const velB = b.velocityDir === "up" ? b.velocityPct : -b.velocityPct;
          return velB - velA;
        });
    }
  }, [sort]);

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <div className="flex flex-1">
        {/* Sidebar */}
        <aside className="w-56 border-r border-[#242424] p-4 shrink-0 hidden lg:block">
          <p className="text-xs text-[#555] uppercase tracking-widest mb-3">Topics</p>
          <div className="flex flex-col gap-0.5">
            {categories.map((cat, i) => (
              <button
                key={cat}
                className={`text-left text-sm px-3 py-2 rounded-md transition-colors ${
                  i === 0
                    ? "bg-[#1e1e1e] text-white"
                    : "text-[#888] hover:text-white hover:bg-[#1a1a1a]"
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          <p className="text-xs text-[#555] uppercase tracking-widest mt-6 mb-3">Sentiment</p>
          <div className="flex flex-col gap-0.5">
            {["All", "Positive", "Negative", "Mixed"].map((s, i) => (
              <button
                key={s}
                className={`text-left text-sm px-3 py-2 rounded-md transition-colors ${
                  i === 0
                    ? "bg-[#1e1e1e] text-white"
                    : "text-[#888] hover:text-white hover:bg-[#1a1a1a]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>

          <p className="text-xs text-[#555] uppercase tracking-widest mt-6 mb-3">Sources</p>
          <div className="flex flex-col gap-0.5">
            {["All", "Reddit", "X", "News"].map((s, i) => (
              <button
                key={s}
                className={`text-left text-sm px-3 py-2 rounded-md transition-colors ${
                  i === 0
                    ? "bg-[#1e1e1e] text-white"
                    : "text-[#888] hover:text-white hover:bg-[#1a1a1a]"
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 p-6">
          <div className="flex items-center justify-between mb-6">
            <div>
              <h1 className="text-base font-semibold text-white">Narrative Feed</h1>
              <p className="text-xs text-[#555] mt-0.5">
                {narratives.length} active narratives · Updated just now
              </p>
            </div>
            <div className="flex items-center gap-3">
              {/* Sort selector */}
              <div className="flex items-center gap-1 text-xs bg-[#141414] border border-[#242424] rounded-lg p-1">
                {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                  <button
                    key={key}
                    onClick={() => setSort(key)}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      sort === key ? "bg-[#2a2a2a] text-white" : "text-[#888] hover:text-white"
                    }`}
                  >
                    {sortLabels[key]}
                  </button>
                ))}
              </div>
              {/* Time range */}
              <div className="flex items-center gap-1 text-xs bg-[#141414] border border-[#242424] rounded-lg p-1">
                {["7d", "14d", "30d"].map((t, i) => (
                  <button
                    key={t}
                    className={`px-2.5 py-1 rounded-md transition-colors ${
                      i === 0 ? "bg-[#2a2a2a] text-white" : "text-[#888] hover:text-white"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
            {sorted.map((n) => (
              <NarrativeCard key={n.id} narrative={n} />
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
