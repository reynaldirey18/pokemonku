"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { deleteCustomBerry } from "../actions/addCustomBerry";

export function useDeleteCustomBerry() {
  const router = useRouter();
  const [isDeleting, setIsDeleting] = useState(false);

  async function deleteBerry(id: string) {
    setIsDeleting(true);
    await deleteCustomBerry(id);
    router.push("/berries");
  }

  return { deleteBerry, isDeleting };
}
