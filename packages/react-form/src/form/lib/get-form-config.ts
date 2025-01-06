import type { FormConfig } from "../types";

/** Params accepted by the curried function */
type CurriedParams<Form extends object, Context> = Omit<
  FormConfig<Form, Context>,
  "defaultValues" | "context"
>;

/** Helper function for type inference on the form config */
const getFormConfig = <Form extends object, Context>(props: {
  defaultValues: Form;
  context: Context;
}) => {
  const { context, defaultValues } = props;

  return ({ formOptions, ...curriedParams }: CurriedParams<Form, Context>) => {
    return {
      context,
      defaultValues,
      formOptions: { defaultValues, ...formOptions },
      ...curriedParams,
    };
  };
};

export { getFormConfig };
