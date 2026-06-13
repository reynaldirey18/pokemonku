import { describe, it, expect } from "vitest";
import { mapListItemToDetail } from "./index";

describe("mapListItemToDetail", () => {
  const item = {
    name: "bulbasaur",
    url: "https://pokeapi.co/api/v2/pokemon/1/",
  };

  it("extracts id from url", () => {
    const result = mapListItemToDetail(item);
    expect(result.id).toBe(1);
  });

  it("keeps name as-is", () => {
    const result = mapListItemToDetail(item);
    expect(result.name).toBe("bulbasaur");
  });

  it("builds sprite url with correct id", () => {
    const result = mapListItemToDetail(item);
    expect(result.sprites.other["official-artwork"].front_default).toContain("/1.png");
  });

  it("defaults height and weight to 0 — list api does not return these", () => {
    const result = mapListItemToDetail(item);
    expect(result.height).toBe(0);
    expect(result.weight).toBe(0);
  });

  it("returns empty arrays for types, abilities, stats", () => {
    const result = mapListItemToDetail(item);
    expect(result.types).toEqual([]);
    expect(result.abilities).toEqual([]);
    expect(result.stats).toEqual([]);
  });

  it("handles url with trailing slash", () => {
    const result = mapListItemToDetail({
      name: "pikachu",
      url: "https://pokeapi.co/api/v2/pokemon/25/",
    });
    expect(result.id).toBe(25);
  });
});
