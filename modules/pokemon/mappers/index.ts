import type { PokemonDetail, PokemonListItem } from "../types";

export function mapListItemToDetail(item: PokemonListItem): PokemonDetail {
  const id = item.url.split("/").filter(Boolean).pop();
  return {
    id: Number(id),
    name: item.name,
    height: 0,
    weight: 0,
    types: [],
    abilities: [],
    stats: [],
    sprites: {
      front_default: null,
      other: {
        "official-artwork": {
          front_default: `https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/official-artwork/${id}.png`,
        },
      },
    },
  };
}
