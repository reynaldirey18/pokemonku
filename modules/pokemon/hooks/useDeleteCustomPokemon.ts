"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCustomPokemon } from "../actions/addCustomPokemon";

export function useDeleteCustomPokemon() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deletePokemon(id: string) {
    setIsDeleting(true);
    await deleteCustomPokemon(id);
    router.push("/pokemon");
  }

  return { deletePokemon, isDeleting };
}
