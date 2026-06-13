"use client";

import Image from "next/image";
import { Leaf } from "lucide-react";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import type { BerryDetail, CustomBerry } from "../types";

type Props = {
  berry: Pick<BerryDetail, "id" | "name"> | CustomBerry;
};

export default function BerryCard({ berry }: Props) {
  const router = useRouter();
  const isCustom = "isCustom" in berry;

  const imageUrl = isCustom
    ? null
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.name}-berry.png`;

  const href = isCustom
    ? `/berries/custom/${berry.id}`
    : `/berries/${berry.name}`;

  return (
    <Card onClick={() => router.push(href)}>
      {isCustom && (
        <span className="absolute top-2 right-2 z-10 text-[9px] bg-white/15 text-white/50 px-1.5 py-0.5 rounded-full uppercase tracking-wider">
          custom
        </span>
      )}

      <div className="p-4 flex flex-col items-center gap-3">
        <div className="w-24 h-24 flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={berry.name}
              width={96}
              height={96}
              className="object-contain drop-shadow-lg"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">
              <Leaf size={36} className="text-white/40" />
            </div>
          )}
        </div>

        <p className="text-sm font-semibold text-white/90 capitalize w-full text-center truncate">
          {berry.name}
        </p>
      </div>
    </Card>
  );
}
