"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import Input from "@/components/ui/Input";
import { useDebounce } from "@/lib/useDebounce";

export default function BerrySearch() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [value, setValue] = useState(searchParams.get("q") ?? "");
  const debounced = useDebounce(value);
  const isFirstRender = useRef(true);
  const searchParamsRef = useRef(searchParams);
  searchParamsRef.current = searchParams;

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    const params = new URLSearchParams(searchParamsRef.current.toString());
    if (debounced.length >= 3) {
      params.set("q", debounced);
    } else {
      params.delete("q");
    }
    params.set("page", "1");
    router.push(`/berries?${params.toString()}`);
  }, [debounced, router]);

  const handleClear = () => {
    setValue("");
    const params = new URLSearchParams(searchParamsRef.current.toString());
    params.delete("q");
    params.set("page", "1");
    router.push(`/berries?${params.toString()}`);
  };

  return (
    <Input
      variant="search"
      placeholder="Search Berries..."
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onClear={handleClear}
    />
  );
}
