import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/shadcn/use-debounce")({
  component: RouteComponent,
});

import React from "react";
import { useDebounce, Button, Input, Label } from "@zoos/shadcn";

function RouteComponent() {
  // This value will be debounced
  const [debouncedValue, setDebouncedValue] = React.useState("");

  // `value`, `setValue` will be updated immediately (for wiring into `<Input />`)
  // debounced `onChange` will update debouncedValue after 300ms
  const [value, setValue] = useDebounce({
    value: debouncedValue,
    delay: 300,
    onChange: (value) => setDebouncedValue(value),
  });

  return (
    <div className="space-y-1">
      <Label>Debounced Input</Label>
      <Input
        className="w-[300px]"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />

      <p className="inline-flex w-full items-center justify-between">
        Debounced Value: {debouncedValue}
        {debouncedValue && (
          // ~ Non-debounced value is reactive
          // Reset button shows that editing the debounced value will update
          // the non-debounced value (this is accomplished with `useReactiveState` hook)
          // `useDebounce` leverages `useReactiveState` internally.
          //
          // see sibling route for explanation of useReactiveState: `./use-internal-state.tsx`
          // or look at the implementation directly in the hooks folder: `packages/shadcn/src/hooks`
          <Button
            size="sm"
            variant="link"
            onClick={() => setDebouncedValue("")}
          >
            Reset
          </Button>
        )}
      </p>
    </div>
  );
}
