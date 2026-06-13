export type BerryListItem = {
  name: string;
  url: string;
};

export type BerryListResponse = {
  count: number;
  next: string | null;
  previous: string | null;
  results: BerryListItem[];
};

export type BerryFlavor = {
  potency: number;
  flavor: { name: string };
};

export type BerryDetail = {
  id: number;
  name: string;
  growth_time: number;
  max_harvest: number;
  natural_gift_power: number;
  size: number;
  smoothness: number;
  soil_dryness: number;
  firmness: { name: string };
  flavors: BerryFlavor[];
  natural_gift_type: { name: string };
};

export type CustomBerry = {
  id: string;
  name: string;
  natural_gift_type: string;
  flavors: string[];
  smoothness: number;
  firmness: string;
  isCustom: true;
};
