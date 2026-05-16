import type { Platform } from "@/data/mockNarratives";

export default function PlatformIcon({ platform }: { platform: Platform }) {
  const label = platform === "reddit" ? "RDT" : platform === "x" ? "X" : "NEWS";
  return (
    <span
      className="text-[10px] font-mono font-semibold px-1.5 py-0.5 rounded"
      style={{
        background: "var(--accent-cool-bg)",
        border: "1px solid var(--accent-cool-border)",
        color: "var(--accent-cool)",
      }}
    >
      {label}
    </span>
  );
}
