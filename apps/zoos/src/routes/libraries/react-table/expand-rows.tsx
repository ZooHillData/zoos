import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/libraries/react-table/expand-rows")({
  component: RouteComponent,
});

import React from "react";
import { type TableState } from "@tanstack/react-table";

import { buildPathTree } from "@zoos/navigation";
import { featureProps, getColumns } from "@zoos/react-table";
import { useTable, Table, useComponentProps } from "@zoos/react-table-ui";

function RouteComponent() {
  const [state, setState] = React.useState({} as TableState);
  const { data } = Route.useRouteContext();

  const { hierarchicalData, columns } = React.useMemo(() => {
    const hierarchicalData = buildPathTree({
      data,
    })({
      getParts: (row) => [row.state, row.first_name, row.last_name],
    })._children;
    return {
      hierarchicalData,
      columns: getColumns({ data: hierarchicalData })({}),
    };
  }, [data]);

  const { table, virtualRows, rowVirtualizer, scrollContainerRef } = useTable({
    data: hierarchicalData,
    columns,
    state,
    onStateChange: setState,
    getSubRows: (row) => row._children,
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
        featureProps.spacing.compact(),
        {
          trBody: ({ row }) => ({ onClick: () => row.toggleExpanded() }),
        },
      ],
    },
  );

  return <Table {...{ table, componentProps, virtualRows }} />;
}
