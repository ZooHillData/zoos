import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/react-table/standard")({
  component: RouteComponent,
});

import React from "react";
import { type TableState } from "@tanstack/react-table";
import { getColumns } from "@zoos/react-table";
import { Table, useTable } from "./-react-table";

function RouteComponent() {
  const { data } = Route.useRouteContext();
  const [state, setState] = React.useState({} as TableState);
  const columns = getColumns({ data })();

  const { table, virtualRows, featureProps } = useTable({
    data,
    columns,
    state,
    onStateChange: setState,
  });

  return (
    <div>
      <Table {...{ table, virtualRows, featureProps }} />
    </div>
  );
}
