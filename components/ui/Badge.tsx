"use client";

import { motion } from "motion/react";
import { cn } from "@/lib/cn";

const typeColors: Record<string, string> = {
  fire: "bg-orange-500/70 text-orange-50",
  water: "bg-blue-500/70 text-blue-50",
  grass: "bg-green-500/70 text-green-50",
  electric: "bg-yellow-400/70 text-yellow-950",
  psychic: "bg-pink-500/70 text-pink-50",
  ice: "bg-cyan-400/70 text-cyan-950",
  dragon: "bg-indigo-600/70 text-indigo-50",
  dark: "bg-zinc-700/70 text-zinc-100",
  normal: "bg-zinc-400/70 text-zinc-950",
  fighting: "bg-red-700/70 text-red-50",
  poison: "bg-purple-500/70 text-purple-50",
  ground: "bg-amber-600/70 text-amber-50",
  flying: "bg-sky-400/70 text-sky-950",
  bug: "bg-lime-500/70 text-lime-950",
  rock: "bg-stone-500/70 text-stone-50",
  ghost: "bg-violet-700/70 text-violet-50",
  steel: "bg-slate-400/70 text-slate-950",
  fairy: "bg-rose-400/70 text-rose-950",
};

type BadgeProps = {
  pokemonType: string;
  index?: number;
  className?: string;
};

export default function Badge({ pokemonType, index = 0, className }: BadgeProps) {
  const colorClass = typeColors[pokemonType] ?? "bg-zinc-400/70 text-zinc-950";

  return (
    <motion.span
      initial={{ scale: 0, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: "spring", stiffness: 500, delay: index * 0.05 }}
      className={cn(
        "inline-block rounded-full px-2.5 py-0.5 text-xs font-semibold capitalize",
        colorClass,
        className
      )}
    >
      {pokemonType}
    </motion.span>
  );
}
