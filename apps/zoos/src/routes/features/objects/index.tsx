import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/objects/")({
  component: RouteComponent,
});

import React from "react";
import { useQuery } from "@tanstack/react-query";
import {
  useComponentProps,
  useTable,
  featureProps,
  mergeColumns,
  getColumns,
} from "@zoos/react-table";
import { Table } from "@zoos/react-table-ui";

import { queries, columnOverrides } from "../../../features/objects";

function RouteComponent() {
  const { data: objects } = useQuery(queries.getObjects({ params: {} }));

  const columns = React.useMemo(() => {
    const columns =
      (objects?.length || 0) > 0 ? getColumns({ data: objects || [] })() : [];
    if (columns.length > 0) {
      return mergeColumns({ base: columns })({ overrides: columnOverrides });
    }
    return [];
  }, [objects]);

  const { rowVirtualizer, virtualRows, table, scrollContainerRef } = useTable({
    data: objects || [],
    columns,
  });
  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [
        featureProps.utils.allCells({
          className: "text-sm overflow-hidden whitespace-nowrap bg-background",
        }),
      ],
    },
  );

  if ((objects?.length || 0) > 0) {
    return (
      <div className="flex h-full flex-col">
        <Table {...{ componentProps, virtualRows, table }} />
      </div>
    );
  }
  return <p>No Rows :(</p>;
}
