import * as yup from "yup";

export const addBerrySchema = yup.object({
  name: yup
    .string()
    .required("Nama tidak boleh kosong")
    .min(2, "Minimal 2 karakter")
    .lowercase(),
  natural_gift_type: yup.string().required("Tipe wajib dipilih"),
  flavors: yup
    .array(yup.string().required())
    .min(1, "Pilih minimal 1 rasa")
    .required(),
  smoothness: yup
    .number()
    .typeError("Harus angka")
    .min(1, "Min 1")
    .max(255, "Max 255")
    .required("Wajib diisi")
    .default(50),
  firmness: yup.string().required("Firmness wajib dipilih"),
});

export type AddBerryFormValues = yup.InferType<typeof addBerrySchema>;
