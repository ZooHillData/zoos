import { type FormOptions } from "@tanstack/react-form";
import type { FieldConfig, FormConfig } from "../types";

type FormOptionsEnh<Form> = Omit<FormOptions<Form>, "defaultValues"> & {
  defaultValues: Form;
};

/** Helper function for type inference on the form config */
const getFormConfig = <Form extends object, Context>(props: {
  context: Context;
  defaultValues: Form;
  // formOptions: FormOptionsEnh<Form>;
  // fields: FieldConfig<Form, Context>[];
}) => {
  const { context, defaultValues } = props;

  return (props: {
    formOptions: FormOptions<Form>;
    fields: FieldConfig<Form, Context>[];
  }) => {
    const { formOptions, fields } = props;

    return { context, defaultValues, formOptions, fields };
  };
};

export { getFormConfig };
