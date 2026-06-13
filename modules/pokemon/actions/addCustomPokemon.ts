"use server";

import fs from "fs";
import path from "path";
import { revalidatePath } from "next/cache";
import type { CustomPokemon } from "../types";

const filePath = path.join(process.cwd(), "data", "custom-pokemon.json");

export async function addCustomPokemon(data: Omit<CustomPokemon, "id" | "isCustom">) {
  const raw = fs.readFileSync(filePath, "utf-8");
  const list: CustomPokemon[] = JSON.parse(raw);

  const newPokemon: CustomPokemon = {
    ...data,
    id: Date.now().toString(),
    isCustom: true,
  };

  list.push(newPokemon);
  fs.writeFileSync(filePath, JSON.stringify(list, null, 2));
  revalidatePath("/pokemon");

  return newPokemon;
}

export async function getCustomPokemons(): Promise<CustomPokemon[]> {
  const raw = fs.readFileSync(filePath, "utf-8");
  return JSON.parse(raw);
}

export async function deleteCustomPokemon(id: string): Promise<void> {
  const raw = fs.readFileSync(filePath, "utf-8");
  const list: CustomPokemon[] = JSON.parse(raw);
  const updated = list.filter((p) => p.id !== id);
  fs.writeFileSync(filePath, JSON.stringify(updated, null, 2));
  revalidatePath("/pokemon");
}
