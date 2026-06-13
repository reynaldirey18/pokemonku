"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useGetBerryDetail } from "../hooks/useGetBerryDetail";
import { useDeleteCustomBerry } from "../hooks/useDeleteCustomBerry";
import BerryDetailView from "./BerryDetailView";
import { SkeletonCard } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import type { CustomBerry } from "../types";

type Props = {
  name: string;
  customBerry?: CustomBerry;
};

export default function BerryDetailClient({ name, customBerry }: Props) {
  const router = useRouter();
  const { deleteBerry, isDeleting } = useDeleteCustomBerry();
  const berryName = customBerry?.name ?? name;

  const { data, isLoading, isError } = useGetBerryDetail(berryName, {
    enabled: !customBerry,
  });

  const berry = customBerry ?? data;

  if (!customBerry && isLoading) return <SkeletonCard />;
  if (!customBerry && (isError || !data)) {
    return <EmptyState message="Berry tidak ditemukan." />;
  }
  if (!berry) return null;

  return (
    <>
      <div className="mb-6 flex items-center justify-between">
        <button
          onClick={() => router.back()}
          className="flex items-center gap-1 text-white/60 hover:text-white/90 transition-colors"
        >
          <ChevronLeft size={18} />
          <span className="text-sm">Back</span>
        </button>

        {customBerry && (
          <Button
            variant="danger"
            size="sm"
            isLoading={isDeleting}
            onClick={() => deleteBerry(customBerry.id)}
          >
            Delete
          </Button>
        )}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <BerryDetailView berry={berry} />
      </div>
    </>
  );
}