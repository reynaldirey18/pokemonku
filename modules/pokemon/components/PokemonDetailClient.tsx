"use client";

import { useRouter } from "next/navigation";
import { ChevronLeft } from "lucide-react";
import { useGetPokemonDetail } from "../hooks/useGetPokemonDetail";
import { useDeleteCustomPokemon } from "../hooks/useDeleteCustomPokemon";
import PokemonDetailView from "./PokemonDetailView";
import { SkeletonCard } from "@/components/ui/Skeleton";
import EmptyState from "@/components/ui/EmptyState";
import Button from "@/components/ui/Button";
import type { CustomPokemon } from "../types";

type Props = {
  name: string;
  customPokemon?: CustomPokemon;
};

export default function PokemonDetailClient({ name, customPokemon }: Props) {
  const router = useRouter();
  const { deletePokemon, isDeleting } = useDeleteCustomPokemon();
  const pokemonName = customPokemon?.name ?? name;
  const { data, isLoading, isError } = useGetPokemonDetail(pokemonName, {
    enabled: !customPokemon,
  });

  const pokemon = customPokemon ?? data;

  if (!customPokemon && isLoading) return <SkeletonCard />;
  if (!customPokemon && (isError || !data)) {
    return <EmptyState message="Pokémon tidak ditemukan." />;
  }
  if (!pokemon) return null;

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

        {customPokemon && (
          <Button
            variant="danger"
            size="sm"
            isLoading={isDeleting}
            onClick={() => deletePokemon(customPokemon.id)}
          >
            Hapus
          </Button>
        )}
      </div>

      <div className="glass-card rounded-2xl p-6">
        <PokemonDetailView pokemon={pokemon} />
      </div>
    </>
  );
}
