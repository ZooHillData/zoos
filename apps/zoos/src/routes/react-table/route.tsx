import { createFileRoute, Outlet } from "@tanstack/react-router";

// Create random user data and attach to route loader
import { createData, createRandomUser } from "../../lib/fake-data";
const data = createData(createRandomUser, {
  count: 10000,
});

export const Route = createFileRoute("/react-table")({
  context: () => ({ data }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-screen overflow-hidden">
      <Outlet />
    </div>
  );
}
