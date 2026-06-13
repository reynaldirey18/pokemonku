import { dehydrate, HydrationBoundary, QueryClient } from "@tanstack/react-query";
import { getBerryDetail } from "@/modules/berries/services/berry.server";
import BerryDetailClient from "@/modules/berries/components/BerryDetailClient";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function BerryDetailPage({ params }: Props) {
  const { name } = await params;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ["berry-detail", name],
    queryFn: () => getBerryDetail(name),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-4xl mx-auto px-4 py-8">
        <BerryDetailClient name={name} />
      </main>
    </HydrationBoundary>
  );
}
