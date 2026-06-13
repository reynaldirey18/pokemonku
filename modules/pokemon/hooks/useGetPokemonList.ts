import { useQuery } from "@tanstack/react-query";
import { getPokemonListClient } from "../services/pokemon.client";
import { mapListItemToDetail } from "../mappers";

export const useGetPokemonList = ({
  limit,
  offset,
  enabled = true,
}: {
  limit: number;
  offset: number;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["pokemon-list", limit, offset],
    queryFn: () => getPokemonListClient(limit, offset),
    enabled,
    select: (data) => ({
      count: data.count,
      results: data.results.map(mapListItemToDetail),
    }),
  });
