import type {
  FormOptions,
  FieldComponent,
  DeepKeys,
  ReactFormExtendedApi,
} from "@tanstack/react-form";

import { type Layout } from "./layout-config";

/** The possible field names given the Form Data passed */
type FieldName<Form> = DeepKeys<Form>;

type FormConfig<Form extends object, Context = void> = {
  layout?: Layout<Form, Context>;
  context: Context;
  formOptions: FormOptions<Form>;
  fields: FieldConfig<Form, Context>[];
};

/** FieldType is central to   */
type FieldType =
  // strings
  | "string"
  | "string.long"
  | "string.password"
  | "string.otp"
  | "boolean"
  // arrays
  | "array-string.single"
  | "array-string.multiple";

/**
 * FieldProps, configured in FieldConfig, passed to the
 * `<form.Field>.
 *
 * Can be used for custom field validation
 * */
type FieldProps<Form> = Partial<
  React.ComponentProps<ReactFormExtendedApi<Form>["Field"]>
>;

/** The render component which is the child of <form.Field /> */
// ! Is this needed / is there a better way to render the "subscribed-input"?
type FieldRenderComponent<Form> = React.ComponentProps<
  FieldComponent<Form>
>["children"];

/**
 * Main field configuration
 * - disabled, hidden, required, status
 * - Field Attribute callbacks
 */
type FieldConfig<Form, Context, Value = unknown> = {
  name: FieldName<Form>;
  type: FieldType;
} & Partial<{
  fieldProps: FieldProps<Form>;
  hidden: (data: { values: Form; context: Context }) => boolean;
  options?: (data: { values: Form; context: Context }) => string[];
  containerProps?: (data: {
    values: Form;
    context: Context;
  }) => React.ComponentProps<"div">;
  // ! Not implemented
  // ! ----------------
  _disabled: (data: { values: Form; context: Context }) => boolean;
  _required: (data: { values: Form; context: Context }) => boolean;
  _onChange: (data: {
    values: Form;
    value: Value;
    newValue: Value;
    oldValue: Value;
  }) => void;
  _display: (data: {
    values: Form;
    context: Context;
  }) => React.ReactNode | Value;
  _field: (data: { values: Form; context: Context }) => React.ReactNode;
  _label?: (data: {
    values: Form;
    context: Context;
  }) => (props: { name: FieldName<Form> }) => React.ReactNode;
  // ! ----------------
}>;

export type {
  FormConfig,
  FieldConfig,
  FieldType,
  FieldName,
  FieldRenderComponent,
  FieldProps,
};
