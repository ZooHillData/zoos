import { Label } from "@zoos/shadcn";
import { type FormConfig, type FieldConfig } from "../types";

const DefaultLabel = (props: { name: string }) => <Label>{props.name}</Label>;

/**
 * FieldWrapper component provides a mechanism
 * to evaluate all field config properties
 */
const FieldWrapper = <Form extends object, Context>(props: {
  fieldConfig: FieldConfig<Form, Context>;
  formConfig: FormConfig<Form, Context>;
  context: Context;
  values: Form;
  containerProps?: Omit<React.ComponentProps<"div">, "children">;
  children: React.ReactNode;
}) => {
  const { fieldConfig, formConfig, context, values, containerProps, children } =
    props;

  const LabelComponent =
    formConfig.layout?.labelComponent?.({ fieldConfig, values, context }) ||
    DefaultLabel;

  if (fieldConfig.hidden?.({ values, context })) {
    return null;
  }
  return (
    <div {...containerProps}>
      <LabelComponent name={fieldConfig.name} />
      {children}
    </div>
  );
};

export { FieldWrapper };
