import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/libraries/react-table/standard")({
  component: RouteComponent,
});

import React from "react";

import { type TableState } from "@tanstack/react-table";

import { getColumns, featureProps } from "@zoos/react-table";
import { useTable, useComponentProps, Table } from "@zoos/react-table-ui";

function RouteComponent() {
  const { data } = Route.useRouteContext();

  const [state, setState] = React.useState({} as TableState);
  const columns = React.useMemo(() => getColumns({ data })(), [data]);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data,
    columns,
    state,
    onStateChange: setState,
  });

  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [
        featureProps.borders(),
        featureProps.rowStriping(),
        featureProps.spacing.compact(),
        { th: () => ({ className: "bg-muted" }) },
      ],
    },
  );

  return <Table {...{ table, virtualRows, componentProps }} />;
}
