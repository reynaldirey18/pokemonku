import type { PokemonListResponse, PokemonDetail } from "../types";

const BASE = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;

export async function getPokemonList(limit: number, offset: number): Promise<PokemonListResponse> {
  const res = await fetch(`${BASE}/pokemon?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export async function getPokemonDetail(name: string): Promise<PokemonDetail> {
  const res = await fetch(`${BASE}/pokemon/${name}`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}
