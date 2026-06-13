import { useQuery } from "@tanstack/react-query";
import { getPokemonDetailClient } from "../services/pokemon.client";

export const useGetPokemonDetail = (
  name: string,
  { enabled = true }: { enabled?: boolean } = {}
) =>
  useQuery({
    queryKey: ["pokemon-detail", name],
    queryFn: () => getPokemonDetailClient(name),
    enabled: !!name && enabled,
  });
