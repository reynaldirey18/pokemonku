"use client";

import Image from "next/image";
import { motion } from "motion/react";
import Badge from "@/components/ui/Badge";
import type { PokemonDetail, CustomPokemon } from "../types";

type Props = {
  pokemon: PokemonDetail | CustomPokemon;
};

const statMax: Record<string, number> = {
  hp: 255, attack: 190, defense: 230,
  "special-attack": 194, "special-defense": 230, speed: 180,
};

export default function PokemonDetailView({ pokemon }: Props) {
  const isCustom = "isCustom" in pokemon;

  const image = isCustom
    ? null
    : (pokemon.sprites.other["official-artwork"].front_default ??
      pokemon.sprites.front_default);

  const types = isCustom
    ? pokemon.types
    : pokemon.types.map((t) => t.type.name);

  const abilities = isCustom
    ? pokemon.abilities.map((a) => ({ name: a, isHidden: false }))
    : pokemon.abilities.map((a) => ({ name: a.ability.name, isHidden: a.is_hidden }));

  return (
    <div className="flex flex-col md:flex-row gap-8">
      <div className="flex flex-col items-center gap-4 md:w-56 flex-shrink-0">
        {image ? (
          <Image
            src={image}
            alt={pokemon.name}
            width={180}
            height={180}
            className="object-contain drop-shadow-2xl"
          />
        ) : (
          <div className="w-[180px] h-[180px] rounded-full bg-white/10 flex items-center justify-center text-6xl">
            ?
          </div>
        )}

        <h1 className="text-2xl font-bold text-white/90 capitalize">{pokemon.name}</h1>
        <p className="text-xs text-white/40">#{String(pokemon.id).padStart(3, "0")}</p>

        <div className="flex gap-2 flex-wrap justify-center">
          {types.map((type, i) => (
            <Badge key={type} pokemonType={type} index={i} />
          ))}
        </div>

        {!isCustom && (
          <div className="text-xs text-white/50 flex gap-4">
            <span>Height: {pokemon.height / 10}m</span>
            <span>Weight: {pokemon.weight / 10}kg</span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col gap-6">
        {abilities.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-2">
              Abilities
            </h2>
            <div className="flex flex-wrap gap-2">
              {abilities.map((a) => (
                <span
                  key={a.name}
                  className="glass rounded-full px-3 py-1 text-sm text-white/80 capitalize"
                >
                  {a.name}
                  {a.isHidden && (
                    <span className="ml-1 text-white/30 text-xs">(hidden)</span>
                  )}
                </span>
              ))}
            </div>
          </div>
        )}

        {pokemon.stats.length > 0 && (
          <div>
            <h2 className="text-sm font-semibold text-white/60 uppercase tracking-wider mb-3">
              Base Stats
            </h2>
            <div className="flex flex-col gap-2.5">
              {pokemon.stats.map((s) => {
                const max = statMax[s.stat.name] ?? 255;
                const pct = Math.round((s.base_stat / max) * 100);
                return (
                  <div key={s.stat.name} className="flex items-center gap-3">
                    <span className="text-xs text-white/50 capitalize w-28 shrink-0">
                      {s.stat.name}
                    </span>
                    <span className="text-xs text-white/80 w-8 text-right">
                      {s.base_stat}
                    </span>
                    <div className="flex-1 h-1.5 rounded-full bg-white/10 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${pct}%` }}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.1 }}
                        className="h-full rounded-full bg-white/60"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
