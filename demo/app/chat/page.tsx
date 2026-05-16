"use client";

import { useState, useRef, useEffect } from "react";
import Header from "@/components/Header";
import { mockChatResponses } from "@/data/mockNarratives";

interface Message {
  role: "user" | "assistant";
  text: string;
  citations?: string[];
}

const SUGGESTIONS = [
  { category: "HOUSING", text: "What are 18-34 year olds saying about rent on Reddit and X?" },
  { category: "POLITICS", text: "How are young Californians talking about politician age and representation?" },
  { category: "MENTAL HEALTH", text: "What's the mental health access discourse across CA right now?" },
  { category: "CIVIC ENGAGEMENT", text: "Are young Californians engaging with the 2026 primary races?" },
];

const FREQUENT = [
  { q: "Sentiment on Newsom across young Californians this week?", count: 24 },
  { q: "Top emotions driving the politician age discourse?", count: 18 },
  { q: "What are CSU students saying about the LAUSD strike?", count: 14 },
  { q: "Where is climate anxiety pushing career choices?", count: 9 },
];

function getResponse(query: string): { answer: string; citations: string[] } {
  const q = query.toLowerCase();
  for (const [key, val] of Object.entries(mockChatResponses)) {
    if (key !== "default" && q.includes(key)) return val;
  }
  return mockChatResponses.default;
}

export default function ChatPage() {
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

  const hasMessages = messages.length > 0;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "var(--bg-base)" }}>
      <Header />
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-6 py-10">
        {/* Empty state hero */}
        {!hasMessages && (
          <div className="mb-10">
            <p
              className="text-xs font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-tertiary)" }}
            >
              Ask Atlix
            </p>
            <h1 className="text-[32px] font-semibold leading-tight mb-4" style={{ color: "var(--text-primary)" }}>
              Ask anything about young<br />Californians on Reddit and X
            </h1>
            <p className="text-sm leading-relaxed" style={{ color: "var(--text-secondary)" }}>
              Atlix surfaces what 18–34 year old Californians are saying in English-language
              public discourse. Confidence intervals, not point estimates.
            </p>
          </div>
        )}

        {/* Suggestion cards (empty state) */}
        {!hasMessages && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
            {SUGGESTIONS.map((s) => (
              <button
                key={s.text}
                onClick={() => submit(s.text)}
                className="text-left rounded-xl p-5 transition-all group"
                style={{
                  background: "var(--bg-elevated)",
                  border: "1px solid var(--border-subtle)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-default)";
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-overlay)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "var(--border-subtle)";
                  (e.currentTarget as HTMLButtonElement).style.background = "var(--bg-elevated)";
                }}
              >
                <div className="flex items-start justify-between gap-2 mb-2">
                  <p
                    className="text-[10px] font-semibold uppercase tracking-widest"
                    style={{ color: "var(--text-tertiary)" }}
                  >
                    {s.category}
                  </p>
                  <span style={{ color: "var(--text-tertiary)" }}>→</span>
                </div>
                <p className="text-sm font-medium leading-snug" style={{ color: "var(--text-primary)" }}>
                  {s.text}
                </p>
              </button>
            ))}
          </div>
        )}

        {/* Message thread */}
        {hasMessages && (
          <div className="flex-1 flex flex-col gap-4 mb-6 overflow-y-auto">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex flex-col gap-2 animate-msg ${msg.role === "user" ? "items-end" : "items-start"}`}
              >
                {msg.role === "user" ? (
                  <div
                    className="px-4 py-3 rounded-2xl rounded-tr-sm text-sm max-w-lg"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-default)",
                      color: "var(--text-primary)",
                    }}
                  >
                    {msg.text}
                  </div>
                ) : (
                  <div
                    className="px-5 py-4 rounded-2xl rounded-tl-sm max-w-2xl w-full"
                    style={{
                      background: "var(--bg-elevated)",
                      border: "1px solid var(--border-subtle)",
                    }}
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
                  className="px-5 py-4 rounded-2xl rounded-tl-sm"
                  style={{ background: "var(--bg-elevated)", border: "1px solid var(--border-subtle)" }}
                >
                  <div className="flex gap-1.5 items-center">
                    {[0, 150, 300].map((delay) => (
                      <span
                        key={delay}
                        className="w-1.5 h-1.5 rounded-full animate-bounce"
                        style={{
                          background: "var(--accent-cool)",
                          animationDelay: `${delay}ms`,
                        }}
                      />
                    ))}
                  </div>
                </div>
              </div>
            )}

            <div ref={bottomRef} />
          </div>
        )}

        {/* Input */}
        <div>
          <form
            onSubmit={(e) => { e.preventDefault(); submit(input); }}
            className="flex gap-2 items-center rounded-xl px-4 py-3 transition-colors"
            style={{
              background: "var(--bg-input)",
              border: "1px solid var(--border-default)",
            }}
            onFocus={(e) => (e.currentTarget.style.borderColor = "var(--accent-cool)")}
            onBlur={(e) => (e.currentTarget.style.borderColor = "var(--border-default)")}
          >
            <input
              className="flex-1 bg-transparent text-sm outline-none placeholder:opacity-50"
              style={{ color: "var(--text-primary)" }}
              placeholder="Ask about young Californians on Reddit and X…"
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button
              type="submit"
              disabled={!input.trim() || loading}
              className="text-xs font-semibold px-4 py-2 rounded-lg transition-opacity disabled:opacity-30"
              style={{
                background: "var(--accent-warm)",
                color: "var(--accent-warm-ink)",
              }}
            >
              Send
            </button>
          </form>
          <p className="text-xs mt-2 text-center" style={{ color: "var(--text-quat)" }}>
            Press Enter to send · Responses synthesized from indexed sources
          </p>
        </div>

        {/* Frequently asked (empty state only) */}
        {!hasMessages && (
          <div className="mt-10">
            <p
              className="text-[10px] font-semibold uppercase tracking-widest mb-4"
              style={{ color: "var(--text-tertiary)" }}
            >
              Frequently Asked This Week
            </p>
            <div className="flex flex-col">
              {FREQUENT.map((item, i) => (
                <div key={i}>
                  <div
                    className="py-3 flex items-center justify-between gap-4"
                    style={{ borderBottom: i < FREQUENT.length - 1 ? "1px solid var(--border-subtle)" : undefined }}
                  >
                    <button
                      onClick={() => submit(item.q)}
                      className="text-sm text-left hover:opacity-70 transition-opacity"
                      style={{ color: "var(--text-secondary)" }}
                    >
                      {item.q}
                    </button>
                    <span className="text-xs font-mono shrink-0" style={{ color: "var(--text-tertiary)" }}>
                      asked {item.count} times this week
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
