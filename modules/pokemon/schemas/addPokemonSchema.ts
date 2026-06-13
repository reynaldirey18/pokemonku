import * as yup from "yup";

const statField = yup
  .number()
  .typeError("Must be a number")
  .min(1, "Min 1")
  .max(255, "Max 255")
  .required("Required")
  .default(50);

export const addPokemonSchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Minimum 2 characters")
    .lowercase(),
  types: yup
    .array(yup.string().required())
    .min(1, "Select at least 1 type")
    .max(2, "Maximum 2 types")
    .required(),
  abilities: yup.string().default(""),
  stats: yup
    .object({
      hp: statField,
      attack: statField,
      defense: statField,
      special_attack: statField,
      special_defense: statField,
      speed: statField,
    })
    .required(),
});

export type AddPokemonFormValues = yup.InferType<typeof addPokemonSchema>;
