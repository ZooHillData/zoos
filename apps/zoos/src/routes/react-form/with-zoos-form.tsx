import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-form/with-zoos-form")({
  component: RouteComponent,
});

import { Label } from "@zoos/shadcn";
import { Form, getFormConfig } from "@zoos/react-form";

/*
This could be your react-query
or other function to get context that we'll
pass into the form
*/
const getContext = () => {
  return {
    variables: ["Temperature", "Viscocity", "Distortion"],
    sets: [
      "node-1",
      "node-2",
      "surface-1",
      "surface-2",
      "edge-1",
      "edge-2",
      "volume-1",
    ],
  };
};

/*
~
~ getFormConfig
Function currying to help with type inference
pass in default values and context and returned
type inferred function for actual creation
*/
const formConfig = getFormConfig({
  // ! Types inferred from `defaultValues` and `context`
  /*
  ~ defaultValues - which data / fields are there
  Form data default values (passed to `useForm`)
  */
  defaultValues: {
    variable: "",
    set_filter: false,
    set_type: "",
    // Type hint on required on empty arrays
    sets: [] as string[],
  },
  /*
  ~
  ~ Context
  Along with `values`, `context` is passed into all
  field attribute callbacks (e.g. `hidden`).
  
  This is the initial context which can be modified
  during rendering by passing it into the Form component:
  `<Form context={context} />`
  */
  context: {
    // Type hint required on empty arrays
    sets: [] as string[],
    setTypes: ["node", "surface", "edge", "volume"],
    variables: [] as string[],
  },
})({
  /*
  ~
  ~ Form Options
  Pass in standard options you would pass to `useForm`
  */
  formOptions: {
    onSubmit: ({ value }) => {
      window.alert(JSON.stringify(value));
    },
  },
  /*
  ~ layout
  How the form fields are laid out and other auxillary components
  */
  layout: {
    /*
    `minWidth`:
      When specified, the layout will not take affect when the <form /> is
      narrower than this many pixels. In this event, the form will render
      each field group on a new line with `w-full`
    ! Not implemented
    */
    minWidth: 500,
    /*
    Container props
    ---------------
    (all are merged with deeper layout field/row-level overrides)

    - `formContainerProps` - passed to form container
    - `rowContainerProps` - passed to row container
    - `fieldContainerProps` - passed to field container
    */
    rowContainerProps: { className: "py-2" },
    fieldContainerProps: { className: "space-y-1" },
    formContainerProps: { className: "space-y-4" },
    /*
    Component overrides
    ------------------------
    - `labelComponent` - override the label component for all fields
    */
    labelComponent:
      () =>
      ({ name }) => (
        <Label className="uppercase">{name.split("_").join(" ")}</Label>
      ),
    // If you specify layout, only field names specified in
    // one of the fields arrays will be rendered
    rows: [
      /*
      `row.fields`:
          The fields option allocates space, e.g. ["va1", "var1", "var2"]
          gives 2/3 to var1 and 1/3 to var2

          The keys are the field names. By convention, these are passed first
          in the row objects so you can see the structure at a glance.
      */
      // ! Currently, `fields` arrays are not strongly typed .. soon?
      { fields: ["variable"] },
      // Override container "w-1/2" custom class, this row only.
      { fields: ["set_filter"], containerProps: { className: "w-1/2" } },
      {
        fields: ["set_type", "sets"],
        containerProps: {
          className: "flex w-full gap-4",
        },
      },
    ],
  },
  fields: [
    {
      name: "variable",
      type: "select-single",
      options: ({ context }) => context.variables,
      /*
      ~
      ~ Field Props
      Pass in standard props you would pass to `<form.Field />`
      */
      fieldProps: {
        validators: {
          // Unfortunately, handlers need to be manually typed b/c the
          // value type (from `name`) is not flowing through here
          onChange: ({ value }: { value: string }) => {
            if (value === "Temperature") {
              return "Temperature is not allowed";
            }
          },
        },
      },
    },
    {
      name: "set_filter",
      type: "boolean",
    },
    {
      name: "sets",
      type: "select-multi",
      /*
      ~
      ~ Field attribute callbacks
      ~ -------------------------
      All field attribute callbacks receive `values` and `context`
      */
      // `options` - used by dropdown fields like <Select />
      options: ({ context, values }) =>
        context.sets.filter(
          (set) => !values.set_type || set.includes(values.set_type),
        ),
      // `hidden` - Whether to show or hide the field
      hidden: ({ values }) => !values.set_filter,
    },
    {
      name: "set_type",
      type: "select-single",
      options: ({ context }) => context.setTypes,
      hidden: ({ values }) => !values.set_filter,
    },
  ],
});

function RouteComponent() {
  const context = getContext();

  return (
    <div className="h-full w-full max-w-[300px]">
      <Form
        // `context` - pass in render-time context that's merged with the
        // context in the `getFormConfig` call
        context={context}
        config={formConfig}
      />
    </div>
  );
}
