import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-form/input-debounce")({
  component: RouteComponent,
});

import React from "react";
import { Label } from "@zoos/shadcn";
import { InputDebounce } from "@zoos/react-form";

function RouteComponent() {
  const [value, setValue] = React.useState("");

  return (
    <div className="space-y-1 text-sm">
      <Label htmlFor="debounce-input">Debounced Input</Label>
      <InputDebounce
        id="debounce-input"
        value={value}
        onChange={(value) => setValue(value)}
        delay={500}
      />
      <div>
        <p>Debounced state: {value}</p>
        {value && (
          <button
            className="text-primary hover:text-primary-accent underline"
            onClick={() => setValue("")}
          >
            Reset state
          </button>
        )}
      </div>
    </div>
  );
}
