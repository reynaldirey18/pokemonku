import type { BerryListResponse, BerryDetail } from "../types";

const BASE = process.env.NEXT_PUBLIC_POKEAPI_BASE_URL;

export async function getBerryList(limit: number, offset: number): Promise<BerryListResponse> {
  const res = await fetch(`${BASE}/berry?limit=${limit}&offset=${offset}`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}

export async function getBerryDetail(name: string): Promise<BerryDetail> {
  const res = await fetch(`${BASE}/berry/${name}`, {
    next: { revalidate: 3600 },
  });
  return res.json();
}
