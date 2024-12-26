"use client";

import React from "react";

import { useForm } from "@tanstack/react-form";
import { Button } from "@zoos/ui-shad";

import type { FormConfig } from "../types";
import { getInputComponents, getFormConfig } from "../lib";
import { FieldWrapper } from "./field-wrapper";

/**
 * Form component
 * @param config - Form configuration
 * @param context - Context passed into the form configuration
 * @param formOptions - Form Options passed into
 *
 */
const Form = <Form extends object, Context>(props: {
  config: FormConfig<Form, Context>;
  context: Partial<Context>;
  formProps?: React.ComponentProps<"form">;
  fieldContainerProps?: React.ComponentProps<"div">;
  submitButtonLabel?: string;
}) => {
  const { submitButtonLabel = "Submit", config } = props;

  const form = useForm({
    ...config.formOptions,
  });

  const context = React.useMemo(
    () => ({ ...config.context, ...props.context }),
    [config.context, props.context],
  );

  // An object that maps all form fields (by name) to a form
  // FieldApi-to-input components, e.g. (field) => <Input />
  const fieldInputs = React.useMemo(() => {
    return getInputComponents({
      config,
      context,
      values: form.state.values,
    });
  }, [context, form.state.values, config]);

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        e.stopPropagation();
      }}
      {...props.formProps}
    >
      {props.config.fields.map((fieldConfig) => {
        const inputComponent = fieldInputs[fieldConfig.name];
        return (
          // Here, we subscribe to the form values and re-render every
          // input on every change. If this is not a performance or UX
          // issue, this is a much simpler way to pass the values to the
          // field handlers
          <form.Subscribe
            key={fieldConfig.name}
            selector={(state) => state.values}
          >
            {
              // Values include all values pulled from state
              // in Subscribe
            }
            {(values) => (
              <FieldWrapper
                formConfig={props.config}
                fieldConfig={fieldConfig}
                context={context}
                values={values}
                containerProps={props.fieldContainerProps}
              >
                {/* Input component */}
                <form.Field name={fieldConfig.name} {...fieldConfig.fieldProps}>
                  {inputComponent}
                </form.Field>
              </FieldWrapper>
            )}
          </form.Subscribe>
        );
      })}
      <Button onClick={() => form.handleSubmit()}>{submitButtonLabel}</Button>
    </form>
  );
};

export { Form, getFormConfig };
