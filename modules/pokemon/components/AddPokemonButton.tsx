"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import AddPokemonForm from "./AddPokemonForm";

export default function AddPokemonButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        <Plus size={14} />
        Add Custom Pokémon
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Custom Pokémon"
      >
        <AddPokemonForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
