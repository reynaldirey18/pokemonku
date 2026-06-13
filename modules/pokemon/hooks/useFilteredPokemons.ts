import { useGetPokemonList } from "./useGetPokemonList";
import type { CustomPokemon } from "../types";
import type { FilterType } from "../components/PokemonFilter";

type Params = {
  limit: number;
  offset: number;
  initialCustom: CustomPokemon[];
  search?: string;
  filter: FilterType;
};

export function useFilteredPokemons({
  limit,
  offset,
  initialCustom,
  search,
  filter,
}: Params) {
  const isCustomOnly = filter === "custom";

  const { data, isLoading, isError } = useGetPokemonList({
    limit,
    offset,
    enabled: !isCustomOnly,
  });

  const query = search?.toLowerCase() ?? "";

  const filteredCustom = query
    ? initialCustom.filter((p) => p.name.includes(query))
    : initialCustom;

  const customItems = isCustomOnly
    ? filteredCustom.slice(offset, offset + limit)
    : filter === "all" && offset === 0
    ? filteredCustom
    : [];

  const filteredApi = query
    ? (data?.results ?? []).filter((p) => p.name.includes(query))
    : (data?.results ?? []);

  const apiItems = !isCustomOnly ? filteredApi : [];

  return { customItems, apiItems, isLoading, isError };
}
