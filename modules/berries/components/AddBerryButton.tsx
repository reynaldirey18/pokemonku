"use client";

import { useState } from "react";
import { Plus } from "lucide-react";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import AddBerryForm from "./AddBerryForm";

export default function AddBerryButton() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button size="sm" onClick={() => setIsOpen(true)}>
        <Plus size={14} />
        Add Custom Berry
      </Button>

      <Modal
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
        title="Add Custom Berry"
      >
        <AddBerryForm onSuccess={() => setIsOpen(false)} />
      </Modal>
    </>
  );
}
