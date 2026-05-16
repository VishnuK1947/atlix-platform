"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { narratives, mockChatResponses } from "@/data/mockNarratives";

interface Message {
  role: "user" | "assistant";
  text: string;
  citations?: string[];
}

function getResponse(query: string): { answer: string; citations: string[] } {
  const q = query.toLowerCase();
  for (const [key, val] of Object.entries(mockChatResponses)) {
    if (key !== "default" && q.includes(key)) return val;
  }
  return mockChatResponses.default;
}

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

function SectionHeader({ label, title, sub }: { label: string; title: string; sub: string }) {
  return (
    <div className="mb-6">
      <p className="text-[10px] font-semibold uppercase tracking-widest mb-1" style={{ color: "var(--text-tertiary)" }}>
        {label}
      </p>
      <h2 className="text-xl font-semibold mb-1" style={{ color: "var(--text-primary)" }}>
        {title}
      </h2>
      <p className="text-sm" style={{ color: "var(--text-secondary)" }}>{sub}</p>
    </div>
  );
}

const pressingNarratives = narratives
  .filter((n) => n.velocityPct >= 40 && n.velocityDir === "up")
  .sort((a, b) => b.velocityPct - a.velocityPct);

const AI_INSIGHTS = [
  {
    label: "Highest electoral risk",
    headline: "Civic disengagement in Inland Empire could shift 3–4 Assembly seats",
    body: "18–21 year olds in the Inland Empire are expressing active cynicism — not apathy. This is a motivated non-voter pool. 52% of the disengaged cohort is Latino. A targeted registration + messaging drive on rent or student debt would move this group.",
    metric: "↑ 18% velocity",
    badge: "Opportunity",
    badgeStyle: { background: "rgba(95,207,137,0.10)", border: "1px solid rgba(95,207,137,0.25)", color: "var(--sentiment-pos)" },
  },
  {
    label: "Fastest-growing narrative",
    headline: "Politician age gap is the #1 third-party conversion driver statewide",
    body: "At 52% week-over-week velocity, this is the fastest-growing signal in the dataset. Young Californians are making specific electoral decisions based on candidate age. Third-party registrations among 18–29 are up 22% since January.",
    metric: "↑ 52% velocity",
    badge: "Urgent",
    badgeStyle: { background: "var(--accent-warm-bg)", border: "1px solid var(--accent-warm-border)", color: "var(--accent-warm)" },
  },
  {
    label: "Strongest mobilizer",
    headline: "Gun violence converting non-voters to first-time registrants at the highest rate",
    body: "Campus safety is the #1 first-time voter conversion issue in the 18–21 cohort across 14+ California campuses. A ready mobilization signal for districts near UC and CSU campuses.",
    metric: "↑ 41% velocity",
    badge: "Actionable",
    badgeStyle: { background: "var(--accent-cool-bg)", border: "1px solid var(--accent-cool-border)", color: "var(--accent-cool)" },
  },
  {
    label: "Cross-demographic signal",
    headline: "Mental health is the most consistent issue across ethnicity and region",
    body: "Mental health discourse appears more consistently across all ethnic groups and California regions than any other narrative — the safest universal message for candidates needing broad coalition appeal. Engagement correlates with 28% higher stated voting intent.",
    metric: "+28% voting intent",
    badgeStyle: { background: "rgba(200,150,230,0.12)", border: "1px solid rgba(200,150,230,0.30)", color: "#C896E6" },
    badge: "Coalition builder",
  },
];

const USE_CASES = [
  {
    client: "Campaigns",
    icon: "🗳",
    headline: "Turn issue velocity into targeting strategy",
    example: "Rent burden is highest-velocity in LA Metro right now. Your challenger needs a specific housing platform before the primary — not a generic affordability message. The 26-29 cohort in CD-33 is your highest-conversion audience.",
    cta: "Optimize your message →",
  },
  {
    client: "Policy Shops",
    icon: "📋",
    headline: "Brief your clients with data, not anecdote",
    example: "Climate anxiety is the #1 first-time voter mobilizer in Bay Area 18–21 cohort. Governor's climate package has a built-in youth coalition. Brief memo: 3 pages, confidence intervals, bot-filtered. Ready in 10 minutes.",
    cta: "Generate a brief →",
  },
  {
    client: "Government Offices",
    icon: "🏛",
    headline: "See what's coming 3 weeks before it arrives",
    example: "Civic disengagement velocity in the Inland Empire is up 18%. Launch a targeted registration drive now. Historical data shows this signal precedes low-turnout events by 21 days on average.",
    cta: "See early signals →",
  },
];

const SUGGESTED_PROMPTS = [
  "What issue is mobilizing first-time voters right now?",
  "Which region has the highest civic disengagement signal?",
  "What's driving the politician age narrative?",
  "How can I use the rent burden data for a campaign in LA?",
];

export default function InsightsPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, loading]);

  async function submit(query: string) {
    if (!query.trim() || loading) return;
    setMessages((prev) => [...prev, { role: "user", text: query }]);
    setInput("");
    setLoading(true);
    await new Promise((r) => setTimeout(r, 2200));
    const { answer, citations } = getResponse(query);
    setMessages((prev) => [...prev, { role: "assistant", text: answer, citations }]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-base)" }}>
      <Header />

      <main className="flex-1 max-w-5xl mx-auto w-full px-6 py-10 flex flex-col gap-14">

        {/* Section 1: AI Insights */}
        <section>
          <SectionHeader
            label="AI Insights"
            title="What the data tells you this week"
            sub={`Synthesized from ${narratives.reduce((s, n) => s + n.volume, 0).toLocaleString()} bot-filtered posts · California 18–34 · Updated May 15, 2026`}
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {AI_INSIGHTS.map((ins, i) => (
              <Card key={i} className="flex flex-col gap-3">
                <div className="flex items-start justify-between gap-3">
                  <p className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                    {ins.label}
                  </p>
                  <span className="text-[10px] font-medium px-2 py-0.5 rounded-full shrink-0" style={ins.badgeStyle}>
                    {ins.badge}
                  </span>
                </div>
                <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                  {ins.headline}
                </h3>
                <p className="text-xs leading-relaxed flex-1" style={{ color: "var(--text-secondary)" }}>
                  {ins.body}
                </p>
                <p className="text-xs font-mono font-semibold" style={{ color: "var(--accent-cool)" }}>
                  {ins.metric}
                </p>
              </Card>
            ))}
          </div>

          {pressingNarratives.length > 0 && (
            <div
              className="mt-4 rounded-xl p-4"
              style={{ background: "var(--accent-warm-bg)", border: "1px solid var(--accent-warm-border)" }}
            >
              <p className="text-xs font-medium mb-3" style={{ color: "var(--accent-warm)" }}>
                Pressing right now — {pressingNarratives.length} narrative{pressingNarratives.length !== 1 ? "s" : ""} above 40% velocity threshold
              </p>
              <div className="flex flex-wrap gap-2">
                {pressingNarratives.map((n) => (
                  <span
                    key={n.id}
                    className="text-xs font-medium px-3 py-1 rounded-full"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-subtle)",
                      color: "var(--text-secondary)",
                    }}
                  >
                    {n.title.split(" ").slice(0, 5).join(" ")}… ↑{n.velocityPct}%
                  </span>
                ))}
              </div>
            </div>
          )}
        </section>

        {/* Section 2: AI Chat */}
        <section>
          <SectionHeader
            label="Ask Atlix"
            title="Ask anything about the data"
            sub="Natural language Q&A over bot-filtered California 18–34 discourse"
          />

          <Card className="flex flex-col gap-4">
            <div className="flex-1 flex flex-col gap-4 max-h-[400px] overflow-y-auto">
              {messages.length === 0 && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {SUGGESTED_PROMPTS.map((s) => (
                    <button
                      key={s}
                      onClick={() => submit(s)}
                      className="text-left text-xs rounded-lg px-3 py-2.5 transition-all"
                      style={{
                        background: "var(--bg-base)",
                        border: "1px solid var(--border-subtle)",
                        color: "var(--text-secondary)",
                      }}
                      onMouseEnter={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-default)";
                      }}
                      onMouseLeave={(e) => {
                        (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)";
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {messages.map((msg, i) => (
                <div
                  key={i}
                  className={`flex flex-col gap-1.5 animate-msg ${msg.role === "user" ? "items-end" : "items-start"}`}
                >
                  {msg.role === "user" ? (
                    <div
                      className="px-4 py-2.5 rounded-xl rounded-tr-sm text-sm max-w-lg"
                      style={{
                        background: "var(--bg-overlay)",
                        border: "1px solid var(--border-default)",
                        color: "var(--text-primary)",
                      }}
                    >
                      {msg.text}
                    </div>
                  ) : (
                    <div
                      className="px-4 py-3 rounded-xl rounded-tl-sm max-w-2xl w-full"
                      style={{ background: "var(--bg-base)", border: "1px solid var(--border-subtle)" }}
                    >
                      <p className="text-sm leading-relaxed mb-3" style={{ color: "var(--text-secondary)" }}>
                        {msg.text}
                      </p>
                      {msg.citations && (
                        <div className="flex flex-wrap gap-1.5">
                          {msg.citations.map((c) => (
                            <span
                              key={c}
                              className="text-xs px-2 py-0.5 rounded-full"
                              style={{
                                background: "var(--accent-cool-bg)",
                                border: "1px solid var(--accent-cool-border)",
                                color: "var(--accent-cool)",
                              }}
                            >
                              {c}
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))}

              {loading && (
                <div className="flex items-start">
                  <div
                    className="px-4 py-3 rounded-xl rounded-tl-sm"
                    style={{ background: "var(--bg-base)", border: "1px solid var(--border-subtle)" }}
                  >
                    <div className="flex gap-1.5 items-center">
                      {[0, 150, 300].map((delay) => (
                        <span
                          key={delay}
                          className="w-1.5 h-1.5 rounded-full animate-bounce"
                          style={{ background: "var(--accent-cool)", animationDelay: `${delay}ms` }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              )}
              <div ref={bottomRef} />
            </div>

            <form
              onSubmit={(e) => { e.preventDefault(); submit(input); }}
              className="flex gap-2 items-center rounded-lg px-3 py-2.5 transition-colors"
              style={{ background: "var(--bg-input)", border: "1px solid var(--border-default)" }}
            >
              <input
                className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-40"
                style={{ color: "var(--text-primary)" }}
                placeholder="Ask about young voter sentiment in California…"
                value={input}
                onChange={(e) => setInput(e.target.value)}
              />
              <button
                type="submit"
                disabled={!input.trim() || loading}
                className="text-xs font-semibold px-3 py-1.5 rounded-md transition-opacity disabled:opacity-30"
                style={{ background: "var(--accent-warm)", color: "var(--accent-warm-ink)" }}
              >
                Send
              </button>
            </form>
          </Card>
        </section>

        {/* Section 3: For Your Strategy */}
        <section>
          <SectionHeader
            label="For Your Strategy"
            title="From data to action"
            sub="Atlix is a tool, not a report. Here's how clients turn the data into decisions."
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {USE_CASES.map((uc, i) => (
              <Card key={i} className="flex flex-col gap-3">
                <div className="flex items-center gap-2">
                  <span className="text-lg">{uc.icon}</span>
                  <span className="text-[10px] font-semibold uppercase tracking-widest" style={{ color: "var(--text-tertiary)" }}>
                    {uc.client}
                  </span>
                </div>
                <h3 className="text-sm font-semibold leading-snug" style={{ color: "var(--text-primary)" }}>
                  {uc.headline}
                </h3>
                <p className="text-xs leading-relaxed flex-1 italic" style={{ color: "var(--text-tertiary)" }}>
                  "{uc.example}"
                </p>
                <button
                  className="text-xs font-medium text-left transition-opacity hover:opacity-70"
                  style={{ color: "var(--accent-cool)" }}
                >
                  {uc.cta}
                </button>
              </Card>
            ))}
          </div>
        </section>

        <footer className="text-center text-xs pb-4" style={{ color: "var(--text-quat)" }}>
          Public data only · No PII collected · Confidence intervals, not point estimates · Bot-filtered corpus
        </footer>
      </main>
    </div>
  );
}
