import { useGetBerryList } from "./useGetBerryList";
import type { CustomBerry } from "../types";
import type { FilterType } from "../components/BerryFilter";

type Params = {
  limit: number;
  offset: number;
  initialCustom: CustomBerry[];
  search?: string;
  filter: FilterType;
};

export function useFilteredBerries({
  limit,
  offset,
  initialCustom,
  search,
  filter,
}: Params) {
  const isCustomOnly = filter === "custom";

  const { data, isLoading, isError } = useGetBerryList({
    limit,
    offset,
    enabled: !isCustomOnly,
  });

  const query = search?.toLowerCase() ?? "";

  const filteredCustom = query
    ? initialCustom.filter((b) => b.name.includes(query))
    : initialCustom;

  const customItems = isCustomOnly
    ? filteredCustom.slice(offset, offset + limit)
    : filter === "all" && offset === 0
    ? filteredCustom
    : [];

  const filteredApi = query
    ? (data?.results ?? []).filter((b) => b.name.includes(query))
    : (data?.results ?? []);

  const apiItems = !isCustomOnly ? filteredApi : [];

  return { customItems, apiItems, isLoading, isError };
}
