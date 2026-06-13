import { Suspense } from "react";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import { getBerryList } from "@/modules/berries/services/berry.server";
import { getCustomBerries } from "@/modules/berries/actions/addCustomBerry";
import BerryGrid from "@/modules/berries/components/BerryGrid";
import BerrySearch from "@/modules/berries/components/BerrySearch";
import BerryPagination from "@/modules/berries/components/BerryPagination";
import BerryFilter from "@/modules/berries/types/BerryFilter";
import AddBerryButton from "@/modules/berries/components/AddBerryButton";
import type { FilterType } from "@/modules/berries/types/BerryFilter";

const LIMIT = 20;

type Props = {
  searchParams: Promise<{ page?: string; q?: string; filter?: string }>;
};

export default async function BerriesPage({ searchParams }: Props) {
  const { page, q, filter: filterParam } = await searchParams;
  const currentPage = Number(page) || 1;
  const offset = (currentPage - 1) * LIMIT;
  const filter = (filterParam ?? "all") as FilterType;

  const customBerries = await getCustomBerries();
  const queryClient = new QueryClient();
  let totalPages = 1;

  if (filter !== "custom") {
    await queryClient.prefetchQuery({
      queryKey: ["berries-list", LIMIT, offset],
      queryFn: () => getBerryList(LIMIT, offset),
    });
    const data = queryClient.getQueryData<{ count: number }>([
      "berries-list",
      LIMIT,
      offset,
    ]);
    const isSearching = q && q.length >= 3;
    totalPages = isSearching ? 1 : data ? Math.ceil(data.count / LIMIT) : 1;
  } else {
    totalPages = Math.max(Math.ceil(customBerries.length / LIMIT), 1);
  }

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="max-w-7xl mx-auto px-4 py-8 flex flex-col gap-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-white/90">
              Berry Library
            </h1>
          </div>
          <div className="sm:w-102 flex items-center gap-3">
            <Suspense>
              <BerrySearch />
            </Suspense>
            <AddBerryButton />
          </div>
        </div>

        <Suspense>
          <BerryFilter />
        </Suspense>

        <BerryGrid
          limit={LIMIT}
          offset={offset}
          initialCustom={customBerries}
          search={q}
          filter={filter}
        />

        <div className="flex justify-center mt-4">
          <Suspense>
            <BerryPagination
              currentPage={currentPage}
              totalPages={totalPages}
            />
          </Suspense>
        </div>
      </main>
    </HydrationBoundary>
  );
}
