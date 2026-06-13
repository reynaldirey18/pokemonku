"use client";

import { useRouter, useSearchParams, usePathname } from "next/navigation";
import Button from "@/components/ui/Button";

export type FilterType = "all" | "api" | "custom";

const OPTIONS: { label: string; value: FilterType }[] = [
  { label: "All", value: "all" },
  { label: "API", value: "api" },
  { label: "Custom", value: "custom" },
];

export default function BerryFilter() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const active = (searchParams.get("filter") ?? "all") as FilterType;

  const setFilter = (value: FilterType) => {
    const params = new URLSearchParams(searchParams.toString());
    if (value === "all") {
      params.delete("filter");
    } else {
      params.set("filter", value);
    }
    params.delete("page");
    router.push(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="flex gap-2">
      {OPTIONS.map((opt) => (
        <Button
          key={opt.value}
          size="sm"
          variant={active === opt.value ? "primary" : "ghost"}
          className={active === opt.value ? "ring-1 ring-white/40" : ""}
          onClick={() => setFilter(opt.value)}
        >
          {opt.label}
        </Button>
      ))}
    </div>
  );
}
