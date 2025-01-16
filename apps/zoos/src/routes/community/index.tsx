import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/community/")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen w-screen items-center justify-center">
      Community features go here :)
    </div>
  );
}
