"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { addCustomPokemon } from "../actions/addCustomPokemon";
import {
  addPokemonSchema,
  type AddPokemonFormValues,
} from "../schemas/addPokemonSchema";
import { POKEMON_TYPES, STATS_CONFIG } from "../data/dummy";

type Props = {
  onSuccess?: () => void;
};

export default function AddPokemonForm({ onSuccess }: Props) {
  const [serverError, setServerError] = useState("");

  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<AddPokemonFormValues>({
    resolver: yupResolver(addPokemonSchema),
    defaultValues: {
      name: "",
      types: [],
      abilities: "",
      stats: {
        hp: 50,
        attack: 50,
        defense: 50,
        special_attack: 50,
        special_defense: 50,
        speed: 50,
      },
    },
  });

  const onSubmit = async (values: AddPokemonFormValues) => {
    setServerError("");
    try {
      await addCustomPokemon({
        name: values.name,
        types: values.types,
        abilities: values.abilities
          ? values.abilities
              .split(",")
              .map((a) => a.trim())
              .filter(Boolean)
          : [],
        stats: STATS_CONFIG.map(({ key, statName }) => ({
          stat: { name: statName },
          base_stat: values.stats[key],
        })),
      });
      onSuccess?.();
    } catch {
      setServerError("Failed to add Pokémon");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-4">
      <Controller
        name="name"
        control={control}
        render={({ field }) => (
          <Input
            label="Name"
            placeholder="e.g. flamewolf"
            error={errors.name?.message}
            {...field}
          />
        )}
      />

      <Controller
        name="types"
        control={control}
        render={({ field }) => (
          <div className="flex flex-col gap-1.5">
            <p className="text-sm font-medium text-white/80">Type (max. 2)</p>
            <div className="flex flex-wrap gap-2">
              {POKEMON_TYPES.map((type) => (
                <button
                  key={type}
                  type="button"
                  onClick={() => {
                    const current = field.value ?? [];
                    if (current.includes(type)) {
                      field.onChange(current.filter((t) => t !== type));
                    } else if (current.length < 2) {
                      field.onChange([...current, type]);
                    }
                  }}
                  className={`px-3 py-1 rounded-full text-xs font-medium capitalize transition-all ${
                    (field.value ?? []).includes(type)
                      ? "bg-white/30 text-white ring-1 ring-white/50"
                      : "bg-white/10 text-white/60 hover:bg-white/20"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
            {errors.types && (
              <p className="text-xs text-red-400">{errors.types.message}</p>
            )}
          </div>
        )}
      />

      <Controller
        name="abilities"
        control={control}
        render={({ field }) => (
          <Input
            label="Abilities"
            placeholder="e.g. blaze, intimidate"
            hint="Separate with commas"
            error={errors.abilities?.message}
            {...field}
          />
        )}
      />

      <div className="flex flex-col gap-1.5">
        <p className="text-sm font-medium text-white/80">Base Stats (1–255)</p>
        <div className="grid grid-cols-2 gap-3">
          {STATS_CONFIG.map(({ key, label }) => (
            <Controller
              key={key}
              name={`stats.${key}`}
              control={control}
              render={({ field }) => (
                <Input
                  label={label}
                  type="number"
                  min={1}
                  max={255}
                  error={errors.stats?.[key]?.message}
                  {...field}
                  onChange={(e) => field.onChange(e.target.valueAsNumber)}
                />
              )}
            />
          ))}
        </div>
      </div>

      {serverError && <p className="text-xs text-red-400">{serverError}</p>}

      <Button type="submit" isLoading={isSubmitting} className="w-full mt-2">
        Add Pokémon
      </Button>
    </form>
  );
}
