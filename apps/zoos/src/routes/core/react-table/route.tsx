import { createFileRoute, Outlet } from "@tanstack/react-router";

// Create random user data and attach to route loader
import { createData, createRandomUser } from "../../../community/fake-data";
const data = createData(createRandomUser, {
  count: 100,
});

export const Route = createFileRoute("/core/react-table")({
  context: () => ({ data }),
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className="h-screen w-screen overflow-hidden p-4">
      <Outlet />
    </div>
  );
}
