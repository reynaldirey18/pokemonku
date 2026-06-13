"use client";

import Image from "next/image";
import { Leaf } from "lucide-react";
import Badge from "@/components/ui/Badge";
import type { BerryDetail, CustomBerry } from "../types";

type Props = {
  berry: BerryDetail | CustomBerry;
};

export default function BerryDetailView({ berry }: Props) {
  const isCustom = "isCustom" in berry;

  const imageUrl = isCustom
    ? null
    : `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/items/${berry.name}-berry.png`;

  const giftType = isCustom ? berry.natural_gift_type : berry.natural_gift_type.name;
  const firmness = isCustom ? berry.firmness : berry.firmness.name;

  const flavors = isCustom
    ? berry.flavors.map((f) => ({ name: f, potency: null }))
    : berry.flavors.map((f) => ({ name: f.flavor.name, potency: f.potency }));

  const stats = isCustom
    ? [{ label: "Smoothness", value: berry.smoothness }]
    : [
        { label: "Smoothness", value: berry.smoothness },
        { label: "Size", value: `${berry.size} mm` },
        { label: "Growth Time", value: `${berry.growth_time}h` },
        { label: "Max Harvest", value: berry.max_harvest },
        { label: "Soil Dryness", value: berry.soil_dryness },
        { label: "Natural Gift Power", value: berry.natural_gift_power },
      ];

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex flex-col items-center gap-4 md:w-48 flex-shrink-0">
        <div className="w-[160px] h-[160px] flex items-center justify-center">
          {imageUrl ? (
            <Image
              src={imageUrl}
              alt={berry.name}
              width={160}
              height={160}
              className="object-contain drop-shadow-2xl"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center">
              <Leaf size={64} className="text-white/40" />
            </div>
          )}
        </div>

        <h1 className="text-2xl font-bold text-white/90 capitalize">{berry.name}</h1>
        <p className="text-xs text-white/40">#{String(berry.id).padStart(3, "0")}</p>

        <Badge pokemonType={giftType} index={0} />
      </div>

      <div className="flex-1 flex flex-col gap-6">
        <div>
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
            Flavors
          </h2>
          <div className="flex flex-wrap gap-2">
            {flavors.length > 0 ? (
              flavors.map((f) => (
                <span
                  key={f.name}
                  className="glass rounded-full px-3 py-1 text-sm text-white/80 capitalize flex items-center gap-1.5"
                >
                  {f.name}
                  {f.potency !== null && f.potency > 0 && (
                    <span className="text-white/40 text-xs">{f.potency}</span>
                  )}
                </span>
              ))
            ) : (
              <span className="text-sm text-white/40">—</span>
            )}
          </div>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
            Firmness
          </h2>
          <span className="glass rounded-full px-3 py-1 text-sm text-white/80 capitalize">
            {firmness}
          </span>
        </div>

        <div>
          <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
            Info
          </h2>
          <div className="grid grid-cols-2 gap-2">
            {stats.map((s) => (
              <div
                key={s.label}
                className="glass rounded-xl px-4 py-2.5 flex flex-col gap-0.5"
              >
                <span className="text-xs text-white/40">{s.label}</span>
                <span className="text-sm font-medium text-white/80">{s.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
