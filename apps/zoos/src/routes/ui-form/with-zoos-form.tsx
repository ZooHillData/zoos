import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ui-form/with-zoos-form")({
  component: RouteComponent,
});

import { Form, getFormConfig } from "@zoos/ui-form";

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
  /*
  ~ defaultValues
  ! Type inferred from this field
  Form data default values. Form type inferred from
  this value
  */
  defaultValues: {
    variable: "",
    setFilter: false,
    setType: "",
    // Type hint on required on empty arrays
    sets: [] as string[],
  },
  /*
  ~
  ~ Context
  ! Type inferred from this field
  
  Along with `values`, `context` is passed into all
  field attribute callbacks (e.g. `hidden`).
  
  This is the initial context which can be modified
  during rendering by passing it into the Form component:
  `<Form context={context} />`
  */
  context: {
    // ! Type hint required on empty arrays
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
  fields: [
    {
      name: "variable",
      type: "select-single",
      accessor: ({ values }) => JSON.stringify(values.variable),
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
      name: "setFilter",
      type: "boolean",
      accessor: ({ values }) => JSON.stringify(values.setFilter),
    },
    {
      name: "sets",
      type: "select-multi",
      accessor: ({ values }) => JSON.stringify(values.sets),
      /*
      ~
      ~ Field attribute callbacks
      ~ -------------------------
      All field attribute callbacks receive `values` and `context`
      ~
      ~ `options`
      Options for select based on `context` and then filtered
      based on `values`
      */
      options: ({ context, values }) =>
        context.sets.filter(
          (set) => !values.setType || set.includes(values.setType),
        ),
      /*
      ~
      ~ `hidden`
      Whether to show or hide the field
      */
      hidden: ({ values }) => !values.setFilter,
    },
    {
      name: "setType",
      type: "select-single",
      accessor: ({ values }) => JSON.stringify(values.setType),
      options: ({ context }) => context.setTypes,
      hidden: ({ values }) => !values.setFilter,
    },
  ],
});

function RouteComponent() {
  const context = getContext();

  return (
    <div className="h-full w-full max-w-[300px]">
      <Form
        /*
         ~ Render-time context
         Pass in Partial<Context> that will get merged
         into the context passed into `getFormConfig`
        */
        context={context}
        config={formConfig}
        /*
        ~
        ~ Component Props
        ~ ---------------
        Pass props into individual components to customize
        their rendering (mostly for overriding styles)
        ~
        ~`fieldContainerProps` passed to <form />
        passed to <div /> around the field group
        Field group is the Label, Input, and Error
        */
        fieldContainerProps={{ className: "space-y-1" }}
        /*
        ~
        ~`formProps` passed to <form />
        */
        formProps={{ className: "w-full flex flex-col gap-4" }}
      />
    </div>
  );
}
