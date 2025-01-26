import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/features/objects")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-screen overflow-hidden p-4">
      <Outlet />
    </div>
  );
}
