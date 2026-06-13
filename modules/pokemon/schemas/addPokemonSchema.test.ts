import { describe, it, expect } from "vitest";
import { addPokemonSchema } from "./addPokemonSchema";

const validData = {
  name: "flamewolf",
  types: ["fire"],
  abilities: "blaze",
  stats: {
    hp: 50,
    attack: 60,
    defense: 40,
    special_attack: 70,
    special_defense: 50,
    speed: 80,
  },
};

describe("addPokemonSchema", () => {
  it("accepts valid pokemon data", async () => {
    await expect(addPokemonSchema.validate(validData)).resolves.toBeDefined();
  });

  it("rejects name shorter than 2 chars", async () => {
    await expect(
      addPokemonSchema.validate({ ...validData, name: "a" })
    ).rejects.toThrow("Minimal 2 karakter");
  });

  it("rejects empty name", async () => {
    await expect(
      addPokemonSchema.validate({ ...validData, name: "" })
    ).rejects.toThrow();
  });

  it("rejects empty types array", async () => {
    await expect(
      addPokemonSchema.validate({ ...validData, types: [] })
    ).rejects.toThrow("Pilih minimal 1 tipe");
  });

  it("rejects more than 2 types", async () => {
    await expect(
      addPokemonSchema.validate({ ...validData, types: ["fire", "water", "grass"] })
    ).rejects.toThrow("Maksimal 2 tipe");
  });

  it("accepts exactly 2 types", async () => {
    await expect(
      addPokemonSchema.validate({ ...validData, types: ["fire", "water"] })
    ).resolves.toBeDefined();
  });

  it("rejects stat above 255", async () => {
    await expect(
      addPokemonSchema.validate({ ...validData, stats: { ...validData.stats, hp: 300 } })
    ).rejects.toThrow("Max 255");
  });

  it("rejects stat below 1", async () => {
    await expect(
      addPokemonSchema.validate({ ...validData, stats: { ...validData.stats, attack: 0 } })
    ).rejects.toThrow("Min 1");
  });

  it("lowercases name automatically", async () => {
    const result = await addPokemonSchema.validate({ ...validData, name: "FlameWolf" });
    expect(result.name).toBe("flamewolf");
  });

  it("abilities is optional", async () => {
    const { abilities: _, ...withoutAbilities } = validData;
    await expect(
      addPokemonSchema.validate(withoutAbilities)
    ).resolves.toBeDefined();
  });
});
