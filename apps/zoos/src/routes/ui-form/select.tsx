import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ui-form/select")({
  component: RouteComponent,
});

import React from "react";
import { Select, getSelectOptions } from "@zoos/ui-form";

const options = getSelectOptions({
  values: ["1", "2", "3", "4"],
  // Optional get label function
  // (defaults to (value) => value)
  getLabel: (value) => `Option ${value}`,
});

function RouteComponent() {
  const [value, setValue] = React.useState<string | undefined>(undefined);

  return (
    <Select
      value={value}
      onChange={(value) => setValue(value)}
      className="w-[200px]"
      options={options}
      placeholder="Optional placeholder"
    />
  );
}
