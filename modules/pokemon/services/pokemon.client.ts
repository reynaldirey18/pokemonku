import api from "@/lib/api";
import type { PokemonListResponse, PokemonDetail } from "../types";

export const getPokemonListClient = (limit: number, offset: number) =>
  api.get<PokemonListResponse>("/pokemon", { params: { limit, offset } }).then((r) => r.data);

export const getPokemonDetailClient = (name: string) =>
  api.get<PokemonDetail>(`/pokemon/${name}`).then((r) => r.data);
