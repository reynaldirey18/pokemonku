import { describe, it, expect, vi, beforeEach } from "vitest";

const { mockReadFileSync, mockWriteFileSync, mockRevalidatePath } = vi.hoisted(() => ({
  mockReadFileSync: vi.fn(),
  mockWriteFileSync: vi.fn(),
  mockRevalidatePath: vi.fn(),
}));

vi.mock("fs", () => ({
  default: { readFileSync: mockReadFileSync, writeFileSync: mockWriteFileSync },
  readFileSync: mockReadFileSync,
  writeFileSync: mockWriteFileSync,
}));

vi.mock("next/cache", () => ({ revalidatePath: mockRevalidatePath }));

import { addCustomPokemon, deleteCustomPokemon, getCustomPokemons } from "./addCustomPokemon";
import type { CustomPokemon } from "../types";

const mockList: CustomPokemon[] = [
  {
    id: "111",
    name: "testmon",
    types: ["fire"],
    abilities: ["blaze"],
    stats: [{ stat: { name: "hp" }, base_stat: 45 }],
    isCustom: true,
  },
  {
    id: "222",
    name: "othermon",
    types: ["water"],
    abilities: ["torrent"],
    stats: [{ stat: { name: "hp" }, base_stat: 50 }],
    isCustom: true,
  },
];

beforeEach(() => {
  mockReadFileSync.mockReturnValue(JSON.stringify(mockList));
  mockWriteFileSync.mockReset();
  mockRevalidatePath.mockReset();
});

describe("deleteCustomPokemon", () => {
  it("removes the pokemon with the given id", async () => {
    await deleteCustomPokemon("111");

    const written = mockWriteFileSync.mock.calls[0][1] as string;
    const result: CustomPokemon[] = JSON.parse(written);

    expect(result).toHaveLength(1);
    expect(result[0].id).toBe("222");
  });

  it("does not modify the list when id does not exist", async () => {
    await deleteCustomPokemon("999");

    const written = mockWriteFileSync.mock.calls[0][1] as string;
    const result: CustomPokemon[] = JSON.parse(written);

    expect(result).toHaveLength(2);
  });

  it("calls revalidatePath for /pokemon", async () => {
    await deleteCustomPokemon("111");
    expect(mockRevalidatePath).toHaveBeenCalledWith("/pokemon");
  });
});

describe("addCustomPokemon", () => {
  it("appends a new pokemon and returns it", async () => {
    const input = {
      name: "newmon",
      types: ["grass"],
      abilities: ["overgrow"],
      stats: [{ stat: { name: "hp" }, base_stat: 60 }],
    };

    const result = await addCustomPokemon(input);

    expect(result.name).toBe("newmon");
    expect(result.isCustom).toBe(true);
    expect(result.id).toBeDefined();
  });
});

describe("getCustomPokemons", () => {
  it("returns the parsed list", async () => {
    const result = await getCustomPokemons();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("testmon");
  });
});
