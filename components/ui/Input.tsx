"use client";

import { Search, X } from "lucide-react";
import { cn } from "@/lib/cn";

type InputProps = {
  label?: string;
  error?: string;
  hint?: string;
  variant?: "default" | "search";
  onClear?: () => void;
} & React.InputHTMLAttributes<HTMLInputElement>;

export default function Input({
  label,
  error,
  hint,
  variant = "default",
  onClear,
  className,
  ...props
}: InputProps) {
  const hasValue = Boolean(props.value);

  return (
    <div className="flex flex-col gap-1.5">
      {label && (
        <label className="text-sm font-medium text-white/80">{label}</label>
      )}
      <div className="relative">
        {variant === "search" && (
          <Search
            className="absolute left-3 top-1/2 -translate-y-1/2 text-white/40"
            size={16}
          />
        )}
        <input
          className={cn(
            "glass w-full rounded-xl px-4 py-2.5 text-sm text-white/90 placeholder:text-white/30 outline-none",
            "border border-white/20 focus:border-white/50 transition-colors",
            variant === "search" && "pl-9",
            variant === "search" && onClear && hasValue && "pr-8",
            error && "border-red-400/60 focus:border-red-400",
            className
          )}
          {...props}
        />
        {variant === "search" && onClear && hasValue && (
          <button
            type="button"
            onClick={onClear}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white/80 transition-colors"
          >
            <X size={14} />
          </button>
        )}
      </div>
      {error && <p className="text-xs text-red-400">{error}</p>}
      {hint && !error && <p className="text-xs text-white/40">{hint}</p>}
    </div>
  );
}
