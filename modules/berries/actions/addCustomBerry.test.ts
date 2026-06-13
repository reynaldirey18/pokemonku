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

import { addCustomBerry, getCustomBerries } from "./addCustomBerry";
import type { CustomBerry } from "../types";

const mockList: CustomBerry[] = [
  {
    id: "111",
    name: "oran",
    natural_gift_type: "water",
    flavors: ["sweet"],
    smoothness: 40,
    firmness: "soft",
    isCustom: true,
  },
  {
    id: "222",
    name: "sitrus",
    natural_gift_type: "psychic",
    flavors: ["sweet", "bitter"],
    smoothness: 60,
    firmness: "hard",
    isCustom: true,
  },
];

beforeEach(() => {
  mockReadFileSync.mockReturnValue(JSON.stringify(mockList));
  mockWriteFileSync.mockReset();
  mockRevalidatePath.mockReset();
});

describe("addCustomBerry", () => {
  it("appends a new berry and returns it", async () => {
    const input = {
      name: "pecha",
      natural_gift_type: "fire",
      flavors: ["sweet"],
      smoothness: 25,
      firmness: "very-soft",
    };

    const result = await addCustomBerry(input);

    expect(result.name).toBe("pecha");
    expect(result.isCustom).toBe(true);
    expect(result.id).toBeDefined();
  });

  it("writes updated list to file", async () => {
    await addCustomBerry({
      name: "pecha",
      natural_gift_type: "fire",
      flavors: ["sweet"],
      smoothness: 25,
      firmness: "very-soft",
    });

    const written = mockWriteFileSync.mock.calls[0][1] as string;
    const result: CustomBerry[] = JSON.parse(written);

    expect(result).toHaveLength(3);
    expect(result[2].name).toBe("pecha");
  });

  it("calls revalidatePath for /berries", async () => {
    await addCustomBerry({
      name: "pecha",
      natural_gift_type: "fire",
      flavors: ["sweet"],
      smoothness: 25,
      firmness: "very-soft",
    });

    expect(mockRevalidatePath).toHaveBeenCalledWith("/berries");
  });
});

describe("getCustomBerries", () => {
  it("returns the parsed list", async () => {
    const result = await getCustomBerries();
    expect(result).toHaveLength(2);
    expect(result[0].name).toBe("oran");
  });

  it("returns berries with correct shape", async () => {
    const result = await getCustomBerries();
    expect(result[0]).toMatchObject({
      isCustom: true,
      natural_gift_type: "water",
      flavors: ["sweet"],
    });
  });
});
