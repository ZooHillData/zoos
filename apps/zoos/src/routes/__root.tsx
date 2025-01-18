import {
  createRootRouteWithContext,
  Outlet,
  useRouter,
} from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/router-devtools";
import { type QueryClient } from "@tanstack/react-query";

export const Route = createRootRouteWithContext<{ queryClient: QueryClient }>()(
  {
    component: RouteFunction,
  },
);

import {
  useNavTree,
  NavTreeSearch,
  NavTreeControls,
  NavTree,
} from "../features/navigation/nav-tree";
import { ZoosLogo } from "../features/components";
import { cn } from "@zoos/shadcn";

import React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

const SearchableNavTree = ({ className }: { className?: string }) => {
  const [isOpen, setIsOpen] = React.useState(false);

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
    <div
      className={cn(
        "bg-popover absolute flex h-full w-fit flex-col gap-3 border-r-2 p-4 shadow-lg",
        !isOpen ? "-translate-x-full" : "",
        className,
      )}
    >
      <NavTreeSearch
        table={table}
        // h-fit so input doesn't change height when the tree is expanded / collapsed
        className="h-fit w-[300px] py-2"
      />
      <NavTreeControls
        table={table}
        className="text-accent flex w-full gap-1 p-1"
      />
      <NavTree
        className="flex max-h-full flex-col gap-1 overflow-auto"
        table={table}
      />
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "hover:bg-primary bg-popover absolute -right-5 top-1/2 my-auto h-fit -translate-y-1/2 rounded-full border-2 p-1",
          !isOpen ? "translate-x-full" : "",
        )}
      >
        {isOpen ? <ChevronLeftIcon /> : <ChevronRightIcon />}
      </button>
      <div className="mx-auto mt-auto translate-y-2">
        <ZoosLogo />
      </div>
      {/* THIS IS THE IMAGE */}
      <div className="absolute bottom-0 left-0 h-36 w-full opacity-20">
        <img
          src="./faded-mountains.png"
          alt="faded-mountains"
          className="object-fit h-full w-full"
        />
      </div>
    </div>
  );
};

function RouteFunction() {
  return (
    <div className="bg-background text-foreground flex h-screen">
      <SearchableNavTree className="z-[999]" />
      <Outlet />
      {/* <TanStackRouterDevtools  /> */}
    </div>
  );
}
