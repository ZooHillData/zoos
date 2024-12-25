import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/ui-shad/checkbox")({
  component: RouteComponent,
});

import { Checkbox } from "@zoos/ui-shad";

function RouteComponent() {
  return (
    <div className="flex items-center space-x-2">
      <Checkbox id="terms" />
      <label
        htmlFor="terms"
        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
      >
        Accept terms and conditions
      </label>
    </div>
  );
}