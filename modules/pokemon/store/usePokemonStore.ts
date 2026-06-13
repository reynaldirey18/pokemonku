import { create } from "zustand";
import type { CustomPokemon } from "../types";

type PokemonStore = {
  newPokemons: CustomPokemon[];
  addPokemon: (pokemon: CustomPokemon) => void;
};

export const usePokemonStore = create<PokemonStore>((set) => ({
  newPokemons: [],
  addPokemon: (pokemon) =>
    set((state) => ({ newPokemons: [...state.newPokemons, pokemon] })),
}));
