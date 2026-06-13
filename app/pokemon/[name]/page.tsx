import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getPokemonDetail } from "@/modules/pokemon/services/pokemon.server";
import PokemonDetailClient from "@/modules/pokemon/components/PokemonDetailClient";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function PokemonDetailPage({ params }: Props) {
  const { name } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["pokemon-detail", name],
    queryFn: () => getPokemonDetail(name),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <PokemonDetailClient name={name} />
      </main>
    </HydrationBoundary>
  );
}
