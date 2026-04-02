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
  "What are people saying about the wildfire recovery?",
  "Tell me about LAPD overtime spending",
  "What's the latest on the Metro expansion?",
  "What's happening with the teacher strike?",
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
    const userMsg: Message = { role: "user", text: query };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    await new Promise((r) => setTimeout(r, 3000));

    const { answer, citations } = getResponse(query);
    setMessages((prev) => [
      ...prev,
      { role: "assistant", text: answer, citations },
    ]);
    setLoading(false);
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 flex flex-col max-w-3xl mx-auto w-full px-4 py-6">
        <div className="mb-6">
          <h1 className="text-base font-semibold text-white">Ask Atlix</h1>
          <p className="text-xs text-[#555] mt-0.5">
            Ask anything about public discourse in Los Angeles
          </p>
        </div>

        {/* Messages */}
        <div className="flex-1 flex flex-col gap-4 mb-6 min-h-0 overflow-y-auto">
          {messages.length === 0 && (
            <div className="flex flex-col gap-3">
              <p className="text-sm text-[#555]">Try asking:</p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {SUGGESTIONS.map((s) => (
                  <button
                    key={s}
                    onClick={() => submit(s)}
                    className="text-left text-sm text-[#888] bg-[#141414] border border-[#242424] rounded-xl px-4 py-3 hover:border-[#3b82f6]/40 hover:text-white transition-colors"
                  >
                    {s}
                  </button>
                ))}
              </div>
            </div>
          )}

          {messages.map((msg, i) => (
            <div
              key={i}
              className={`flex flex-col gap-2 ${
                msg.role === "user" ? "items-end" : "items-start"
              }`}
            >
              {msg.role === "user" ? (
                <div className="bg-[#1e1e1e] border border-[#2a2a2a] rounded-2xl rounded-tr-sm px-4 py-3 text-sm text-white max-w-lg">
                  {msg.text}
                </div>
              ) : (
                <div className="bg-[#141414] border border-[#242424] rounded-2xl rounded-tl-sm px-5 py-4 max-w-2xl w-full">
                  <p className="text-sm text-[#ccc] leading-relaxed mb-3">
                    {msg.text}
                  </p>
                  {msg.citations && (
                    <div className="flex flex-wrap gap-2">
                      {msg.citations.map((c) => (
                        <span
                          key={c}
                          className="text-xs text-[#3b82f6] bg-[#3b82f6]/10 border border-[#3b82f6]/20 rounded-full px-2.5 py-0.5"
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
              <div className="bg-[#141414] border border-[#242424] rounded-2xl rounded-tl-sm px-5 py-4">
                <div className="flex gap-1.5 items-center">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-bounce [animation-delay:0ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-bounce [animation-delay:150ms]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#3b82f6] animate-bounce [animation-delay:300ms]" />
                </div>
              </div>
            </div>
          )}

          <div ref={bottomRef} />
        </div>

        {/* Input */}
        <form
          onSubmit={(e) => {
            e.preventDefault();
            submit(input);
          }}
          className="flex gap-2 items-center bg-[#141414] border border-[#242424] rounded-2xl px-4 py-3 focus-within:border-[#3b82f6]/50 transition-colors"
        >
          <input
            className="flex-1 bg-transparent text-sm text-white placeholder-[#555] outline-none"
            placeholder="Ask anything about LA public discourse..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <button
            type="submit"
            disabled={!input.trim() || loading}
            className="text-xs font-medium text-[#3b82f6] disabled:text-[#333] transition-colors px-2"
          >
            Send
          </button>
        </form>
      </main>
    </div>
  );
}
