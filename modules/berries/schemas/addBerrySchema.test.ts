import { describe, it, expect } from "vitest";
import { addBerrySchema } from "./addBerrySchema";

const validData = {
  name: "oran",
  natural_gift_type: "water",
  flavors: ["sweet"],
  smoothness: 50,
  firmness: "soft",
};

describe("addBerrySchema", () => {
  it("accepts valid berry data", async () => {
    await expect(addBerrySchema.validate(validData)).resolves.toBeDefined();
  });

  it("rejects name shorter than 2 chars", async () => {
    await expect(
      addBerrySchema.validate({ ...validData, name: "a" })
    ).rejects.toThrow("Minimum 2 characters");
  });

  it("rejects empty name", async () => {
    await expect(
      addBerrySchema.validate({ ...validData, name: "" })
    ).rejects.toThrow();
  });

  it("lowercases name automatically", async () => {
    const result = await addBerrySchema.validate({ ...validData, name: "Oran" });
    expect(result.name).toBe("oran");
  });

  it("rejects empty natural_gift_type", async () => {
    await expect(
      addBerrySchema.validate({ ...validData, natural_gift_type: "" })
    ).rejects.toThrow("Type is required");
  });

  it("rejects empty flavors array", async () => {
    await expect(
      addBerrySchema.validate({ ...validData, flavors: [] })
    ).rejects.toThrow("Select at least 1 flavor");
  });

  it("accepts multiple flavors", async () => {
    await expect(
      addBerrySchema.validate({ ...validData, flavors: ["sweet", "bitter"] })
    ).resolves.toBeDefined();
  });

  it("rejects smoothness above 255", async () => {
    await expect(
      addBerrySchema.validate({ ...validData, smoothness: 256 })
    ).rejects.toThrow("Max 255");
  });

  it("rejects smoothness below 1", async () => {
    await expect(
      addBerrySchema.validate({ ...validData, smoothness: 0 })
    ).rejects.toThrow("Min 1");
  });

  it("rejects non-number smoothness", async () => {
    await expect(
      addBerrySchema.validate({ ...validData, smoothness: "abc" })
    ).rejects.toThrow("Must be a number");
  });

  it("rejects empty firmness", async () => {
    await expect(
      addBerrySchema.validate({ ...validData, firmness: "" })
    ).rejects.toThrow("Firmness is required");
  });
});