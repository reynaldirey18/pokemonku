"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { addCustomBerry } from "../actions/addCustomBerry";
import { addBerrySchema, type AddBerryFormValues } from "../schemas/addBerrySchema";
import {
  BERRY_NATURAL_GIFT_TYPES,
  BERRY_FIRMNESS_OPTIONS,
  BERRY_FLAVOR_OPTIONS,
} from "../data/dummy";

type Props = {
  onSuccess?: () => void;
};

export default function AddBerryForm({ onSuccess }: Props) {
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddBerryFormValues>({
    resolver: yupResolver(addBerrySchema),
    defaultValues: {
      name: "",
      natural_gift_type: "",
      flavors: [],
      smoothness: 50,
      firmness: "",
    },
  });

  const onSubmit = async (values: AddBerryFormValues) => {
    setServerError("");
    try {
      await addCustomBerry({
        name: values.name,
        natural_gift_type: values.natural_gift_type,
        flavors: values.flavors,
        smoothness: values.smoothness,
        firmness: values.firmness,
      });
      onSuccess?.();
    } catch {
      setServerError("Gagal menambahkan Berry");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            label="Nama"
            placeholder="contoh: oran"
            error={errors.name?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="natural_gift_type"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-white/80">Natural Gift Type</p>
            <div className="flex flex-wrap gap-2">
              {BERRY_NATURAL_GIFT_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => field.onChange(type)}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                    field.value === type
                      ? "bg-white/30 text-white ring-1 ring-white/50"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.natural_gift_type && (
              <p className="text-xs text-red-400">{errors.natural_gift_type.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="flavors"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-white/80">Flavors</p>
            <div className="flex flex-wrap gap-2">
              {BERRY_FLAVOR_OPTIONS.map((flavor) => (
                <button
                  key={flavor}
                  type="button"
                  onClick={() => {
                    const current = field.value ?? [];
                    if (current.includes(flavor)) {
                      field.onChange(current.filter((f) => f !== flavor));
                    } else {
                      field.onChange([...current, flavor]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                    (field.value ?? []).includes(flavor)
                      ? "bg-white/30 text-white ring-1 ring-white/50"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {flavor}
                </button>
              ))}
            </div>
            {errors.flavors && (
              <p className="text-xs text-red-400">{errors.flavors.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="smoothness"
        control={control}
        render={({ field }) => (
          <Input
            label="Smoothness (1–255)"
            type="number"
            min={1}
            max={255}
            error={errors.smoothness?.message}
            {...field}
            onChange={(e) => field.onChange(e.target.valueAsNumber)}
          />
        )}
      />

      <Controller
        name="firmness"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-white/80">Firmness</p>
            <div className="flex flex-wrap gap-2">
              {BERRY_FIRMNESS_OPTIONS.map((option) => (
                <button
                  key={option}
                  type="button"
                  onClick={() => field.onChange(option)}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                    field.value === option
                      ? "bg-white/30 text-white ring-1 ring-white/50"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {option}
                </button>
              ))}
            </div>
            {errors.firmness && (
              <p className="text-xs text-red-400">{errors.firmness.message}</p>
            )}
          </div>
        )}
      />

      {serverError && <p className="text-xs text-red-400">{serverError}</p>}

      <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
        Tambah Berry
      </Button>
    </form>
  );
}
