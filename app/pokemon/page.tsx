import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getPokemonList } from "@/modules/pokemon/services/pokemon.server";
import { getCustomPokemons } from "@/modules/pokemon/actions/addCustomPokemon";
import PokemonGrid from "@/modules/pokemon/components/PokemonGrid";
import PokemonSearch from "@/modules/pokemon/components/PokemonSearch";
import PokemonPagination from "@/modules/pokemon/components/PokemonPagination";
import PokemonFilter from "@/modules/pokemon/components/PokemonFilter";
import AddPokemonButton from "@/modules/pokemon/components/AddPokemonButton";
import type { FilterType } from "@/modules/pokemon/components/PokemonFilter";

const LIMIT = 20;

type Props = {
  searchParams: Promise<{ page?: string; q?: string; filter?: string }>;
};

export default async function PokemonPage({ searchParams }: Props) {
  const { page, q, filter: filterParam } = await searchParams;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * LIMIT;
  const filter = (filterParam ?? "all") as FilterType;

  const customPokemons = await getCustomPokemons();
  const queryClient = new QueryClient();
  let totalPages = 1;

  if (filter !== "custom") {
    await queryClient.prefetchQuery({
      queryKey: ["pokemon-list", LIMIT, offset],
      queryFn: () => getPokemonList(LIMIT, offset),
    });
    const data = queryClient.getQueryData<{ count: number }>([
      "pokemon-list",
      LIMIT,
      offset,
    ]);
    const isSearching = q && q.length >= 3;
    totalPages = isSearching ? 1 : data ? Math.ceil(data.count / LIMIT) : 1;
  } else {
    totalPages = Math.max(Math.ceil(customPokemons.length / LIMIT), 1);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white/90">
              Pokémon Library
            </h1>
          </div>
          <div className="sm:w-102 flex items-center gap-3">
            <PokemonSearch />

            <AddPokemonButton />
          </div>
        </div>

        <Suspense>
          <PokemonFilter />
        </Suspense>

        <PokemonGrid
          limit={LIMIT}
          offset={offset}
          initialCustom={customPokemons}
          search={q}
          filter={filter}
        />

        <div className="flex justify-center mt-4">
          <Suspense>
            <PokemonPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </Suspense>
        </div>
      </main>
    </HydrationBoundary>
  );
}
