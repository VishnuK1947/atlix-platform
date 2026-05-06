"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[#d4e4d4] px-6 py-3 flex items-center justify-between sticky top-0 z-50 bg-[#f0f7f0]">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-[#16a34a]">
          atlix
        </Link>
        <div className="flex items-center gap-1 text-sm text-[#5c7a5c]">
          <span className="w-2 h-2 rounded-full bg-[#22c55e] inline-block" />
          <span>Los Angeles</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              pathname === "/" ? "bg-[#e8f5e8] text-[#15803d] font-medium" : "text-[#5c7a5c] hover:text-[#1a2e1a] hover:bg-[#f0f7f0]"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/chat"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              pathname === "/chat" ? "bg-[#e8f5e8] text-[#15803d] font-medium" : "text-[#5c7a5c] hover:text-[#1a2e1a] hover:bg-[#f0f7f0]"
            }`}
          >
            Ask Atlix
          </Link>
        </nav>
        <div className="text-xs text-[#5c7a5c] border border-[#d4e4d4] rounded px-2 py-1">
          Live · Apr 2, 2026
        </div>
      </div>
    </header>
  );
}
