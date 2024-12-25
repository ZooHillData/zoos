import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ui-form/checkbox-with-label")({
  component: RouteComponent,
});

import React from "react";
import { CheckboxWithLabel } from "@zoos/ui-form";

function RouteComponent() {
  const [value, setValue] = React.useState<boolean>(false);

  console.log({ value });

  return (
    // Same props as standard `Checkbox` from `@zoos/ui-shad`
    <CheckboxWithLabel
      label="Check me"
      checked={value}
      onCheckedChange={(checked) => setValue(Boolean(checked))}
    />
  );
}
