export type PokemonListItem = {
  name: string;
  url: string;
};

export type PokemonListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: PokemonListItem[];
};

export type PokemonType = {
  slot: number;
  type: { name: string };
};

export type PokemonAbility = {
  ability: { name: string };
  is_hidden: boolean;
  slot: number;
};

export type PokemonStat = {
  base_stat: number;
  stat: { name: string };
};

export type PokemonSprites = {
  front_default: string | null;
  other: {
    "official-artwork": {
      front_default: string | null;
    };
  };
};

export type PokemonDetail = {
  id: number;
  name: string;
  height: number;
  weight: number;
  types: PokemonType[];
  abilities: PokemonAbility[];
  stats: PokemonStat[];
  sprites: PokemonSprites;
};

export type CustomPokemon = {
  id: string;
  name: string;
  types: string[];
  abilities: string[];
  stats: PokemonStat[];
  isCustom: true;
};
