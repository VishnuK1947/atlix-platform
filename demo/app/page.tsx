"use client";

import { useState, useMemo } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import NarrativeCard from "@/components/NarrativeCard";
import {
  narratives,
  ALL_REGIONS,
  ALL_CATEGORIES,
  ALL_AGE_GROUPS,
  type Region,
  type AgeGroup,
} from "@/data/mockNarratives";

const MapView = dynamic(() => import("@/components/MapView"), { ssr: false });

type ViewMode = "dashboard" | "map";
type SortOption = "pressing" | "volume" | "velocity";

interface Filters {
  region: Region | "All California";
  category: string;
  ageGroup: AgeGroup | "All Ages";
  sentiment: "All" | "Positive" | "Negative" | "Mixed";
}

function SidebarLabel({ children }: { children: React.ReactNode }) {
  return (
    <p
      className="text-[10px] font-semibold uppercase tracking-widest mb-2"
      style={{ color: "var(--text-quat)" }}
    >
      {children}
    </p>
  );
}

function FilterBtn({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className="text-left text-xs px-3 py-1.5 rounded-md transition-colors relative"
      style={{
        color: active ? "var(--text-primary)" : "var(--text-tertiary)",
        background: "transparent",
        borderLeft: active ? "2px solid var(--accent-cool)" : "2px solid transparent",
        paddingLeft: active ? "10px" : "12px",
      }}
    >
      {children}
    </button>
  );
}

const sortLabels: Record<SortOption, string> = {
  pressing: "Most pressing",
  volume: "Volume",
  velocity: "Fastest growing",
};

export default function Dashboard() {
  const router = useRouter();
  const [view, setView] = useState<ViewMode>("dashboard");
  const [sort, setSort] = useState<SortOption>("pressing");
  const [filters, setFilters] = useState<Filters>({
    region: "All California",
    category: "All",
    ageGroup: "All Ages",
    sentiment: "All",
  });

  const filtered = useMemo(() => {
    return narratives.filter((n) => {
      if (filters.region !== "All California" && !n.regions.includes(filters.region as Region))
        return false;
      if (filters.category !== "All" && n.category !== filters.category) return false;
      if (filters.ageGroup !== "All Ages" && n.demographics.primaryAgeGroup !== filters.ageGroup)
        return false;
      if (filters.sentiment !== "All") {
        const { positive, negative } = n.sentiment;
        if (filters.sentiment === "Positive" && positive <= negative) return false;
        if (filters.sentiment === "Negative" && negative <= positive) return false;
        if (filters.sentiment === "Mixed" && Math.abs(positive - negative) > 20) return false;
      }
      return true;
    });
  }, [filters]);

  const sorted = useMemo(() => {
    const copy = [...filtered];
    switch (sort) {
      case "pressing":
        return copy.sort((a, b) => {
          const sA = a.volume * (1 + (a.velocityDir === "up" ? a.velocityPct : -a.velocityPct) / 100);
          const sB = b.volume * (1 + (b.velocityDir === "up" ? b.velocityPct : -b.velocityPct) / 100);
          return sB - sA;
        });
      case "volume":
        return copy.sort((a, b) => b.volume - a.volume);
      case "velocity":
        return copy.sort((a, b) => {
          const vA = a.velocityDir === "up" ? a.velocityPct : -a.velocityPct;
          const vB = b.velocityDir === "up" ? b.velocityPct : -b.velocityPct;
          return vB - vA;
        });
    }
  }, [filtered, sort]);

  const activeCount = [
    filters.region !== "All California",
    filters.category !== "All",
    filters.ageGroup !== "All Ages",
    filters.sentiment !== "All",
  ].filter(Boolean).length;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-base)" }}>
      <Header />

      <div className="flex flex-1">
        {/* Sidebar */}
        <aside
          className="w-56 shrink-0 hidden lg:flex flex-col gap-6 p-5"
          style={{ borderRight: "1px solid var(--border-subtle)" }}
        >
          <div>
            <SidebarLabel>Region / District</SidebarLabel>
            <div className="flex flex-col">
              <FilterBtn
                active={filters.region === "All California"}
                onClick={() => setFilters((f) => ({ ...f, region: "All California" }))}
              >
                All California
              </FilterBtn>
              {ALL_REGIONS.map((r) => (
                <FilterBtn
                  key={r}
                  active={filters.region === r}
                  onClick={() => setFilters((f) => ({ ...f, region: r }))}
                >
                  {r}
                </FilterBtn>
              ))}
            </div>
          </div>

          <div>
            <SidebarLabel>Issue</SidebarLabel>
            <div className="flex flex-col">
              <FilterBtn
                active={filters.category === "All"}
                onClick={() => setFilters((f) => ({ ...f, category: "All" }))}
              >
                All Issues
              </FilterBtn>
              {ALL_CATEGORIES.map((c) => (
                <FilterBtn
                  key={c}
                  active={filters.category === c}
                  onClick={() => setFilters((f) => ({ ...f, category: c }))}
                >
                  {c}
                </FilterBtn>
              ))}
            </div>
          </div>

          <div>
            <SidebarLabel>Demographics · Age</SidebarLabel>
            <div className="flex flex-col">
              <FilterBtn
                active={filters.ageGroup === "All Ages"}
                onClick={() => setFilters((f) => ({ ...f, ageGroup: "All Ages" }))}
              >
                All Ages
              </FilterBtn>
              {ALL_AGE_GROUPS.map((g) => (
                <FilterBtn
                  key={g}
                  active={filters.ageGroup === g}
                  onClick={() => setFilters((f) => ({ ...f, ageGroup: g }))}
                >
                  Ages {g}
                </FilterBtn>
              ))}
            </div>
          </div>

          <div>
            <SidebarLabel>Sentiment</SidebarLabel>
            <div className="flex flex-col">
              {(["All", "Positive", "Negative", "Mixed"] as const).map((s) => (
                <FilterBtn
                  key={s}
                  active={filters.sentiment === s}
                  onClick={() => setFilters((f) => ({ ...f, sentiment: s }))}
                >
                  {s === "All" ? "All Sentiment" : s}
                </FilterBtn>
              ))}
            </div>
          </div>

          {activeCount > 0 && (
            <button
              onClick={() =>
                setFilters({ region: "All California", category: "All", ageGroup: "All Ages", sentiment: "All" })
              }
              className="text-xs text-left transition-opacity hover:opacity-70"
              style={{ color: "var(--accent-cool)" }}
            >
              Clear {activeCount} filter{activeCount > 1 ? "s" : ""} ×
            </button>
          )}
        </aside>

        {/* Main */}
        <main className="flex-1 p-6 flex flex-col gap-5 min-w-0">
          {/* Top controls */}
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div>
              <h1 className="text-base font-semibold" style={{ color: "var(--text-primary)" }}>
                What young Californians are talking about
              </h1>
              <p className="text-xs mt-0.5 font-mono" style={{ color: "var(--text-tertiary)" }}>
                {filtered.length} narratives ·{" "}
                {filtered.reduce((s, n) => s + n.volume, 0).toLocaleString()} posts ·
                California 18–34
              </p>
            </div>

            <div className="flex items-center gap-2 flex-wrap">
              {/* Dashboard / Map toggle */}
              <div
                className="flex items-center gap-0.5 p-1 rounded-lg"
                style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
              >
                {(["dashboard", "map"] as ViewMode[]).map((v) => (
                  <button
                    key={v}
                    onClick={() => setView(v)}
                    className="flex items-center gap-1.5 px-3 py-1.5 rounded-md text-xs font-medium transition-colors capitalize"
                    style={{
                      background: view === v ? "var(--bg-overlay)" : "transparent",
                      color: view === v ? "var(--text-primary)" : "var(--text-tertiary)",
                    }}
                  >
                    {v === "dashboard" ? (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                        <rect x="0" y="0" width="5" height="5" rx="1" />
                        <rect x="7" y="0" width="5" height="5" rx="1" />
                        <rect x="0" y="7" width="5" height="5" rx="1" />
                        <rect x="7" y="7" width="5" height="5" rx="1" />
                      </svg>
                    ) : (
                      <svg width="12" height="12" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.4">
                        <circle cx="6" cy="5" r="2" />
                        <path d="M6 11C6 11 1.5 7.5 1.5 5a4.5 4.5 0 0 1 9 0C10.5 7.5 6 11 6 11Z" />
                      </svg>
                    )}
                    {v === "dashboard" ? "Dashboard" : "Map view"}
                  </button>
                ))}
              </div>

              {/* Sort — dashboard only */}
              {view === "dashboard" && (
                <div
                  className="flex items-center gap-0.5 p-1 rounded-lg"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                >
                  {(Object.keys(sortLabels) as SortOption[]).map((key) => (
                    <button
                      key={key}
                      onClick={() => setSort(key)}
                      className="px-2.5 py-1.5 rounded-md text-xs font-medium transition-colors"
                      style={{
                        color:
                          sort === key
                            ? key === "pressing"
                              ? "var(--accent-warm)"
                              : "var(--text-primary)"
                            : "var(--text-tertiary)",
                        background: sort === key ? "var(--bg-overlay)" : "transparent",
                      }}
                    >
                      {sortLabels[key]}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Content */}
          {view === "dashboard" ? (
            filtered.length === 0 ? (
              <div className="flex-1 flex items-center justify-center py-24 text-center">
                <div>
                  <p className="text-sm" style={{ color: "var(--text-tertiary)" }}>
                    No narratives match your filters.
                  </p>
                  <button
                    onClick={() =>
                      setFilters({
                        region: "All California",
                        category: "All",
                        ageGroup: "All Ages",
                        sentiment: "All",
                      })
                    }
                    className="text-xs mt-2 hover:opacity-70 transition-opacity"
                    style={{ color: "var(--accent-cool)" }}
                  >
                    Clear all filters
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
                {sorted.map((n) => (
                  <NarrativeCard key={n.id} narrative={n} />
                ))}
              </div>
            )
          ) : (
            <div className="flex-1 min-h-[560px]">
              <MapView
                narratives={sorted}
                onSelectNarrative={(id) => router.push(`/narrative/${id}`)}
              />
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
