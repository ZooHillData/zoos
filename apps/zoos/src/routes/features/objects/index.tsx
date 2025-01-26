import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/objects/")({
  component: RouteComponent,
});

import React from "react";

import { useQuery } from "@tanstack/react-query";

import { queries } from "../../../features/auth";

function RouteComponent() {
  // Abstract this into `useUser()` hook
  const { data: user, isLoading: isUserLoading } = useQuery(
    queries.getUser({
      params: {},
    }),
  );

  return (
    <div className="m-auto">
      <p className="text-label-foreground text-xs font-medium uppercase">
        Objects logged in user:
      </p>
      <p className={isUserLoading ? "invisible" : ""}>
        {" "}
        {user?.email || "unauthenticated"}
      </p>
    </div>
  );
}
