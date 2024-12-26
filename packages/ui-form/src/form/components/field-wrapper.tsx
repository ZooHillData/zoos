import { Label } from "@zoos/ui-shad";
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
  const { fieldConfig, context, values, containerProps, children } = props;

  const LabelComponent =
    fieldConfig.label?.({ values, context }) || DefaultLabel;

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
