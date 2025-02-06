import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/features/objects/2")({
  component: RouteComponent,
});

import { useQuery } from "@tanstack/react-query";
import { useComponentProps } from "@zoos/react-table";
import { Table } from "@zoos/react-table-ui";
import {
  useObjectsTable,
  getObjectsQuery,
  getFeatureProps,
} from "../../../features/objects2";

function RouteComponent() {
  const { data: objects, isLoading: isObjectsLoading } = useQuery(
    getObjectsQuery({ params: {} }),
  );
  const { table, virtualRows, rowVirtualizer, scrollContainerRef } =
    useObjectsTable({
      data: objects,
    });

  const componentProps = useComponentProps(
    {
      table,
      rowVirtualizer,
      scrollContainerRef,
    },
    {
      mergeProps: [
        ...getFeatureProps({
          onLocationChange: (location) => console.log("location", location),
        }),
      ],
    },
  );

  console.log({ objects });

  if (isObjectsLoading) {
    return <div>Loading...</div>;
  }

  if (!objects || objects.length === 0) {
    return <div>No objects</div>;
  }

  return (
    <div className="flex h-full flex-col gap-2">
      {table.getRowModel().rows.map((row) => JSON.stringify(row.original))}
    </div>
  );
}
