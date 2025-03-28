import { FieldComponent } from "@tanstack/react-form";
import { EyeIcon } from "lucide-react";

import { Input, Textarea } from "@zoos/shadcn";

import { getOptions } from "../../lib";
import {
  OTP,
  Select,
  CheckboxWithLabel,
  CheckboxGroup,
  InputPassword,
} from "../../components";
import type {
  FieldType,
  FieldName,
  FieldRenderComponent,
  FormConfig,
} from "../types";

/**
 * Helper function to get input components
 *
 * Default components are returned.
 * Can override for:
 *   - all fields of a certain type
 *   - specific fields by name
 */
const getInputComponents = <Form extends object, Context>(data: {
  config: FormConfig<Form, Context>;
  values: Form;
  context: Partial<Context>;
  // Overrides aren't implemented
  _typeOverrides?: Record<FieldType, FieldComponent<Form>>;
  _fieldOverrides?: Record<FieldName<Form>, FieldComponent<Form>>;
}) => {
  const { config } = data;
  const context = { ...config.context, ...data.context };

  // Map over fields in form config and return a map between
  // field name and the field to render
  const fieldRenderComponents: Record<
    string,
    FieldRenderComponent<Form>
  > = Object.fromEntries(
    config.fields.map((field) => {
      const { type } = field;

      return [
        field.name,
        (fieldApi: React.ComponentProps<FieldRenderComponent<Form>>) => {
          // ? Field type conditional rendering
          // ?

          // select-single: select dropdown
          if (type === "array-string.single") {
            return (
              <Select
                options={getOptions({
                  values:
                    field.options?.({
                      values: data.values,
                      context,
                    }) || [],
                })}
                value={fieldApi.state.value as string}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(value) => fieldApi.setValue(value as any)}
                sort={true}
              />
            );
          }
          // select-multi: multi-select checkbox group
          if (type === "array-string.multiple") {
            return (
              <CheckboxGroup
                options={getOptions({
                  values:
                    field.options?.({
                      values: data.values,
                      context,
                    }) || [],
                })}
                value={fieldApi.state.value as string[]}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onChange={(value) => fieldApi.setValue(value as any)}
              />
            );
          }
          // boolean: checkbox
          if (type === "boolean") {
            return (
              <CheckboxWithLabel
                label="true"
                checked={Boolean(fieldApi.state.value)}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onCheckedChange={(value) => fieldApi.setValue(value as any)}
              />
            );
          }
          // string-long: textarea
          if (type === "string.long") {
            return (
              <Textarea
                value={fieldApi.state.value as string}
                onChange={({ target }) =>
                  // eslint-disable-next-line @typescript-eslint/no-explicit-any
                  fieldApi.setValue(target.value as any)
                }
              />
            );
          }
          if (type === "string.otp") {
            return (
              <OTP
                value={String(fieldApi.state.value)}
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                onValueChange={(value) => fieldApi.setValue(value as any)}
              />
            );
          }
          if (type === "string.password") {
            return (
              <InputPassword
                value={String(fieldApi.state.value)}
                // eslint-disable-next-line
                onChange={({ target }) =>
                  fieldApi.setValue(target.value as any)
                }
              />
            );
          }
          // default: input
          return (
            <Input
              value={String(fieldApi.state.value)}
              // eslint-disable-next-line
              onChange={({ target }) => fieldApi.setValue(target.value as any)}
            />
          );
        },
      ];
    }),
  );

  return fieldRenderComponents;
};

export { getInputComponents };
