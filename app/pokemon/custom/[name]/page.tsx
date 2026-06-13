import { getCustomPokemons } from "@/modules/pokemon/actions/addCustomPokemon";
import PokemonDetailClient from "@/modules/pokemon/components/PokemonDetailClient";
import EmptyState from "@/components/ui/EmptyState";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function CustomPokemonDetailPage({ params }: Props) {
  const { name } = await params;

  const customPokemons = await getCustomPokemons();
  const customPokemon = customPokemons.find((p) => p.id === name);

  if (!customPokemon) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <EmptyState message="Custom Pokémon not found." />
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <PokemonDetailClient name={name} customPokemon={customPokemon} />
    </main>
  );
}
