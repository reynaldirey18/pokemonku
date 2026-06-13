import { describe, it, expect } from "vitest";
import { mapBerryListItemToDetail } from "./index";

describe("mapBerryListItemToDetail", () => {
  const item = {
    name: "oran",
    url: "https://pokeapi.co/api/v2/berry/2/",
  };

  it("extracts id from url", () => {
    const result = mapBerryListItemToDetail(item);
    expect(result.id).toBe(2);
  });

  it("keeps name as-is", () => {
    const result = mapBerryListItemToDetail(item);
    expect(result.name).toBe("oran");
  });

  it("handles url with trailing slash", () => {
    const result = mapBerryListItemToDetail({
      name: "sitrus",
      url: "https://pokeapi.co/api/v2/berry/10/",
    });
    expect(result.id).toBe(10);
  });

  it("returns only id and name", () => {
    const result = mapBerryListItemToDetail(item);
    expect(Object.keys(result)).toEqual(["id", "name"]);
  });
});
