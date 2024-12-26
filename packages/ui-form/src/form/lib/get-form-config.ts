import type { FieldConfig, FormConfig } from "../types";

/** Helper function for type inference on the form config */
const getFormConfig = <Form extends object, Context>(props: {
  initialValues: Form;
  initialContext: Context;
  fields: FieldConfig<Form, Context>[];
}): FormConfig<Form, Context> => {
  return props;
};

export { getFormConfig };
