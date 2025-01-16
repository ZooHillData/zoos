import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { type QueryClient } from "@tanstack/react-query";

import {
  useNavTree,
  NavTreeSearch,
  NavTreeControls,
  NavTree,
} from "../features/navigation/nav-tree";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RouteFunction,
  },
);

const SearchableNavTree = () => {
  const router = useRouter();
  const paths = router.flatRoutes.map((route) => ({
    path: route.fullPath,
  }));

  const { table } = useNavTree({
    paths,
    getPath: (row) => row.path.split("/"),
    columns: [],
  });

  return (
    <div className="bg-popover flex h-full w-fit flex-col gap-3 p-4">
      <NavTreeSearch table={table} className="h-fit w-[300px]" />
      <NavTreeControls
        table={table}
        className="text-accent w-ful flex gap-1 p-1"
      />
      <NavTree
        className="flex max-h-full flex-col gap-1 overflow-auto"
        table={table}
      />
    </div>
  );
};

function RouteFunction() {
  return (
    <div className="bg-background text-foreground flex h-screen">
      <SearchableNavTree />
      <Outlet />
      {/* <TanStackRouterDevtools  /> */}
    </div>
  );
}
