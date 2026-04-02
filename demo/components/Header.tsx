"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[#242424] px-6 py-3 flex items-center justify-between sticky top-0 z-50 bg-[#0a0a0a]">
      <div className="flex items-center gap-6">
        <Link href="/" className="text-lg font-bold tracking-tight text-white">
          atlix
        </Link>
        <div className="flex items-center gap-1 text-sm text-[#888]">
          <span className="w-2 h-2 rounded-full bg-green-500 inline-block" />
          <span>Los Angeles</span>
        </div>
      </div>

      <div className="flex items-center gap-4">
        <nav className="flex items-center gap-1 text-sm">
          <Link
            href="/"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              pathname === "/" ? "bg-[#1e1e1e] text-white" : "text-[#888] hover:text-white"
            }`}
          >
            Dashboard
          </Link>
          <Link
            href="/chat"
            className={`px-3 py-1.5 rounded-md transition-colors ${
              pathname === "/chat" ? "bg-[#1e1e1e] text-white" : "text-[#888] hover:text-white"
            }`}
          >
            Ask Atlix
          </Link>
        </nav>
        <div className="text-xs text-[#555] border border-[#242424] rounded px-2 py-1">
          Live · Apr 2, 2026
        </div>
      </div>
    </header>
  );
}
