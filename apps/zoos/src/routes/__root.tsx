import { createRootRoute, Outlet } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";

import { TopNavigation } from "../-navigation/top-navigation";

export const Route = createRootRoute({
  component: () => (
    <div className="bg-background text-foreground flex h-screen w-screen flex-col items-center justify-center gap-2">
      <TopNavigation />
      <Outlet />
      <TanStackRouterDevtools />
    </div>
  ),
});
