import { type FormOptions } from "@tanstack/react-form";
import type { FieldConfig, FormConfig } from "../types";

/** Helper function for type inference on the form config */
const getFormConfig = <Form extends object, Context>(props: {
  context: Context;
  formOptions: FormOptions<Form>;
  fields: FieldConfig<Form, Context>[];
}): FormConfig<Form, Context> => {
  return props;
};

export { getFormConfig };
