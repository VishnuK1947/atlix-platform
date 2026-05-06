import type { Platform } from "@/data/mockNarratives";

export default function PlatformIcon({ platform }: { platform: Platform }) {
  if (platform === "reddit") {
    return (
      <span className="text-xs bg-orange-50 text-orange-600 border border-orange-200 rounded px-1.5 py-0.5 font-medium">
        Reddit
      </span>
    );
  }
  if (platform === "x") {
    return (
      <span className="text-xs bg-gray-100 text-gray-600 border border-gray-200 rounded px-1.5 py-0.5 font-medium">
        X
      </span>
    );
  }
  return (
    <span className="text-xs bg-blue-50 text-blue-600 border border-blue-200 rounded px-1.5 py-0.5 font-medium">
      News
    </span>
  );
}
