"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  const tabs = [
    { href: "/", label: "Feed" },
    { href: "/chat", label: "Ask" },
    { href: "/insights", label: "Insights" },
  ];

  return (
    <header
      className="sticky top-0 z-50 flex items-center justify-between px-6 h-16"
      style={{ background: "var(--bg-base)", borderBottom: "1px solid var(--border-subtle)" }}
    >
      {/* Left: wordmark */}
      <div className="flex items-center">
        <Link
          href="/"
          className="text-[17px] font-bold tracking-tight"
          style={{ color: "var(--text-primary)" }}
        >
          Atlix
        </Link>
      </div>

      {/* Right: utility links + live + tabs */}
      <div className="flex items-center gap-5">
        <div className="flex items-center gap-4 text-xs" style={{ color: "var(--accent-cool)" }}>
          <button className="hover:opacity-80 transition-opacity">Methodology ↗</button>
          <button className="hover:opacity-80 transition-opacity">Plans ↗</button>
        </div>

        <div className="flex items-center gap-1.5 text-xs" style={{ color: "var(--text-tertiary)" }}>
          <span
            className="w-1.5 h-1.5 rounded-full animate-live"
            style={{ background: "var(--sentiment-pos)" }}
          />
          <span style={{ color: "var(--text-secondary)" }}>Live</span>
          <span className="font-mono">· May 15, 2026</span>
        </div>

        <nav className="flex items-center gap-0.5">
          {tabs.map(({ href, label }) => {
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                className="px-3 py-1.5 rounded-md text-sm font-medium transition-colors"
                style={{
                  background: active ? "var(--bg-elevated)" : "transparent",
                  color: active ? "var(--text-primary)" : "var(--text-tertiary)",
                }}
              >
                {label}
              </Link>
            );
          })}
        </nav>
      </div>
    </header>
  );
}
