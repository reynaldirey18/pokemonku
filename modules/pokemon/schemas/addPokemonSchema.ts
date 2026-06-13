import * as yup from "yup";

const statField = yup
  .number()
  .typeError("Harus angka")
  .min(1, "Min 1")
  .max(255, "Max 255")
  .required("Wajib diisi")
  .default(50);

export const addPokemonSchema = yup.object({
  name: yup
    .string()
    .required("Nama tidak boleh kosong")
    .min(2, "Minimal 2 karakter")
    .lowercase(),
  types: yup
    .array(yup.string().required())
    .min(1, "Pilih minimal 1 tipe")
    .max(2, "Maksimal 2 tipe")
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
