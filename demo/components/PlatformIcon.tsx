import type { Platform } from "@/data/mockNarratives";

export default function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "reddit") {
    return (
      <span className="text-xs bg-orange-500/15 text-orange-400 border border-orange-500/20 rounded px-1.5 py-0.5 font-medium">
        Reddit
      </span>
    );
  }
  if (platform === "x") {
    return (
      <span className="text-xs bg-white/10 text-white border border-white/10 rounded px-1.5 py-0.5 font-medium">
        X
      </span>
    );
  }
  return (
    <span className="text-xs bg-blue-500/15 text-blue-400 border border-blue-500/20 rounded px-1.5 py-0.5 font-medium">
      News
    </span>
  );
}
