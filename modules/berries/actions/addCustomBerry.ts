"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import type { CustomBerry } from "../types";

const filePath = path.join(process.cwd(), "data", "custom-berries.json");

export async function addCustomBerry(
  data: Omit<CustomBerry, "id" | "isCustom">,
) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const list: CustomBerry[] = JSON.parse(raw);

  const newBerry: CustomBerry = {
    ...data,
    id: Date.now().toString(),
    isCustom: true,
  };

  list.push(newBerry);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
  revalidatePath("/berries");

  return newBerry;
}

export async function getCustomBerries(): Promise<CustomBerry[]> {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function deleteCustomBerry(id: string): Promise<void> {
  const raw = fs.readFileSync(filePath, "utf-8");
  const list: CustomBerry[] = JSON.parse(raw);
  const filtered = list.filter((b) => b.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(filtered, null, 2));
  revalidatePath("/berries");
}
