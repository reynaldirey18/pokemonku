"use client";

import { motion } from "motion/react";
import { useFilteredBerries } from "../hooks/useFilteredBerries";
import BerryCard from "./BerryCard";
import { SkeletonCard } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import type { CustomBerry } from "../types";
import type { FilterType } from "./BerryFilter";

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
  initialCustom?: CustomBerry[];
  search?: string;
  filter?: FilterType;
};

export default function BerryGrid({
  limit,
  offset,
  initialCustom = [],
  search,
  filter = "all",
}: Props) {
  const { customItems, apiItems, isLoading, isError } = useFilteredBerries({
    limit,
    offset,
    initialCustom,
    search,
    filter,
  });

  if (isError && filter !== "custom") {
    return <EmptyState message="Gagal memuat data." />;
  }

  if (filter === "custom" && !isLoading && customItems.length === 0) {
    return <EmptyState message="Belum ada custom berry." />;
  }

  const noResults =
    !isLoading &&
    filter !== "custom" &&
    apiItems.length === 0 &&
    customItems.length === 0;

  if (noResults) {
    return <EmptyState message="Berry tidak ditemukan." />;
  }

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="show"
      className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4"
    >
      {customItems.map((b) => (
        <motion.div key={b.id} variants={itemVariants}>
          <BerryCard berry={b} />
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
                <BerryCard berry={item} />
              </motion.div>
            )))}
    </motion.div>
  );
}
