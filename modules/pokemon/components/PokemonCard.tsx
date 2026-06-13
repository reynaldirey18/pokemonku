"use client";

import Image from "next/image";
import { useRouter } from "next/navigation";
import Card from "@/components/ui/Card";
import Badge from "@/components/ui/Badge";
import type { PokemonDetail, CustomPokemon } from "../types";

type Props = {
  pokemon: PokemonDetail | CustomPokemon;
};

export default function PokemonCard({ pokemon }: Props) {
  const router = useRouter();
  const isCustom = "isCustom" in pokemon;

  const imageUrl = isCustom
    ? null
    : (pokemon.sprites.other["official-artwork"].front_default ??
      pokemon.sprites.front_default);

  const href = isCustom
    ? `/pokemon/custom/${pokemon.id}`
    : `/pokemon/${pokemon.name}`;

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
              alt={pokemon.name}
              width={96}
              height={96}
              className="object-contain drop-shadow-lg"
            />
          ) : (
            <div className="w-full h-full rounded-full bg-white/10 flex items-center justify-center text-3xl">
              ?
            </div>
          )}
        </div>

        <p className="text-sm font-semibold text-white/90 capitalize w-full text-center truncate">
          {pokemon.name}
        </p>
      </div>
    </Card>
  );
}
