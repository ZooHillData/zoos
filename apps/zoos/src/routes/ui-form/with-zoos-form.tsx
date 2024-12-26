import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ui-form/with-zoos-form")({
  component: RouteComponent,
});

import { Form, getFormConfig } from "@zoos/ui-form";

// This could be your react-query
// or other function to get context that we'll
// pass into the form
const getContext = () => {
  return {
    variables: ["Temperature", "Viscocity", "Distortion"],
    setTypes: ["node", "surface", "edge", "volume"],
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

// These types are inferred
//
// Have to provide type hints when passing
//  [], {} and others where inference is not possible
const formConfig = getFormConfig({
  initialValues: {
    variable: "",
    setFilter: false,
    setType: "",
    // Type hint on required on empty arrays
    sets: [] as string[],
  },
  // ??? Context
  // Context is passed as a prop into the form
  // and can be accessed in all field config
  // configuration callback functions
  initialContext: {
    // Type hint required on empty arrays
    sets: [] as string[],
    setTypes: [] as string[],
    variables: [] as string[],
  },
  fields: [
    {
      name: "variable",
      type: "select-single",
      accessor: ({ values }) => JSON.stringify(values.variable),
      options: ({ context }) => context.variables,
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
      options: ({ context, values }) =>
        context.sets.filter(
          (set) => !values.setType || set.includes(values.setType),
        ),
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
        context={context}
        config={formConfig}
        // Props passed to the `<form />` element
        fieldContainerProps={{ className: "space-y-1" }}
        formProps={{ className: "w-full flex flex-col gap-4" }}
      />
    </div>
  );
}
