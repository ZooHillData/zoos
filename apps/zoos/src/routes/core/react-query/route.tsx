import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/core/react-query")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="flex h-screen w-full items-center justify-center">
      <Outlet />
    </div>
  );
}
