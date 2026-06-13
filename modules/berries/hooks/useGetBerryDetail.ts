import { useQuery } from "@tanstack/react-query";
import { getBerryDetailClient } from "../services/berry.client";

export const useGetBerryDetail = (
  name: string,
  { enabled = true }: { enabled?: boolean } = {}
) =>
  useQuery({
    queryKey: ["berry-detail", name],
    queryFn: () => getBerryDetailClient(name),
    enabled: !!name && enabled,
  });
