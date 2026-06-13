"use client";

import { motion } from "motion/react";
import { useFilteredPokemons } from "../hooks/useFilteredPokemons";
import PokemonCard from "./PokemonCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import type { CustomPokemon } from "../types";
import type { FilterType } from "./PokemonFilter";

const containerVariants = {
  hidden: {},
  show: { transition: { staggerChildren: 0.06 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20, scale: 0.97 },
  show: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.35, ease: [0.25, 0.46, 0.45, 0.94] as const },
  },
};

type Props = {
  limit: number;
  offset: number;
  initialCustom?: CustomPokemon[];
  search?: string;
  filter?: FilterType;
};

export default function PokemonGrid({
  limit,
  offset,
  initialCustom = [],
  search,
  filter = "all",
}: Props) {
  const { customItems, apiItems, isLoading, isError } = useFilteredPokemons({
    limit,
    offset,
    initialCustom,
    search,
    filter,
  });

  if (isError && filter !== "custom") {
    return <EmptyState message="Failed to load data." />;
  }

  if (filter === "custom" && !isLoading && customItems.length === 0) {
    return <EmptyState message="No custom Pokémon yet." />;
  }

  const noResults =
    !isLoading &&
    filter !== "custom" &&
    apiItems.length === 0 &&
    customItems.length === 0;

  if (noResults) {
    return <EmptyState message="No Pokémon found." />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      {customItems.map((p) => (
        <motion.div key={p.id} variants={itemVariants}>
          <PokemonCard pokemon={p} />
        </motion.div>
      ))}

      {filter !== "custom" &&
        (isLoading
          ? Array.from({ length: limit }).map((_, i) => (
              <motion.div key={i} variants={itemVariants}>
                <SkeletonCard />
              </motion.div>
            ))
          : apiItems.map((item) => (
              <motion.div key={item.name} variants={itemVariants}>
                <PokemonCard pokemon={item} />
              </motion.div>
            )))}
    </motion.div>
  );
}
