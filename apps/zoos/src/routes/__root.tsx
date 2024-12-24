import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-background text-foreground flex h-screen w-screen flex-col items-center justify-center gap-2">
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
