import { createFileRoute } from "@tanstack/react-router";

import { Button } from "@zoos/ui-shad";

export const Route = createFileRoute("/shad")({
  component: RouteComponent,
});

function RouteComponent() {
  return <Button variant="success">Click me</Button>;
}
