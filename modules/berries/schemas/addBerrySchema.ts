import * as yup from "yup";

export const addBerrySchema = yup.object({
  name: yup
    .string()
    .required("Name is required")
    .min(2, "Minimum 2 characters")
    .lowercase(),
  natural_gift_type: yup.string().required("Type is required"),
  flavors: yup
    .array(yup.string().required())
    .min(1, "Select at least 1 flavor")
    .required(),
  smoothness: yup
    .number()
    .typeError("Must be a number")
    .min(1, "Min 1")
    .max(255, "Max 255")
    .required("Required")
    .default(50),
  firmness: yup.string().required("Firmness is required"),
});

export type AddBerryFormValues = yup.InferType<typeof addBerrySchema>;
