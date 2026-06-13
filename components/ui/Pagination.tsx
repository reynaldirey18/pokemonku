"use client";

import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/lib/cn";

type PaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const isPrevDisabled = currentPage <= 1;
  const isNextDisabled = currentPage >= totalPages;

  return (
    <div className="glass rounded-full px-2 py-1 flex items-center gap-1">
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={isPrevDisabled}
        className={cn(
          "p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors",
          isPrevDisabled && "opacity-40 pointer-events-none"
        )}
      >
        <ChevronLeft size={16} />
      </button>

      <span className="px-3 text-sm text-white/80 min-w-[80px] text-center">
        {currentPage} / {totalPages}
      </span>

      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={isNextDisabled}
        className={cn(
          "p-1.5 rounded-full text-white/70 hover:text-white hover:bg-white/10 transition-colors",
          isNextDisabled && "opacity-40 pointer-events-none"
        )}
      >
        <ChevronRight size={16} />
      </button>
    </div>
  );
}
