import api from "@/lib/api";
import type { BerryListResponse, BerryDetail } from "../types";

export const getBerryListClient = (limit: number, offset: number) =>
  api.get<BerryListResponse>(`/berry?limit=${limit}&offset=${offset}`).then((r) => r.data);

export const getBerryDetailClient = (name: string) =>
  api.get<BerryDetail>(`/berry/${name}`).then((r) => r.data);
