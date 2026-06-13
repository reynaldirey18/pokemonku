"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/cn";

const NAV_LINKS = [
  { href: "/pokemon", label: "Pokémon" },
  { href: "/berries", label: "Berries" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="sticky top-0 z-50 glass-panel border-b border-white/10">
      <div className="max-w-7xl mx-auto px-4 h-14 flex items-center justify-between">
        <Link
          href="/"
          className="text-sm font-bold text-white/90 hover:text-white transition-colors tracking-wide"
        >
          PokémonKu
        </Link>

        <div className="flex items-center gap-1">
          {NAV_LINKS.map(({ href, label }) => {
            const isActive = pathname.startsWith(href);
            return (
              <Link
                key={href}
                href={href}
                className={cn(
                  "px-4 py-1.5 rounded-full text-sm font-medium transition-all",
                  isActive
                    ? "glass text-white/90"
                    : "text-white/50 hover:text-white/80 hover:bg-white/5"
                )}
              >
                {label}
              </Link>
            );
          })}
        </div>
      </div>
    </nav>
  );
}
