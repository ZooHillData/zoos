"use client";

import type { FormApi } from "@tanstack/react-form";
import type { FormConfig } from "../types/form-config";

import React from "react";

import { useForm } from "@tanstack/react-form";
import { Button, mergeStyleProps } from "@zoos/shadcn";

import {
  getInputComponents,
  getFormConfig,
  getLayoutData,
  getDefaultLayoutData,
} from "../lib";
import { FieldWrapper } from "./field-wrapper";

/**
 * Form component
 * @param config - Form configuration
 * @param context - Context passed into the form configuration
 * @param submitButtonLabel - Text for the submit button
 *
 */
const Form = <Form extends object, Context>(props: {
  config: FormConfig<Form, Context>;
  context: Partial<Context>;
  submitButtonLabel?: string;
  onSubmit?: (params: { value: Form; formApi: FormApi<Form> }) => void;
}) => {
  const { submitButtonLabel = "Submit", config } = props;

  const form = useForm({
    ...config.formOptions,
    ...(props.onSubmit ? { onSubmit: props.onSubmit } : {}),
  });

  // ~ Context - merged
  // Merge context from the config with the context passed in at render time
  const context = React.useMemo(
    () => ({ ...config.context, ...props.context }),
    [config.context, props.context],
  );

  // ~ Layout data
  // Compute layout data from layout configuration
  // (uses defaultValues for the field list to seed the default, vertical layout)
  const layoutData = React.useMemo(() => {
    // Get field list from defaultValues
    const fieldList = Object.keys(config.formOptions.defaultValues || {});

    // Return layout data from
    // If `rows` are passed in the layout, then
    // use the `getLayoutData` function to get the layout data.
    // Otherwise, use the default layout based on the fields
    // TODO(chore) Change the name to `getRowLayoutData`
    return config.layout?.rows
      ? getLayoutData({ layout: config.layout })
      : getDefaultLayoutData({
          fields: fieldList,
        });
  }, [config.layout, config.formOptions.defaultValues]);

  /*
  ~ Field inputs 
  e.g., <Select />, <Input />, etc.
  
  An object that maps all form fields (by name) to a form
  FieldApi-to-input components, e.g. (field) => <Input />
  */
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
        form.handleSubmit();
      }}
      {...props.config.layout?.formContainerProps}
    >
      {layoutData.rows.map((row, index) => (
        // Map over each row in the layout
        <div
          key={index}
          {...mergeStyleProps([
            config.layout?.rowContainerProps || {},
            row.props || {},
          ])}
          {...row.props}
        >
          {Object.entries(row.fields).map(([fieldName, fieldProps]) => {
            // Map over each field in the row
            const fieldConfig = config.fields.find(
              (field) => field.name === fieldName,
            );
            if (!fieldConfig) {
              throw new Error(`Field ${fieldName} not found in form config`);
            }

            // Get the input component, e.g. <Input />, <Select />
            // This will change in future, esp when "bring your own"
            // components.
            const inputComponent = fieldInputs[fieldConfig.name];

            return (
              // Here, we subscribe to the form values and re-render every
              // input on every change. If this is not a performance or UX
              // issue, this is a much simpler way to pass the values to the
              // field handlers
              <form.Subscribe
                key={fieldConfig.name}
                selector={(state) => ({ values: state.values, context })}
              >
                {
                  // Values include all values pulled from state
                  // in Subscribe
                }
                {({ values }) => (
                  <FieldWrapper
                    formConfig={props.config}
                    fieldConfig={fieldConfig}
                    context={context}
                    values={values}
                    containerProps={mergeStyleProps([
                      config.layout?.fieldContainerProps || {},
                      fieldProps || {},
                    ])}
                  >
                    {/* Input component */}
                    <form.Field
                      name={fieldConfig.name}
                      {...fieldConfig.fieldProps}
                    >
                      {inputComponent}
                    </form.Field>
                  </FieldWrapper>
                )}
              </form.Subscribe>
            );
          })}
        </div>
      ))}
      <Button className="w-full" type="submit">
        {submitButtonLabel}
      </Button>
    </form>
  );
};

export { Form, getFormConfig };
