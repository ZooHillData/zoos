import { createFileRoute, Outlet } from "@tanstack/react-router";

export const Route = createFileRoute("/features/auth")({
  component: RouteComponent,
});

import { useQuery, useMutation } from "@tanstack/react-query";
import { cn } from "@zoos/shadcn";
import { queries, mutations } from "../../../features/auth";

function RouteComponent() {
  const { data: user, isLoading } = useQuery(queries.getUser({ params: {} }));

  const { queryClient } = Route.useRouteContext();
  const { mutate: logout } = useMutation(mutations.logout({ queryClient }));

  return (
    <div className="flex h-screen w-screen flex-col overflow-auto">
      <div className="p-2 text-sm">
        <span className="font-medium">Email: </span>
        <div className={cn("inline-flex gap-1", isLoading ? "invisible" : "")}>
          <span>{user?.email || "unauthenticated"}</span>
          <button
            className={!user?.email ? "hidden" : "text-primary hover:underline"}
            onClick={() => logout({})}
          >
            logout{" "}
          </button>
        </div>
      </div>
      <Outlet />
    </div>
  );
}
