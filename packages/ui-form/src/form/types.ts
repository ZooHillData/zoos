import { FieldComponent, type DeepKeys } from "@tanstack/react-form";

type FieldName<Form> = DeepKeys<Form>;
/** The render component which is the child of <form.Field /> */
type FieldRenderComponent<Form> = React.ComponentProps<
  FieldComponent<Form>
>["children"];

type FormConfig<Form extends object, Context = void> = {
  initialValues: Form;
  initialContext: Context;
  fields: FieldConfig<Form, Context>[];
};

type FieldType =
  | "string"
  | "string-long"
  | "select-single"
  | "select-multi"
  | "boolean";

type FieldAccessor<Form, Context, Value = unknown> = (data: {
  values: Form;
  context: Context;
}) => Value;

type FieldConfig<Form, Context, Value = unknown> = {
  name: FieldName<Form>;
  type: FieldType;
} & Partial<{
  disabled: (data: { values: Form; context: Context }) => boolean;
  required: (data: { values: Form; context: Context }) => boolean;
  hidden: (data: { values: Form; context: Context }) => boolean;
  onChange: (data: {
    values: Form;
    value: Value;
    newValue: Value;
    oldValue: Value;
  }) => void;
  display: (data: {
    values: Form;
    context: Context;
  }) => React.ReactNode | Value;
  field: (data: { values: Form; context: Context }) => React.ReactNode;
  accessor?: FieldAccessor<Form, Context, Value>;
  options?: (data: { values: Form; context: Context }) => string[];
  // `subscribe` - Field will re-render when these fields change
  subscribe?: FieldName<Form>[];
  label?: (data: {
    values: Form;
    context: Context;
  }) => (props: { name: FieldName<Form> }) => React.ReactNode;
  containerProps?: (data: {
    values: Form;
    context: Context;
  }) => React.ComponentProps<"div">;
}>;

export type {
  FormConfig,
  FieldConfig,
  FieldType,
  FieldAccessor,
  FieldName,
  FieldRenderComponent,
};
