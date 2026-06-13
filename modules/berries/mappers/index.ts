import type { BerryDetail, BerryListItem } from "../types";

export function mapBerryListItemToDetail(item: BerryListItem): Pick<BerryDetail, "id" | "name"> {
  const id = item.url.split("/").filter(Boolean).pop();
  return {
    id: Number(id),
    name: item.name,
  };
}
