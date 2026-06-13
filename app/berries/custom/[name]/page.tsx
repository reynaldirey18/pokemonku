import { getCustomBerries } from "@/modules/berries/actions/addCustomBerry";
import BerryDetailClient from "@/modules/berries/components/BerryDetailClient";
import EmptyState from "@/components/ui/EmptyState";

type Props = {
  params: Promise<{ name: string }>;
};

export default async function CustomBerryDetailPage({ params }: Props) {
  const { name } = await params;

  const customBerries = await getCustomBerries();
  const customBerry = customBerries.find((b) => b.id === name);

  if (!customBerry) {
    return (
      <main className="max-w-4xl mx-auto px-4 py-8">
        <EmptyState message="Custom berry tidak ditemukan." />
      </main>
    );
  }

  return (
    <main className="max-w-4xl mx-auto px-4 py-8">
      <BerryDetailClient name={name} customBerry={customBerry} />
    </main>
  );
}
