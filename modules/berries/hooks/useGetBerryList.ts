import { useQuery } from "@tanstack/react-query";
import { getBerryListClient } from "../services/berry.client";
import { mapBerryListItemToDetail } from "../mappers";

export const useGetBerryList = ({
  limit,
  offset,
  enabled = true,
}: {
  limit: number;
  offset: number;
  enabled?: boolean;
}) =>
  useQuery({
    queryKey: ["berries-list", limit, offset],
    queryFn: () => getBerryListClient(limit, offset),
    enabled,
    select: (data) => ({
      count: data.count,
      results: data.results.map(mapBerryListItemToDetail),
    }),
  });
